package com.example.SmartGov.payload;

public class AuthResponse {
    private String token;
    private String firstName;
    private String email;
    private String profilePicture; // Keep profilePicture
    private String error; // Restore error field

    // Default constructor (REQUIRED by Spring)
    public AuthResponse() {
    }

    // Parameterized constructor for success
    public AuthResponse(String token, String firstName, String email, String profilePicture) {
        this.token = token;
        this.firstName = firstName;
        this.email = email;
        this.profilePicture = profilePicture;
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

    // Getters and Setters for profilePicture
    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    // Getters and Setters for error
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}