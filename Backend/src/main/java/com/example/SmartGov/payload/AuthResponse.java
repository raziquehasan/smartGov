package com.example.SmartGov.payload;

public class AuthResponse {
    private String token;
    private String firstName;
    private String email;
    private String error;

    // Default constructor (REQUIRED by Spring)
    public AuthResponse() {
    }

    // Parameterized constructor (yeh add karein)
    public AuthResponse(String token, String firstName, String email) {
        this.token = token;
        this.firstName = firstName;
        this.email = email;
    }

    // Another constructor for errors
    public AuthResponse(String error) {
        this.error = error;
    }

    // Getters and Setters (REQUIRED)
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}