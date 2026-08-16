package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "wishlist_items")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================
    // WISHLIST KEY
    // =========================

    @Column(nullable = false)
    private String wishlistKey;


    // =========================
    // PRODUCT
    // =========================

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "product_id",
            nullable = false
    )
    private Product product;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public Wishlist() {
    }


    // =========================
    // CONSTRUCTOR
    // =========================

    public Wishlist(
            String wishlistKey,
            Product product
    ) {

        this.wishlistKey = wishlistKey;
        this.product = product;
    }


    // =========================
    // ID
    // =========================

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }


    // =========================
    // WISHLIST KEY
    // =========================

    public String getWishlistKey() {

        return wishlistKey;
    }

    public void setWishlistKey(
            String wishlistKey
    ) {

        this.wishlistKey = wishlistKey;
    }


    // =========================
    // PRODUCT
    // =========================

    public Product getProduct() {

        return product;
    }

    public void setProduct(
            Product product
    ) {

        this.product = product;
    }
}