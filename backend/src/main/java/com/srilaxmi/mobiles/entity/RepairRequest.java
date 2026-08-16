package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "repair_requests")
public class RepairRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String name;


    @Column(nullable = false, length = 10)
    private String phone;


    @Column(nullable = false)
    private String model;


    @Column(nullable = false)
    private String service;


    @Column(nullable = false, length = 1000)
    private String problem;


    private String preferredTime;


    @Column(nullable = false)
    private String status = "PENDING";


    @Column(nullable = false)
    private LocalDateTime createdAt;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public RepairRequest() {
    }


    // =========================
    // CONSTRUCTOR
    // =========================

    public RepairRequest(
            String name,
            String phone,
            String model,
            String service,
            String problem,
            String preferredTime
    ) {

        this.name = name;
        this.phone = phone;
        this.model = model;
        this.service = service;
        this.problem = problem;
        this.preferredTime = preferredTime;
        this.status = "PENDING";
    }


    // =========================
    // SET CREATED TIME
    // =========================

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (status == null || status.trim().isEmpty()) {
            status = "PENDING";
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
    // NAME
    // =========================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // =========================
    // PHONE
    // =========================

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    // =========================
    // MODEL
    // =========================

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }


    // =========================
    // SERVICE
    // =========================

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }


    // =========================
    // PROBLEM
    // =========================

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }


    // =========================
    // PREFERRED TIME
    // =========================

    public String getPreferredTime() {
        return preferredTime;
    }

    public void setPreferredTime(String preferredTime) {
        this.preferredTime = preferredTime;
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


    // =========================
    // CREATED AT
    // =========================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}