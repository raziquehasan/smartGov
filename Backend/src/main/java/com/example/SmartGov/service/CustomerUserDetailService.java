package com.example.SmartGov.service;

import com.example.SmartGov.entity.User;
import com.example.SmartGov.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(CustomerUserDetailService.class);

    private final UserRepository userRepository;

    public CustomerUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Attempting to load user by email/username: {}", username);

        // Check if input is email or username
        User user = findUserByIdentifier(username);

        if (user == null) {
            log.warn("User not found with identifier: {}", username);
            throw new UsernameNotFoundException("User not found with identifier: " + username);
        }

        // Check if user is active
        if (!user.isActive()) {
            log.warn("User account is inactive: {}", username);
            throw new UsernameNotFoundException("User account is inactive: " + username);
        }

        // Build authorities from roles
        Collection<? extends GrantedAuthority> authorities = getAuthorities(user);

        log.info("User successfully loaded: {} with roles: {}", user.getEmail(),
                authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));

        return buildUserDetails(user, authorities);
    }

    /**
     * Find user by email or other identifier
     */
    private User findUserByIdentifier(String identifier) {
        // Try to find by email first (most common)
        return userRepository.findByEmail(identifier)
                .or(() -> {
                    // If not found by email, try by mobile number
                    log.debug("User not found by email, trying alternative identifier: {}", identifier);
                    return userRepository.findByMobileNumber(identifier);
                })
                .orElse(null);
    }

    /**
     * Convert user roles to Spring Security authorities
     */
    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        // Handle single role
        if (user.getRole() != null) {
            String roleName = "ROLE_" + user.getRole().name();
            return List.of(new SimpleGrantedAuthority(roleName));
        }

        // Default authority if no role specified
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    /**
     * Build Spring Security UserDetails object
     */
    private UserDetails buildUserDetails(User user, Collection<? extends GrantedAuthority> authorities) {
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail()) // Use email as username
                .password(user.getPassword()) // Password should be encoded
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!user.isActive()) // Disabled if not active
                .build();
    }

    /**
     * Additional method to load user by ID (useful for JWT token validation)
     */
    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long userId) {
        log.debug("Loading user by ID: {}", userId);

        return userRepository.findById(userId)
                .map(user -> {
                    Collection<? extends GrantedAuthority> authorities = getAuthorities(user);
                    return buildUserDetails(user, authorities);
                })
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", userId);
                    return new UsernameNotFoundException("User not found with ID: " + userId);
                });
    }
}