package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Offer;
import com.srilaxmi.mobiles.service.OfferService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "http://localhost:5173")
public class OfferController {

    private final OfferService offerService;

    public OfferController(
            OfferService offerService
    ) {

        this.offerService = offerService;
    }

    // =========================
    // GET ALL OFFERS
    // =========================

    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {

        return ResponseEntity.ok(
                offerService.getAllOffers()
        );
    }

    // =========================
    // GET CURRENT OFFER
    // =========================

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentOffer() {

        Offer offer =
                offerService.getCurrentOffer();

        if (offer == null) {

            return ResponseEntity
                    .noContent()
                    .build();
        }

        return ResponseEntity.ok(offer);
    }

    // =========================
    // GET OFFER BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<?> getOfferById(
            @PathVariable Long id
    ) {

        try {

            return ResponseEntity.ok(
                    offerService.getOfferById(id)
            );

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================
    // ADD OFFER
    // =========================

    @PostMapping
    public ResponseEntity<?> addOffer(
            @RequestBody Offer offer
    ) {

        try {

            Offer savedOffer =
                    offerService.addOffer(offer);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedOffer);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());
        }
    }

    // =========================
    // UPDATE OFFER
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOffer(
            @PathVariable Long id,
            @RequestBody Offer offer
    ) {

        try {

            return ResponseEntity.ok(
                    offerService.updateOffer(
                            id,
                            offer
                    )
            );

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================
    // ACTIVATE
    // =========================

    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateOffer(
            @PathVariable Long id
    ) {

        try {

            return ResponseEntity.ok(
                    offerService.activateOffer(id)
            );

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================
    // DEACTIVATE
    // =========================

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateOffer(
            @PathVariable Long id
    ) {

        try {

            return ResponseEntity.ok(
                    offerService.deactivateOffer(id)
            );

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================
    // DELETE
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(
            @PathVariable Long id
    ) {

        try {

            offerService.deleteOffer(id);

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