package com.example.SmartGov.controller;

import com.example.SmartGov.dto.*;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.service.AuthService;
import com.example.SmartGov.service.OtpService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    // ================= SEND OTP =================

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@Valid @RequestBody OtpRequestDto request) {

        otpService.createAndSendOTP(request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "OTP sent successfully");
        response.put("expiresIn", 600);

        return ResponseEntity.ok(response);
    }

    // ================= VERIFY OTP =================

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@Valid @RequestBody OtpVerificationDTO request) {

        boolean verified = otpService.verifyOTP(request);

        if (!verified) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid or expired OTP");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "OTP verified successfully");

        return ResponseEntity.ok(response);
    }

    // ================= REGISTER =================

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

        if (authService.existsByEmail(request.getEmail())) {

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Email already registered");

            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }

        // Verify OTP before creating account
        otpService.verifyOTPByEmail(request.getEmail(), request.getOtpCode());

        AuthResponse response = authService.register(request);

        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("success", true);
        successResponse.put("token", response.getToken());
        successResponse.put("firstName", response.getFirstName());
        successResponse.put("email", response.getEmail());
        successResponse.put("message", "Registration successful");

        return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

        try {

            AuthResponse response = authService.login(request);

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("success", true);
            successResponse.put("token", response.getToken());
            successResponse.put("firstName", response.getFirstName());
            successResponse.put("email", response.getEmail());

            return ResponseEntity.ok(successResponse);

        } catch (Exception e) {

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid email or password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    // ================= TEST API =================

    @GetMapping("/test")
    public ResponseEntity<?> test() {

        Map<String, Object> response = new HashMap<>();
        response.put("message", "SmartGov Backend Running");
        response.put("status", "OK");
        response.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }
}