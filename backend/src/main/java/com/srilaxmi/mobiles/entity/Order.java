package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================
    // CUSTOMER ID
    // =========================

    @Column(name = "customer_id")
    private Long customerId;


    // =========================
    // CUSTOMER DETAILS
    // =========================

    @Column(nullable = false)
    private String customerName;


    @Column(nullable = false)
    private String mobile;


    @Column(nullable = false, length = 500)
    private String address;


    @Column(length = 1000)
    private String notes;


    // =========================
    // ORDER AMOUNTS
    // =========================

    @Column(nullable = false)
    private Double subtotal;


    @Column(nullable = false)
    private Double deliveryCharge = 0.0;


    @Column(nullable = false)
    private Double total;


    // =========================
    // ORDER STATUS
    // =========================

    @Column(nullable = false)
    private String status = "PENDING";


    @Column(nullable = false)
    private LocalDateTime orderDate;


    // =========================
    // ORDER ITEMS
    // =========================

    @OneToMany(
        mappedBy = "order",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonManagedReference
    private List<OrderItem> items = new ArrayList<>();


    // =========================
    // CONSTRUCTOR
    // =========================

    public Order() {
    }


    // =========================
    // GETTERS AND SETTERS
    // =========================

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Long getCustomerId() {
        return customerId;
    }


    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }


    public String getCustomerName() {
        return customerName;
    }


    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    public String getMobile() {
        return mobile;
    }


    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getAddress() {
        return address;
    }


    public void setAddress(String address) {
        this.address = address;
    }


    public String getNotes() {
        return notes;
    }


    public void setNotes(String notes) {
        this.notes = notes;
    }


    public Double getSubtotal() {
        return subtotal;
    }


    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }


    public Double getDeliveryCharge() {
        return deliveryCharge;
    }


    public void setDeliveryCharge(Double deliveryCharge) {
        this.deliveryCharge = deliveryCharge;
    }


    public Double getTotal() {
        return total;
    }


    public void setTotal(Double total) {
        this.total = total;
    }


    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }


    public LocalDateTime getOrderDate() {
        return orderDate;
    }


    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }


    public List<OrderItem> getItems() {
        return items;
    }


    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}