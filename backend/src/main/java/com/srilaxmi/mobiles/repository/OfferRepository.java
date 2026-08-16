package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.Offer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OfferRepository
        extends JpaRepository<Offer, Long> {

    Optional<Offer> findFirstByActiveTrueOrderByIdDesc();

    List<Offer> findByOrderByIdDesc();

    List<Offer> findByActiveTrueAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}