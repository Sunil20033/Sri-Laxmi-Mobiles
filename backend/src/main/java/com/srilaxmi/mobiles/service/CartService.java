package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Cart;
import com.srilaxmi.mobiles.entity.Product;
import com.srilaxmi.mobiles.repository.CartRepository;
import com.srilaxmi.mobiles.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;


    public CartService(
            CartRepository cartRepository,
            ProductRepository productRepository
    ) {

        this.cartRepository = cartRepository;

        this.productRepository = productRepository;
    }


    // =========================
    // GET CART
    // =========================

    public List<Cart> getCart(
            String cartKey
    ) {

        return cartRepository.findByCartKey(
                cartKey
        );
    }


    // =========================
    // ADD TO CART
    // =========================

    public Cart addToCart(
            String cartKey,
            Long productId
    ) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found with id: "
                                                + productId
                                )
                        );


        if (
                product.getStock() == null ||
                !product.getStock()
        ) {

            throw new RuntimeException(
                    "Product is currently unavailable."
            );
        }


        var existingItem =
                cartRepository
                        .findByCartKeyAndProduct_Id(
                                cartKey,
                                productId
                        );


        if (existingItem.isPresent()) {

            Cart cart =
                    existingItem.get();

            cart.setQuantity(
                    cart.getQuantity() + 1
            );

            return cartRepository.save(cart);
        }


        Cart cart = new Cart();

        cart.setCartKey(cartKey);

        cart.setProduct(product);

        cart.setQuantity(1);


        return cartRepository.save(cart);
    }


    // =========================
    // UPDATE QUANTITY
    // =========================

    public Cart updateQuantity(
            String cartKey,
            Long productId,
            Integer quantity
    ) {

        Cart cart =
                cartRepository
                        .findByCartKeyAndProduct_Id(
                                cartKey,
                                productId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Cart item not found."
                                )
                        );


        if (quantity == null || quantity < 1) {

            throw new IllegalArgumentException(
                    "Quantity must be at least 1."
            );
        }


        cart.setQuantity(quantity);


        return cartRepository.save(cart);
    }


    // =========================
    // REMOVE ITEM
    // =========================

    public void removeItem(
            String cartKey,
            Long productId
    ) {

        Cart cart =
                cartRepository
                        .findByCartKeyAndProduct_Id(
                                cartKey,
                                productId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Cart item not found."
                                )
                        );


        cartRepository.delete(cart);
    }


    // =========================
    // CLEAR CART
    // =========================

    public void clearCart(
            String cartKey
    ) {

        cartRepository.deleteByCartKey(
                cartKey
        );
    }
}