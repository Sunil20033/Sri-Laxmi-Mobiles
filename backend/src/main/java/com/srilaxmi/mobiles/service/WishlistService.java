package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Product;
import com.srilaxmi.mobiles.entity.Wishlist;
import com.srilaxmi.mobiles.repository.ProductRepository;
import com.srilaxmi.mobiles.repository.WishlistRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    private final ProductRepository productRepository;


    public WishlistService(
            WishlistRepository wishlistRepository,
            ProductRepository productRepository
    ) {

        this.wishlistRepository =
                wishlistRepository;

        this.productRepository =
                productRepository;
    }


    // =========================
    // GET WISHLIST
    // =========================

    public List<Wishlist> getWishlist(
            String wishlistKey
    ) {

        return wishlistRepository.findByWishlistKey(
                wishlistKey
        );
    }


    // =========================
    // ADD TO WISHLIST
    // =========================

    public Wishlist addToWishlist(
            String wishlistKey,
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


        var existingItem =
                wishlistRepository
                        .findByWishlistKeyAndProduct_Id(
                                wishlistKey,
                                productId
                        );


        if (existingItem.isPresent()) {

            return existingItem.get();
        }


        Wishlist wishlist =
                new Wishlist();

        wishlist.setWishlistKey(
                wishlistKey
        );

        wishlist.setProduct(
                product
        );


        return wishlistRepository.save(
                wishlist
        );
    }


    // =========================
    // REMOVE ITEM
    // =========================

    public void removeFromWishlist(
            String wishlistKey,
            Long productId
    ) {

        Wishlist wishlist =
                wishlistRepository
                        .findByWishlistKeyAndProduct_Id(
                                wishlistKey,
                                productId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Wishlist item not found."
                                )
                        );


        wishlistRepository.delete(
                wishlist
        );
    }


    // =========================
    // CLEAR WISHLIST
    // =========================

// =========================
// CLEAR WISHLIST
// =========================

  public void clearWishlist(
          String wishlistKey
  ) {

      List<Wishlist> wishlistItems =
              wishlistRepository.findByWishlistKey(
                      wishlistKey
              );

      if (!wishlistItems.isEmpty()) {

          wishlistRepository.deleteAll(
                  wishlistItems
          );
      }
  }
}