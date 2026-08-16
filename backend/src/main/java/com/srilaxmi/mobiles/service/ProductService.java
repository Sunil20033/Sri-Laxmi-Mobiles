package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Product;
import com.srilaxmi.mobiles.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;


    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    // =========================
    // GET ALL PRODUCTS
    // =========================

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    // =========================
    // GET PRODUCT BY ID
    // =========================

    public Optional<Product> getProductById(Long id) {

        return productRepository.findById(id);
    }


    // =========================
    // ADD PRODUCT
    // =========================

    public Product addProduct(Product product) {

        validateProduct(product);

        return productRepository.save(product);
    }


    // =========================
    // UPDATE PRODUCT
    // =========================

    public Product updateProduct(
            Long id,
            Product updatedProduct
    ) {

        validateProduct(updatedProduct);


        Product existingProduct =
                productRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found with id: " + id
                                )
                        );


        // =========================
        // BASIC PRODUCT INFORMATION
        // =========================

        existingProduct.setBrand(
                updatedProduct.getBrand().trim()
        );

        existingProduct.setName(
                updatedProduct.getName().trim()
        );


        // =========================
        // PRICE
        // =========================

        existingProduct.setPrice(
                updatedProduct.getPrice()
        );

        existingProduct.setOldPrice(
                updatedProduct.getOldPrice()
        );


        // =========================
        // OPTIONAL INFORMATION
        // =========================

        existingProduct.setDiscount(
                cleanOptionalText(
                        updatedProduct.getDiscount()
                )
        );

        existingProduct.setBadge(
                cleanOptionalText(
                        updatedProduct.getBadge()
                )
        );


        // =========================
        // STOCK
        // =========================

        existingProduct.setStock(
                updatedProduct.getStock()
        );


        // =========================
        // PRODUCT IMAGE
        // =========================

        existingProduct.setImage(
                cleanOptionalText(
                        updatedProduct.getImage()
                )
        );


        // =========================
        // PRODUCT CATEGORY
        // =========================

        existingProduct.setCategory(
                cleanOptionalText(
                        updatedProduct.getCategory()
                )
        );


        return productRepository.save(
                existingProduct
        );
    }


    // =========================
    // DELETE PRODUCT
    // =========================

    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {

            throw new RuntimeException(
                    "Product not found with id: " + id
            );
        }

        productRepository.deleteById(id);
    }


    // =========================
    // GET PRODUCTS BY CATEGORY
    // =========================

    public List<Product> getProductsByCategory(
            String category
    ) {

        if (
                category == null ||
                category.trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Category is required."
            );
        }

        return productRepository
                .findByCategoryIgnoreCase(
                        category.trim()
                );
    }


    // =========================
    // PRODUCT VALIDATION
    // =========================

    private void validateProduct(Product product) {

        if (product == null) {

            throw new IllegalArgumentException(
                    "Product data is required."
            );
        }


        // =========================
        // BRAND
        // =========================

        if (
                product.getBrand() == null ||
                product.getBrand().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Brand is required."
            );
        }


        // =========================
        // PRODUCT NAME
        // =========================

        if (
                product.getName() == null ||
                product.getName().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Product name is required."
            );
        }


        // =========================
        // PRICE
        // =========================

        if (product.getPrice() == null) {

            throw new IllegalArgumentException(
                    "Price is required."
            );
        }


        if (product.getPrice() < 0) {

            throw new IllegalArgumentException(
                    "Price cannot be negative."
            );
        }


        // =========================
        // OLD PRICE
        // =========================

        if (product.getOldPrice() == null) {

            throw new IllegalArgumentException(
                    "Original price is required."
            );
        }


        if (product.getOldPrice() < 0) {

            throw new IllegalArgumentException(
                    "Original price cannot be negative."
            );
        }


        // =========================
        // STOCK
        // =========================

        if (product.getStock() == null) {

            product.setStock(true);
        }


        // =========================
        // NORMALISE BASIC VALUES
        // =========================

        product.setBrand(
                product.getBrand().trim()
        );

        product.setName(
                product.getName().trim()
        );


        // =========================
        // NORMALISE OPTIONAL VALUES
        // =========================

        product.setDiscount(
                cleanOptionalText(
                        product.getDiscount()
                )
        );

        product.setBadge(
                cleanOptionalText(
                        product.getBadge()
                )
        );

        product.setImage(
                cleanOptionalText(
                        product.getImage()
                )
        );


        // =========================
        // NORMALISE CATEGORY
        // =========================

        product.setCategory(
                cleanOptionalText(
                        product.getCategory()
                )
        );
    }


    // =========================
    // CLEAN OPTIONAL TEXT
    // =========================

    private String cleanOptionalText(String value) {

        if (value == null) {
            return null;
        }

        String cleaned = value.trim();

        return cleaned.isEmpty()
                ? null
                : cleaned;
    }
}