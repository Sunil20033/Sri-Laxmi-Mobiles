package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double oldPrice;

    private String discount;

    private String badge;

    @Column(nullable = false)
    private Boolean stock = true;

    private String image;

    // =========================
    // PRODUCT CATEGORY
    // =========================

    private String category;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public Product() {
    }


    // =========================
    // CONSTRUCTOR
    // =========================

    public Product(
            String brand,
            String name,
            Double price,
            Double oldPrice,
            String discount,
            String badge,
            Boolean stock,
            String image,
            String category
    ) {

        this.brand = brand;
        this.name = name;
        this.price = price;
        this.oldPrice = oldPrice;
        this.discount = discount;
        this.badge = badge;
        this.stock = stock;
        this.image = image;
        this.category = category;
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
    // BRAND
    // =========================

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }


    // =========================
    // NAME
    // =========================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // =========================
    // PRICE
    // =========================

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    // =========================
    // OLD PRICE
    // =========================

    public Double getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(Double oldPrice) {
        this.oldPrice = oldPrice;
    }


    // =========================
    // DISCOUNT
    // =========================

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }


    // =========================
    // BADGE
    // =========================

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }


    // =========================
    // STOCK
    // =========================

    public Boolean getStock() {
        return stock;
    }

    public void setStock(Boolean stock) {
        this.stock = stock;
    }


    // =========================
    // IMAGE
    // =========================

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    // =========================
    // CATEGORY
    // =========================

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}