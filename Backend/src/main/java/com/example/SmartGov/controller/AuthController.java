package com.example.SmartGov.controller;

import com.example.SmartGov.dto.*;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.service.AuthService;
import com.example.SmartGov.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
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

        // OTP verification check
        boolean verified = otpService.isEmailVerified(request.getEmail());

        if(!verified){
            Map<String,Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Please verify OTP before registration");

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        }

        AuthResponse response = authService.register(request);

        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Registration successful");
        result.put("token", response.getToken());
        result.put("firstName", response.getFirstName());
        result.put("email", response.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

        try {
            AuthResponse response = authService.login(request);

            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("token", response.getToken());
            result.put("firstName", response.getFirstName());
            result.put("email", response.getEmail());

            return ResponseEntity.ok(result);

        } catch (Exception e) {

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid email or password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

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

        boolean isVerified = otpService.verifyOTP(request);

        Map<String, Object> response = new HashMap<>();

        if (isVerified) {
            response.put("success", true);
            response.put("message", "OTP verified successfully");
            response.put("verified", true);
        } else {
            response.put("success", false);
            response.put("message", "Invalid or expired OTP");
            response.put("verified", false);
        }

        return ResponseEntity.ok(response);
    }

    // ================= TEST =================

    @GetMapping("/test")
    public ResponseEntity<?> test() {

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Backend is working!");
        response.put("status", "OK");
        response.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }
}