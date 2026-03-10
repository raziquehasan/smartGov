/*
package com.example.SmartGov.controller;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private HikariDataSource dataSource;

    @GetMapping("/database")
    public ResponseEntity<Map<String, Object>> checkDatabase() {
        Map<String, Object> response = new HashMap<>();

        try (Connection connection = dataSource.getConnection()) {
            boolean isValid = connection.isValid(5); // 5 second timeout

            response.put("status", "UP");
            response.put("database", "PostgreSQL");
            response.put("valid", isValid);
            response.put("pool", getPoolStats());
            response.put("timestamp", LocalDateTime.now().toString());

            return ResponseEntity.ok(response);

        } catch (SQLException e) {
            response.put("status", "DOWN");
            response.put("error", e.getMessage());
            response.put("timestamp", LocalDateTime.now().toString());
            return ResponseEntity.status(503).body(response);
        }
    }

    private Map<String, Object> getPoolStats() {
        Map<String, Object> stats = new HashMap<>();
        if (dataSource != null && dataSource.getHikariPoolMXBean() != null) {
            stats.put("activeConnections", dataSource.getHikariPoolMXBean().getActiveConnections());
            stats.put("idleConnections", dataSource.getHikariPoolMXBean().getIdleConnections());
            stats.put("totalConnections", dataSource.getHikariPoolMXBean().getTotalConnections());
            stats.put("threadsAwaitingConnection", dataSource.getHikariPoolMXBean().getThreadsAwaitingConnection());
        }
        return stats;
    }
}
*/
