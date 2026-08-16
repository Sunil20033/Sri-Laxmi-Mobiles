package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================
    // CART KEY
    // =========================

    @Column(nullable = false)
    private String cartKey;


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
    // QUANTITY
    // =========================

    @Column(nullable = false)
    private Integer quantity = 1;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public Cart() {
    }


    // =========================
    // CONSTRUCTOR
    // =========================

    public Cart(
            String cartKey,
            Product product,
            Integer quantity
    ) {

        this.cartKey = cartKey;
        this.product = product;
        this.quantity = quantity;
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
    // CART KEY
    // =========================

    public String getCartKey() {

        return cartKey;
    }

    public void setCartKey(String cartKey) {

        this.cartKey = cartKey;
    }


    // =========================
    // PRODUCT
    // =========================

    public Product getProduct() {

        return product;
    }

    public void setProduct(Product product) {

        this.product = product;
    }


    // =========================
    // QUANTITY
    // =========================

    public Integer getQuantity() {

        return quantity;
    }

    public void setQuantity(Integer quantity) {

        this.quantity = quantity;
    }
}