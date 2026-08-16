package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================
    // CUSTOMER NAME
    // =========================

    @Column(nullable = false, length = 100)
    private String customerName;


    // =========================
    // RATING
    // =========================

    @Column(nullable = false)
    private Integer rating;


    // =========================
    // REVIEW COMMENT
    // =========================

    @Column(nullable = false, length = 1000)
    private String comment;


    // =========================
    // CREATED DATE
    // =========================

    @Column(nullable = false)
    private LocalDateTime createdAt;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public Review() {
    }


    // =========================
    // CONSTRUCTOR
    // =========================

    public Review(
            String customerName,
            Integer rating,
            String comment
    ) {

        this.customerName = customerName;
        this.rating = rating;
        this.comment = comment;
    }


    // =========================
    // PRE PERSIST
    // =========================

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
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
    // CUSTOMER NAME
    // =========================

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    // =========================
    // RATING
    // =========================

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }


    // =========================
    // COMMENT
    // =========================

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    // =========================
    // CREATED DATE
    // =========================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}