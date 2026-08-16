package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Wishlist;
import com.srilaxmi.mobiles.service.WishlistService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    private final WishlistService wishlistService;


    public WishlistController(
            WishlistService wishlistService
    ) {

        this.wishlistService =
                wishlistService;
    }


    // =========================
    // GET WISHLIST
    // =========================

    @GetMapping
    public ResponseEntity<?> getWishlist(
            @RequestParam String wishlistKey
    ) {

        try {

            List<Wishlist> wishlistItems =
                    wishlistService.getWishlist(
                            wishlistKey
                    );

            return ResponseEntity.ok(
                    wishlistItems
            );

        } catch (Exception exception) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            exception.getMessage()
                    );
        }
    }


    // =========================
    // ADD TO WISHLIST
    // =========================

    @PostMapping
    public ResponseEntity<?> addToWishlist(
            @RequestParam String wishlistKey,
            @RequestParam Long productId
    ) {

        try {

            Wishlist wishlist =
                    wishlistService.addToWishlist(
                            wishlistKey,
                            productId
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(wishlist);

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    // =========================
    // REMOVE ITEM
    // =========================

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(
            @PathVariable Long productId,
            @RequestParam String wishlistKey
    ) {

        try {

            wishlistService.removeFromWishlist(
                    wishlistKey,
                    productId
            );

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    // =========================
    // CLEAR WISHLIST
    // =========================

    @DeleteMapping
    public ResponseEntity<Void> clearWishlist(
            @RequestParam String wishlistKey
    ) {

        wishlistService.clearWishlist(
                wishlistKey
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}