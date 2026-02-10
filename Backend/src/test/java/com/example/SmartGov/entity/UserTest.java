package com.example.SmartGov.entity;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;


class UserTest {

    User user = new User();

    @Test
    void createNewUser() {
        assertNotNull(user);
    }

    @Test
    void testId() {
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void testFirstName() {
        user.setFirstName("Ashish");
        assertEquals("Ashish", user.getFirstName());
    }

    @Test
    void testLastName() {
        user.setLastName("Verma");
        assertEquals("Verma", user.getLastName());
    }

    @Test
    void testMobileNumber() {
        user.setMobileNumber("9876543210");
        assertEquals("9876543210", user.getMobileNumber());
    }

    @Test
    void testEmail() {
        user.setEmail("ashish@gmail.com");
        assertEquals("ashish@gmail.com", user.getEmail());
    }

    @Test
    void testPassword() {
        user.setPassword("12345");
        assertEquals("12345", user.getPassword());
    }

    @Test
    void testUpdatedAt() {
        LocalDateTime now = LocalDateTime.now();
        user.setUpdatedAt(now);
        assertEquals(now, user.getUpdatedAt());
    }

    @Test
    void testToString() {
        assertNotNull(user.toString());
    }
}
