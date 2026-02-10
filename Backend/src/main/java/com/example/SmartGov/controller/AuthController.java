package com.example.SmartGov.controller;

import com.example.SmartGov.dto.*;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.service.AuthService;
import com.example.SmartGov.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Frontend के लिए CORS enable करो
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OtpService otpService; // अगर आपके पास OtpService है

    // ==================== WITHOUT OTP VERSION (Simple) ====================

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // Check if email already exists
            if (authService.existsByEmail(request.getEmail())) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "Email already registered");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }

            // Create user
            AuthResponse response = authService.register(request);

            // Return success response
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("success", true);
            successResponse.put("message", "Registration successful");
            successResponse.put("token", response.getToken());
            successResponse.put("firstName", response.getFirstName());
            successResponse.put("email", response.getEmail());

            return new ResponseEntity<>(successResponse, HttpStatus.CREATED);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);

            // Return success response in frontend format
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

    // ==================== WITH OTP VERSION (Optional) ====================

    // OTP के लिए ये endpoints add करो अगर चाहिए तो

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@Valid @RequestBody OtpRequestDto request) {
        try {
            // Send OTP logic here
            // otpService.createAndSendOTP(request);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP sent successfully (Demo)");
            response.put("expiresIn", 600); // 10 minutes

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@Valid @RequestBody OtpVerificationDTO request) {
        try {
            // Verify OTP logic here
            // boolean isVerified = otpService.verifyOTP(request);

            // For demo, always return success
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP verified successfully (Demo)");
            response.put("verified", true);
            response.put("verificationToken", "demo_token_123");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ==================== TEST ENDPOINT ====================

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Backend is working!");
        response.put("status", "OK");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}