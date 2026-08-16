package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Customer;
import com.srilaxmi.mobiles.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;


    public AuthController(
            AuthService authService
    ) {

        this.authService =
                authService;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Map<String, String> request
    ) {

        try {

            String name =
                    request.get("name");

            String mobile =
                    request.get("mobile");

            String email =
                    request.get("email");

            String password =
                    request.get("password");


            Customer customer =
                    authService.registerCustomer(
                            name,
                            mobile,
                            email,
                            password
                    );


            // =========================
            // RESPONSE
            // =========================

            Map<String, Object> response =
                    new HashMap<>();


            response.put(
                    "message",
                    "Registration successful."
            );


            response.put(
                    "customer",
                    createSafeCustomerResponse(
                            customer
                    )
            );


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);


        } catch (
                IllegalArgumentException exception
        ) {

            Map<String, String> response =
                    new HashMap<>();


            response.put(
                    "message",
                    exception.getMessage()
            );


            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }


    // =========================
    // SAFE CUSTOMER RESPONSE
    // =========================

    private Map<String, Object>
    createSafeCustomerResponse(
            Customer customer
    ) {

        Map<String, Object> response =
                new HashMap<>();


        response.put(
                "id",
                customer.getId()
        );


        response.put(
                "name",
                customer.getName()
        );


        response.put(
                "mobile",
                customer.getMobile()
        );


        response.put(
                "email",
                customer.getEmail()
        );


        response.put(
                "createdAt",
                customer.getCreatedAt()
        );


        return response;
    }
        // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request
    ) {

        try {

            String email =
                    request.get("email");

            String password =
                    request.get("password");


            Customer customer =
                    authService.loginCustomer(
                            email,
                            password
                    );


            Map<String, Object> response =
                    new HashMap<>();


            response.put(
                    "message",
                    "Login successful."
            );


            response.put(
                    "customer",
                    createSafeCustomerResponse(
                            customer
                    )
            );


            return ResponseEntity.ok(
                    response
            );


        } catch (
                IllegalArgumentException exception
        ) {

            Map<String, String> response =
                    new HashMap<>();


            response.put(
                    "message",
                    exception.getMessage()
            );


            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }
}