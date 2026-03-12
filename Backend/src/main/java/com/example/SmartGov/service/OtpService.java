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

    private String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    public OtpVerification createAndSendOTP(OtpRequestDto request) {

        OTPType type = OTPType.valueOf(request.getType().toUpperCase());

        // Rate limit check
        LocalDateTime lastHour = LocalDateTime.now().minusHours(1);
        Long recentRequests = otpRepository.countByEmailAndOtpTypeAndCreatedAtAfter(
                request.getEmail(), type, lastHour);

        if (recentRequests >= maxResend) {
            throw new RuntimeException("Maximum resend attempts reached. Please try again later.");
        }

        // Invalidate old OTPs
        otpRepository.markAllAsVerified(request.getEmail(), type);

        // Generate OTP
        String otpCode = generateOTP();

        OtpVerification otp = new OtpVerification();
        otp.setEmail(request.getEmail());
        otp.setOtpCode(otpCode);
        otp.setOtpType(type);
        otp.setCreatedAt(LocalDateTime.now());
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otp.setVerified(false);
        otp.setAttempts(0);

        otp = otpRepository.save(otp);

        sendOTPEmail(request.getEmail(), otpCode);

        return otp;
    }

    public boolean verifyOTP(OtpVerificationDTO request) {

        OTPType type = OTPType.valueOf(request.getType().toUpperCase());

        Optional<OtpVerification> otpOpt =
                otpRepository.findTopByEmailAndOtpTypeAndVerifiedFalseOrderByCreatedAtDesc(
                        request.getEmail(), type);

        if (otpOpt.isEmpty()) {
            return false;
        }

        OtpVerification otp = otpOpt.get();

        // Check expiry
        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            return false;
        }

        // Check attempts
        if (otp.getAttempts() >= maxAttempts) {
            return false;
        }

        // Wrong OTP
        if (!otp.getOtpCode().equals(request.getOtp())) {
            otp.setAttempts(otp.getAttempts() + 1);
            otpRepository.save(otp);
            return false;
        }

        // Correct OTP
        otp.setVerified(true);
        otpRepository.save(otp);

        return true;
    }

    public boolean isEmailVerified(String email) {

        Optional<OtpVerification> otpOpt =
                otpRepository.findTopByEmailAndOtpTypeOrderByCreatedAtDesc(
                        email, OTPType.REGISTRATION);

        if (otpOpt.isEmpty()) {
            return false;
        }

        OtpVerification otp = otpOpt.get();

        return otp.getVerified() && otp.getExpiresAt().isAfter(LocalDateTime.now());
    }

    private void sendOTPEmail(String toEmail, String otpCode) {
        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("SmartGov - Email Verification OTP");
            message.setText(
                    "Your OTP for SmartGov registration is: " + otpCode + "\n\n" +
                            "This OTP is valid for " + otpExpiryMinutes + " minutes.\n\n" +
                            "SmartGov Team"
            );

            mailSender.send(message);
            System.out.println("OTP email sent to: " + toEmail);

        } catch (Exception e) {

            System.err.println("Email failed: " + e.getMessage());

            System.out.println("\n===============================");
            System.out.println("OTP for " + toEmail + ": " + otpCode);
            System.out.println("===============================");
        }
    }
}