package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.Cart;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository
        extends JpaRepository<Cart, Long> {


    // =========================
    // GET CART ITEMS
    // =========================

    List<Cart> findByCartKey(String cartKey);


    // =========================
    // FIND PRODUCT IN CART
    // =========================

    Optional<Cart> findByCartKeyAndProduct_Id(
            String cartKey,
            Long productId
    );


    // =========================
    // DELETE ONE CART ITEM
    // =========================

    void deleteByCartKeyAndProduct_Id(
            String cartKey,
            Long productId
    );


    // =========================
    // CLEAR CART
    // =========================

    void deleteByCartKey(
            String cartKey
    );
}