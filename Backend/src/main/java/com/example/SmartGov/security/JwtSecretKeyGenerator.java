package com.example.SmartGov.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;

@Component
public class JwtSecretKeyGenerator {

    private final SecretKey secretKey;

   public JwtSecretKeyGenerator(@Value("${jwt.secret}") String secret){
       byte[] keyBytes = Decoders.BASE64.decode(secret);
       this.secretKey = Keys.hmacShaKeyFor(keyBytes);
   }

    public SecretKey getSecretKey(){
        return secretKey;
    }

    public String getSecretKeyString(){
        return java.util.Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }


}
