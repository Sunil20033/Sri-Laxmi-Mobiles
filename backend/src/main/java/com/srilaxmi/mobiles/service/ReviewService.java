package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Review;
import com.srilaxmi.mobiles.repository.ReviewRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;


    // =========================
    // CONSTRUCTOR
    // =========================

    public ReviewService(
            ReviewRepository reviewRepository
    ) {

        this.reviewRepository = reviewRepository;
    }


    // =========================
    // GET ALL REVIEWS
    // =========================

    public List<Review> getAllReviews() {

        return reviewRepository
                .findAllByOrderByCreatedAtDesc();
    }


    // =========================
    // ADD REVIEW
    // =========================

    public Review addReview(Review review) {

        validateReview(review);

        review.setCustomerName(
                review.getCustomerName().trim()
        );

        review.setComment(
                review.getComment().trim()
        );

        return reviewRepository.save(review);
    }


    // =========================
    // VALIDATE REVIEW
    // =========================

    private void validateReview(Review review) {

        if (review == null) {

            throw new IllegalArgumentException(
                    "Review data is required."
            );
        }


        // =========================
        // CUSTOMER NAME
        // =========================

        if (
                review.getCustomerName() == null ||
                review.getCustomerName().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Customer name is required."
            );
        }


        if (review.getCustomerName().trim().length() > 100) {

            throw new IllegalArgumentException(
                    "Customer name cannot exceed 100 characters."
            );
        }


        // =========================
        // RATING
        // =========================

        if (review.getRating() == null) {

            throw new IllegalArgumentException(
                    "Rating is required."
            );
        }


        if (
                review.getRating() < 1 ||
                review.getRating() > 5
        ) {

            throw new IllegalArgumentException(
                    "Rating must be between 1 and 5."
            );
        }


        // =========================
        // COMMENT
        // =========================

        if (
                review.getComment() == null ||
                review.getComment().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Review comment is required."
            );
        }


        if (review.getComment().trim().length() > 1000) {

            throw new IllegalArgumentException(
                    "Review cannot exceed 1000 characters."
            );
        }
    }
}