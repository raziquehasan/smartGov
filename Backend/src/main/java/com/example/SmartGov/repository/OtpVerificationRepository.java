package com.example.SmartGov.repository;

import com.example.SmartGov.entity.OtpVerification;
import com.example.SmartGov.enums.OTPType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {

    Long countByEmailAndOtpTypeAndCreatedAtAfter(
            String email,
            OTPType otpType,
            LocalDateTime after
    );

    Optional<OtpVerification> findTopByEmailAndOtpTypeAndVerifiedFalseOrderByCreatedAtDesc(
            String email,
            OTPType otpType
    );

    Optional<OtpVerification> findTopByEmailAndOtpTypeOrderByCreatedAtDesc(
            String email,
            OTPType otpType
    );

    @Modifying
    @Transactional
    @Query("UPDATE OtpVerification o SET o.verified = true WHERE o.email = :email AND o.otpType = :otpType")
    void markAllAsVerified(
            @Param("email") String email,
            @Param("otpType") OTPType otpType
    );

}