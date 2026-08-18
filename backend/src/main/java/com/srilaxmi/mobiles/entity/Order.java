package com.srilaxmi.mobiles.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    // PAYMENT
    // =========================

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private String paymentStatus;


    // =========================
    // DELIVERY LOCATION
    // =========================

    @Column
    private Double customerLatitude;

    @Column
    private Double customerLongitude;

    @Column(nullable = false)
    private Double deliveryDistanceKm;


    // =========================
    // RETURN POLICY
    // =========================

    @Column(nullable = false)
    private Boolean returnPolicyAccepted = false;


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


    // =========================
    // ORDER AMOUNTS
    // =========================

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


    // =========================
    // PAYMENT
    // =========================

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }


    // =========================
    // LOCATION
    // =========================

    public Double getCustomerLatitude() {
        return customerLatitude;
    }

    public void setCustomerLatitude(Double customerLatitude) {
        this.customerLatitude = customerLatitude;
    }


    public Double getCustomerLongitude() {
        return customerLongitude;
    }

    public void setCustomerLongitude(Double customerLongitude) {
        this.customerLongitude = customerLongitude;
    }


    public Double getDeliveryDistanceKm() {
        return deliveryDistanceKm;
    }

    public void setDeliveryDistanceKm(
            Double deliveryDistanceKm
    ) {
        this.deliveryDistanceKm = deliveryDistanceKm;
    }


    // =========================
    // RETURN POLICY
    // =========================

    public Boolean getReturnPolicyAccepted() {
        return returnPolicyAccepted;
    }

    public void setReturnPolicyAccepted(
            Boolean returnPolicyAccepted
    ) {
        this.returnPolicyAccepted =
                returnPolicyAccepted;
    }


    // =========================
    // STATUS
    // =========================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(
            LocalDateTime orderDate
    ) {
        this.orderDate = orderDate;
    }


    // =========================
    // ITEMS
    // =========================

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(
            List<OrderItem> items
    ) {
        this.items = items;
    }
}