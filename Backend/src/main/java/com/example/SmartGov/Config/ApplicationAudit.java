package com.example.SmartGov.Config;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class ApplicationAudit implements AuditorAware<String> {


    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("System");
    }
}
