package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    List<Review> findAllByOrderByCreatedAtDesc();
}