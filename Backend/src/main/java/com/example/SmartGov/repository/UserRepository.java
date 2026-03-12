package com.example.SmartGov.repository;

import com.example.SmartGov.entity.User;
import com.example.SmartGov.enums.ROLES;
import com.example.SmartGov.enums.States;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

        Optional<User> findByEmail(String email);

        Optional<User> findByMobileNumber(String mobileNumber);

        List<User> findByIsActiveTrue();

        List<User> findByStateAndIsActiveTrue(States state);

        List<User> findByRoleAndIsActiveTrue(ROLES role);

        List<User> findByEmailContainingAndIsActiveTrue(String email);

        // For checking existence
        boolean existsByEmail(String email);

        boolean existsByMobileNumber(String mobileNumber);

        // Find active users by state and role
        List<User> findByStateAndRoleAndIsActiveTrue(States state, ROLES role);

        long countByIsActiveTrue();
}