package com.srilaxmi.mobiles.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AdminAuthService {

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    private final Map<String, Long> activeTokens =
            new ConcurrentHashMap<>();

    private final SecureRandom secureRandom =
            new SecureRandom();

    @Value("${ADMIN_USERNAME:Kashinath}")
    private String adminUsername;

    @Value("${ADMIN_PASSWORD_HASH:}")
    private String adminPasswordHash;

    public String login(String username, String password) {

        if (username == null || password == null) {
            throw new IllegalArgumentException(
                    "Username and password are required."
            );
        }

        String cleanUsername = username.trim();

        if (!cleanUsername.equals(adminUsername)) {
            throw new IllegalArgumentException(
                    "Invalid username or password."
            );
        }

        if (adminPasswordHash == null ||
                adminPasswordHash.trim().isEmpty()) {

            throw new IllegalStateException(
                    "Admin authentication is not configured on the server."
            );
        }

        if (!passwordEncoder.matches(
                password,
                adminPasswordHash
        )) {
            throw new IllegalArgumentException(
                    "Invalid username or password."
            );
        }

        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);

        String token =
                Base64.getUrlEncoder()
                        .withoutPadding()
                        .encodeToString(tokenBytes);

        long expiresAt =
                System.currentTimeMillis()
                        + (8L * 60L * 60L * 1000L);

        activeTokens.put(token, expiresAt);

        return token;
    }

    public boolean isValidToken(String token) {

        if (token == null || token.trim().isEmpty()) {
            return false;
        }

        Long expiresAt =
                activeTokens.get(token);

        if (expiresAt == null) {
            return false;
        }

        if (expiresAt < System.currentTimeMillis()) {

            activeTokens.remove(token);

            return false;
        }

        return true;
    }

    public void logout(String token) {

        if (token != null) {
            activeTokens.remove(token);
        }
    }
}