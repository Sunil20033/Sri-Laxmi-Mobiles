package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.service.AdminAuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "https://sri-laxmi-mobiles.vercel.app"
        }
)
public class AdminAuthController {

    private final AdminAuthService adminAuthService;


    public AdminAuthController(
            AdminAuthService adminAuthService
    ) {

        this.adminAuthService =
                adminAuthService;
    }


    // =========================
    // ADMIN LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request
    ) {

        try {

            String username =
                    request.get("username");

            String password =
                    request.get("password");

            String token =
                    adminAuthService.login(
                            username,
                            password
                    );


            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Admin login successful."
            );

            response.put(
                    "token",
                    token
            );

            response.put(
                    "expiresIn",
                    8 * 60 * 60
            );


            return ResponseEntity.ok(response);


        } catch (IllegalArgumentException exception) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Invalid username or password."
            );


            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);


        } catch (IllegalStateException exception) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Admin authentication is not configured on the server."
            );


            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }


    // =========================
    // VALIDATE ADMIN SESSION
    // =========================

    @GetMapping("/validate")
    public ResponseEntity<?> validate(
            @RequestHeader(
                    value = "Authorization",
                    required = false
            ) String authorization
    ) {

        if (
                authorization == null ||
                !authorization.startsWith("Bearer ")
        ) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "valid",
                                    false
                            )
                    );
        }


        String token =
                authorization.substring(7).trim();


        boolean valid =
                adminAuthService.isValidToken(token);


        if (!valid) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "valid",
                                    false
                            )
                    );
        }


        return ResponseEntity.ok(
                Map.of(
                        "valid",
                        true
                )
        );
    }


    // =========================
    // ADMIN LOGOUT
    // =========================

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestHeader(
                    value = "Authorization",
                    required = false
            ) String authorization
    ) {

        if (
                authorization != null &&
                authorization.startsWith("Bearer ")
        ) {

            String token =
                    authorization.substring(7).trim();

            adminAuthService.logout(token);
        }


        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Admin logout successful."
                )
        );
    }
}