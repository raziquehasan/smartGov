package com.example.SmartGov.dto;

import com.example.SmartGov.enums.ROLES;
import com.example.SmartGov.enums.States;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
    private String mobileNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password; // Add this field

    @NotNull(message = "State is required")
    private States state;

    private ROLES role = ROLES.CITIZENS;

    public UserDto(Long id, String firstName, String lastName, String mobileNumber, String email, String password, States state, ROLES role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.password = password;
        this.state = state;
        this.role = role;
    }

    public UserDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "First name is required") String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotBlank(message = "First name is required") String firstName) {
        this.firstName = firstName;
    }

    public @NotBlank(message = "Last name is required") String getLastName() {
        return lastName;
    }

    public void setLastName(@NotBlank(message = "Last name is required") String lastName) {
        this.lastName = lastName;
    }

    public @NotBlank(message = "Mobile number is required") @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number") String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(@NotBlank(message = "Mobile number is required") @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number") String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters") String password) {
        this.password = password;
    }

    public @NotNull(message = "State is required") States getState() {
        return state;
    }

    public void setState(@NotNull(message = "State is required") States state) {
        this.state = state;
    }

    public ROLES getRole() {
        return role;
    }

    public void setRole(ROLES role) {
        this.role = role;
    }
}