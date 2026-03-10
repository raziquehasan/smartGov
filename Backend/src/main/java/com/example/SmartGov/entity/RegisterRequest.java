package com.example.SmartGov.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import com.example.SmartGov.enums.States;

import lombok.Setter;

@Getter
@Setter

public class RegisterRequest {


        @NotBlank(message = "First name is required")
        private String firstName;

        @NotBlank(message = "Last name is required")
        private String lastName;

        @NotBlank(message = "Mobile number is required")
        @Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
        @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
        private String mobileNumber;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

       @Enumerated(EnumType.STRING)
        @NotNull(message = "State is required")
        private States state;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;


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

    public @NotBlank(message = "Mobile number is required") @Size(min = 10, max = 10, message = "Mobile number must be 10 digits") @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number") String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(@NotBlank(message = "Mobile number is required") @Size(min = 10, max = 10, message = "Mobile number must be 10 digits") @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number") String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email) {
        this.email = email;
    }

    public @NotNull(message = "State is required") States getState() {
        return state;
    }

    public void setState(@NotNull(message = "State is required") States state) {
        this.state = state;
    }

    public @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String password) {
        this.password = password;
    }
}

