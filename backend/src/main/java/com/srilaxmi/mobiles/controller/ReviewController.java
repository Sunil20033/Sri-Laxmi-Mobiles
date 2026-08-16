package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Review;
import com.srilaxmi.mobiles.service.ReviewService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;


    // =========================
    // CONSTRUCTOR
    // =========================

    public ReviewController(
            ReviewService reviewService
    ) {

        this.reviewService = reviewService;
    }


    // =========================
    // GET ALL REVIEWS
    // =========================

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {

        return ResponseEntity.ok(
                reviewService.getAllReviews()
        );
    }


    // =========================
    // ADD REVIEW
    // =========================

    @PostMapping
    public ResponseEntity<?> addReview(
            @RequestBody Review review
    ) {

        try {

            Review savedReview =
                    reviewService.addReview(review);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedReview);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );
        }
    }
}