package com.example.SmartGov.service;

import com.example.SmartGov.dto.UserDto;
import com.example.SmartGov.entity.User;
import com.example.SmartGov.enums.ROLES;
import com.example.SmartGov.enums.States;
import com.example.SmartGov.exception.ResouceNotFoundException;
import com.example.SmartGov.exception.DuplicateResourceException;
import com.example.SmartGov.mapper.UserMapper;
import com.example.SmartGov.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Validated
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    /**
     * Creates a new user with validation
     */
    @Transactional
    public UserDto createUser(@Valid UserDto userDto) {
        logger.info("Creating new user with email: {}", userDto.getEmail());

        // Check for duplicate email
        if (userRepository.existsByEmail(userDto.getEmail())) {
            logger.warn("Duplicate email attempt: {}", userDto.getEmail());
            throw new DuplicateResourceException("Email already exists: " + userDto.getEmail());
        }

        // Check for duplicate mobile number
        if (userRepository.existsByMobileNumber(userDto.getMobileNumber())) {
            logger.warn("Duplicate mobile number attempt: {}", userDto.getMobileNumber());
            throw new DuplicateResourceException("Mobile number already exists: " + userDto.getMobileNumber());
        }

        // Create user entity using mapper
        User user = UserMapper.toUser(userDto);

        // Ensure timestamps are set
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        try {
            User savedUser = userRepository.save(user);
            logger.info("User created successfully with ID: {}", savedUser.getId());
            return UserMapper.toUserDto(savedUser);
        } catch (DataIntegrityViolationException e) {
            logger.error("Database constraint violation while creating user", e);
            throw new DuplicateResourceException("User creation failed due to constraint violation");
        }
    }

    /**
     * Retrieves all active users
     */
    public List<UserDto> getAllUser() {
        logger.info("Fetching all active users");

        List<User> users = userRepository.findByIsActiveTrue();

        return users.stream()
                .map(UserMapper::toUserDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves user by ID
     */
    public UserDto getUserById(Long id) {
        logger.info("Fetching user with ID: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("User not found with ID: {}", id);
                    return new ResouceNotFoundException("User not found with id: " + id);
                });

        // Check if user is active
        if (!user.isActive()) {
            logger.warn("User with ID {} is inactive", id);
            throw new ResouceNotFoundException("User is inactive");
        }

        return UserMapper.toUserDto(user);
    }

    /**
     * Updates an existing user
     */
    @Transactional
    public UserDto updateUser(Long id, @Valid UserDto userDto) {
        logger.info("Updating user with ID: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("User not found with ID: {}", id);
                    return new ResouceNotFoundException("User not found with id: " + id);
                });

        // Check if user is active
        if (!user.isActive()) {
            throw new ResouceNotFoundException("Cannot update inactive user");
        }

        // Check for duplicate email (if changed)
        if (!user.getEmail().equals(userDto.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                logger.warn("Duplicate email attempt during update: {}", userDto.getEmail());
                throw new DuplicateResourceException("Email already exists: " + userDto.getEmail());
            }
        }

        // Check for duplicate mobile number (if changed)
        if (!user.getMobileNumber().equals(userDto.getMobileNumber())) {
            if (userRepository.existsByMobileNumber(userDto.getMobileNumber())) {
                logger.warn("Duplicate mobile number attempt during update: {}", userDto.getMobileNumber());
                throw new DuplicateResourceException("Mobile number already exists: " + userDto.getMobileNumber());
            }
        }

        // Update fields
        updateUserFields(user, userDto);

        // Update audit field
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);
        logger.info("User with ID {} updated successfully", id);

        return UserMapper.toUserDto(updatedUser);
    }

    /**
     * Deactivates a user (soft delete)
     */
    @Transactional
    public void deactivateUser(Long id) {
        logger.info("Deactivating user with ID: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResouceNotFoundException("User not found with id: " + id));

        user.setActive(false);
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
        logger.info("User with ID {} deactivated", id);
    }

    /**
     * Searches users by state
     */
    public List<UserDto> getUsersByState(States state) {
        logger.info("Searching users in state: {}", state);

        List<User> users = userRepository.findByStateAndIsActiveTrue(state);

        return users.stream()
                .map(UserMapper::toUserDto)
                .collect(Collectors.toList());
    }

    /**
     * Searches users by role
     */
    public List<UserDto> getUsersByRole(ROLES role) {
        logger.info("Searching users with role: {}", role);

        List<User> users = userRepository.findByRoleAndIsActiveTrue(role);

        return users.stream()
                .map(UserMapper::toUserDto)
                .collect(Collectors.toList());
    }

    /**
     * Gets the count of registered citizens (plus baseline of 50)
     */
    public long getUserCount() {
        return userRepository.countByIsActiveTrue() + 50;
    }

    /**
     * Checks if email exists
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Checks if mobile number exists
     */
    public boolean mobileNumberExists(String mobileNumber) {
        return userRepository.existsByMobileNumber(mobileNumber);
    }

    /**
     * Helper method to update user fields
     */
    private void updateUserFields(User user, UserDto userDto) {
        if (userDto.getFirstName() != null && !userDto.getFirstName().isEmpty()) {
            user.setFirstName(userDto.getFirstName());
        }
        if (userDto.getLastName() != null && !userDto.getLastName().isEmpty()) {
            user.setLastName(userDto.getLastName());
        }
        if (userDto.getEmail() != null && !userDto.getEmail().isEmpty()) {
            user.setEmail(userDto.getEmail());
        }
        if (userDto.getMobileNumber() != null && !userDto.getMobileNumber().isEmpty()) {
            user.setMobileNumber(userDto.getMobileNumber());
        }
        if (userDto.getState() != null) {
            user.setState(userDto.getState());
        }
        if (userDto.getRole() != null) {
            user.setRole(userDto.getRole());
        }
    }
}