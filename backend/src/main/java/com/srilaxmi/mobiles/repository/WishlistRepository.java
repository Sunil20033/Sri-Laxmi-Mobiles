package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.Wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {


    // =========================
    // GET WISHLIST
    // =========================

    List<Wishlist> findByWishlistKey(
            String wishlistKey
    );


    // =========================
    // FIND PRODUCT IN WISHLIST
    // =========================

    Optional<Wishlist>
    findByWishlistKeyAndProduct_Id(
            String wishlistKey,
            Long productId
    );


    // =========================
    // DELETE ONE ITEM
    // =========================

    void deleteByWishlistKeyAndProduct_Id(
            String wishlistKey,
            Long productId
    );


    // =========================
    // CLEAR WISHLIST
    // =========================

    void deleteByWishlistKey(
            String wishlistKey
    );
}