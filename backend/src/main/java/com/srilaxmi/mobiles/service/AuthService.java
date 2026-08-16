package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Customer;
import com.srilaxmi.mobiles.repository.CustomerRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final CustomerRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder;


    public AuthService(
            CustomerRepository customerRepository
    ) {

        this.customerRepository =
                customerRepository;

        this.passwordEncoder =
                new BCryptPasswordEncoder();
    }


    // =========================
    // REGISTER CUSTOMER
    // =========================

    public Customer registerCustomer(
            String name,
            String mobile,
            String email,
            String password
    ) {


        // =========================
        // VALIDATION
        // =========================

        if (name == null ||
                name.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Name is required."
            );
        }


        if (mobile == null ||
                mobile.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Mobile number is required."
            );
        }


        if (email == null ||
                email.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required."
            );
        }


        if (password == null ||
                password.isEmpty()) {

            throw new IllegalArgumentException(
                    "Password is required."
            );
        }


        String cleanName =
                name.trim();

        String cleanMobile =
                mobile.trim();

        String cleanEmail =
                email.trim().toLowerCase();


        // =========================
        // PASSWORD LENGTH
        // =========================

        if (password.length() < 6) {

            throw new IllegalArgumentException(
                    "Password must be at least 6 characters."
            );
        }


        // =========================
        // MOBILE DUPLICATE
        // =========================

        if (customerRepository
                .existsByMobile(cleanMobile)) {

            throw new IllegalArgumentException(
                    "Mobile number is already registered."
            );
        }


        // =========================
        // EMAIL DUPLICATE
        // =========================

        if (customerRepository
                .existsByEmail(cleanEmail)) {

            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }


        // =========================
        // CREATE CUSTOMER
        // =========================

        Customer customer =
                new Customer();


        customer.setName(cleanName);

        customer.setMobile(cleanMobile);

        customer.setEmail(cleanEmail);


        // NEVER store plain password

        customer.setPassword(
                passwordEncoder.encode(password)
        );


        return customerRepository.save(
                customer
        );
    }
        // =========================
    // CUSTOMER LOGIN
    // =========================

    public Customer loginCustomer(
            String email,
            String password
    ) {

        if (email == null ||
                email.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required."
            );
        }


        if (password == null ||
                password.isEmpty()) {

            throw new IllegalArgumentException(
                    "Password is required."
            );
        }


        String cleanEmail =
                email.trim().toLowerCase();


        Customer customer =
                customerRepository
                        .findByEmail(cleanEmail)
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Invalid email or password."
                                )
                        );


        boolean passwordMatches =
                passwordEncoder.matches(
                        password,
                        customer.getPassword()
                );


        if (!passwordMatches) {

            throw new IllegalArgumentException(
                    "Invalid email or password."
            );
        }


        return customer;
    }
}