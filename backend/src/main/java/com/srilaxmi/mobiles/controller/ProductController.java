package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Product;
import com.srilaxmi.mobiles.service.ProductService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;


    public ProductController(
            ProductService productService
    ) {

        this.productService = productService;
    }


    // =========================
    // GET ALL PRODUCTS
    // =========================

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        List<Product> products =
                productService.getAllProducts();

        return ResponseEntity.ok(products);
    }


    // =========================
    // GET PRODUCTS BY CATEGORY
    // =========================

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductsByCategory(
            @PathVariable String category
    ) {

        try {

            List<Product> products =
                    productService
                            .getProductsByCategory(
                                    category
                            );

            return ResponseEntity.ok(products);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );
        }
    }


    // =========================
    // GET PRODUCT BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id
    ) {

        Optional<Product> product =
                productService.getProductById(id);

        return product
                .map(ResponseEntity::ok)
                .orElseGet(
                        () ->
                                ResponseEntity
                                        .notFound()
                                        .build()
                );
    }


    // =========================
    // ADD PRODUCT
    // =========================

    @PostMapping
    public ResponseEntity<?> addProduct(
            @RequestBody Product product
    ) {

        try {

            Product savedProduct =
                    productService.addProduct(product);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedProduct);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );
        }
    }


    // =========================
    // UPDATE PRODUCT
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        try {

            Product updatedProduct =
                    productService.updateProduct(
                            id,
                            product
                    );

            return ResponseEntity.ok(
                    updatedProduct
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
    // DELETE PRODUCT
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id
    ) {

        try {

            productService.deleteProduct(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}