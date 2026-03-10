package com.example.SmartGov.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component

public class JwtUtil {

    private final JwtSecretKeyGenerator keyGenerator;
    private static  final long Expiration_time =1000*60*60 ;

    public JwtUtil(JwtSecretKeyGenerator keyGenerator){
        this.keyGenerator = keyGenerator;
    }

   public String generateToken(String username){
        SecretKey key  = keyGenerator.getSecretKey();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Expiration_time))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(keyGenerator.getSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            throw new JwtException("invalid JWT token " , e);
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(keyGenerator.getSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
    public Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(keyGenerator.getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
}

