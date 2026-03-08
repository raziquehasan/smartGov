package com.example.SmartGov.service;

import com.example.SmartGov.dto.*;
import com.example.SmartGov.entity.User;
import com.example.SmartGov.enums.ROLES;
import com.example.SmartGov.enums.States;
import com.example.SmartGov.exception.DuplicateResourceException;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.repository.UserRepository;
import com.example.SmartGov.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public AuthResponse register(RegisterRequest request) {
        // for Check if email already exists
        if (existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());

        // exceptional Handling
        try {
            States stateEnum = States.valueOf(request.getState().toUpperCase().replace(" ", "_"));
            user.setState(stateEnum);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid state: " + request.getState());
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(ROLES.CITIZENS);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        // Create UserDetails for token generation
        UserDetails userDetails = createUserDetails(user);

        // Generate JWT token
        String token = jwtService.generateToken(userDetails);

        // Create AuthResponse using constructor
        return new AuthResponse(token, user.getFirstName(), user.getEmail(), user.getProfilePicture());
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // Get user from database
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create UserDetails for token generation
        UserDetails userDetails = createUserDetails(user);

        // Generate JWT token
        String token = jwtService.generateToken(userDetails);

        // Create AuthResponse using constructor
        return new AuthResponse(token, user.getFirstName(), user.getEmail(), user.getProfilePicture());
    }

    private UserDetails createUserDetails(User user) {
        String roleName = "ROLE_" + user.getRole().name();

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(new SimpleGrantedAuthority(roleName))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!user.isActive())
                .build();
    }
}