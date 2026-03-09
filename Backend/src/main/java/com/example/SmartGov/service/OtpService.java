package com.example.SmartGov.service;

import com.example.SmartGov.dto.OtpRequestDto;
import com.example.SmartGov.dto.OtpVerificationDTO;
import com.example.SmartGov.entity.OtpVerification;
import com.example.SmartGov.enums.OTPType;
import com.example.SmartGov.repository.OtpVerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final JavaMailSender mailSender;

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    @Value("${otp.max.attempts:3}")
    private int maxAttempts;

    @Value("${otp.max.resend:3}")
    private int maxResend;

    @Value("${spring.mail.username:noreply@smartgov.in}")
    private String fromEmail;

    public OtpService(OtpVerificationRepository otpRepository, JavaMailSender mailSender) {
        this.otpRepository = otpRepository;
        this.mailSender = mailSender;
    }

    public String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    public OtpVerification createAndSendOTP(OtpRequestDto request) {
        // Check resend limit
        LocalDateTime lastHour = LocalDateTime.now().minusHours(1);
        Long recentRequests = otpRepository.countByEmailAndOtpTypeAndCreatedAtAfter(
                request.getEmail(),
                OTPType.valueOf(request.getType().toUpperCase()),
                lastHour);

        if (recentRequests >= maxResend) {
            throw new RuntimeException("Maximum resend attempts reached. Please try again later.");
        }

        // Generate OTP
        String otpCode = generateOTP();

        // Create OTP record
        OtpVerification otp = new OtpVerification();
        otp.setEmail(request.getEmail());
        otp.setOtpCode(otpCode);
        otp.setOtpType(OTPType.valueOf(request.getType().toUpperCase()));
        otp.setCreatedAt(LocalDateTime.now());
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otp.setVerified(false);
        otp.setAttempts(0);

        // Save OTP
        otp = otpRepository.save(otp);

        // Send email (with null check)
        sendOTPEmail(request.getEmail(), otpCode);

        return otp;
    }

    public boolean verifyOTP(OtpVerificationDTO request) {
        Optional<OtpVerification> otpOpt = otpRepository.findByEmailAndOtpCodeAndOtpTypeAndVerifiedFalse(
                request.getEmail(),
                request.getOtp(),
                OTPType.valueOf(request.getType().toUpperCase()));

        if (otpOpt.isEmpty()) {
            return false;
        }

        OtpVerification otp = otpOpt.get();

        // Check if expired
        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otp);
            throw new RuntimeException("OTP has expired. Please request a new one.");
        }

        // Check attempts
        if (otp.getAttempts() >= maxAttempts) {
            otpRepository.delete(otp);
            throw new RuntimeException("Maximum verification attempts reached. Please request a new OTP.");
        }

        otp.setAttempts(otp.getAttempts() + 1);
        otpRepository.save(otp);
        otp.setVerified(true);
        otpRepository.save(otp);

        otpRepository.markAllAsVerified(
                request.getEmail(),
                OTPType.valueOf(request.getType().toUpperCase()));

        return true;
    }

    public boolean isEmailVerified(String email) {
        Optional<OtpVerification> otpOpt = otpRepository.findFirstByEmailAndOtpTypeAndVerifiedTrueOrderByCreatedAtDesc(
                email, OTPType.REGISTRATION);

        if (otpOpt.isEmpty()) {
            return false;
        }

        OtpVerification otp = otpOpt.get();
        return otp.getExpiresAt().isAfter(LocalDateTime.now());
    }

    private void sendOTPEmail(String toEmail, String otpCode) {
        try {
            if (mailSender == null) {
                // Log OTP to console if mailSender is not available
                System.out.println("\n========================================");
                System.out.println("OTP for " + toEmail + ": " + otpCode);
                System.out.println("Valid until: " + LocalDateTime.now().plusMinutes(otpExpiryMinutes));
                System.out.println("========================================");
                return;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("SmartGov - Email Verification OTP");
            message.setText(
                    "Your OTP for SmartGov registration is: " + otpCode + "\n\n" +
                            "This OTP is valid for " + otpExpiryMinutes + " minutes.\n" +
                            "If you didn't request this, please ignore this email.\n\n" +
                            "Thank you,\nSmartGov Team");

            mailSender.send(message);
            System.out.println("OTP email sent to: " + toEmail);

        } catch (Exception e) {
            // If email fails, at least log the OTP for testing
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
            System.out.println("\n========================================");
            System.out.println("OTP for " + toEmail + ": " + otpCode);
            System.out.println("========================================");
        }
    }
}