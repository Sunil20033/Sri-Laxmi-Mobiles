package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.RepairRequest;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepairRequestRepository
        extends JpaRepository<RepairRequest, Long> {
}