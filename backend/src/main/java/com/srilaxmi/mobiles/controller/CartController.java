package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Cart;
import com.srilaxmi.mobiles.service.CartService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;


    public CartController(
            CartService cartService
    ) {

        this.cartService = cartService;
    }


    // =========================
    // GET CART
    // =========================

    @GetMapping
    public ResponseEntity<?> getCart(
            @RequestParam String cartKey
    ) {

        try {

            List<Cart> cartItems =
                    cartService.getCart(cartKey);

            return ResponseEntity.ok(
                    cartItems
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
    // ADD TO CART
    // =========================

    @PostMapping
    public ResponseEntity<?> addToCart(
            @RequestParam String cartKey,
            @RequestParam Long productId
    ) {

        try {

            Cart cart =
                    cartService.addToCart(
                            cartKey,
                            productId
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(cart);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    // =========================
    // UPDATE QUANTITY
    // =========================

    @PutMapping("/{productId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long productId,
            @RequestParam String cartKey,
            @RequestParam Integer quantity
    ) {

        try {

            Cart updatedCart =
                    cartService.updateQuantity(
                            cartKey,
                            productId,
                            quantity
                    );

            return ResponseEntity.ok(
                    updatedCart
            );

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );

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
    public ResponseEntity<Void> removeItem(
            @PathVariable Long productId,
            @RequestParam String cartKey
    ) {

        try {

            cartService.removeItem(
                    cartKey,
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
    // CLEAR CART
    // =========================

    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            @RequestParam String cartKey
    ) {

        cartService.clearCart(cartKey);

        return ResponseEntity
                .noContent()
                .build();
    }
}