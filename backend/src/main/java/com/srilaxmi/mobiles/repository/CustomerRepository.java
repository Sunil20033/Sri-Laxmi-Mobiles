package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CustomerRepository
        extends JpaRepository<Customer, Long> {


    Optional<Customer> findByMobile(
            String mobile
    );


    Optional<Customer> findByEmail(
            String email
    );


    boolean existsByMobile(
            String mobile
    );


    boolean existsByEmail(
            String email
    );
}