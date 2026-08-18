package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Offer;
import com.srilaxmi.mobiles.repository.OfferRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    // =========================
    // GET ALL OFFERS
    // =========================

    public List<Offer> getAllOffers() {

        return offerRepository
                .findByOrderByIdDesc();
    }

    // =========================
    // GET OFFER BY ID
    // =========================

    public Offer getOfferById(Long id) {

        return offerRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Offer not found with id: " + id
                        )
                );
    }

    // =========================
    // GET CURRENT ACTIVE OFFER
    // =========================

    public Offer getCurrentOffer() {

        LocalDateTime now =
                LocalDateTime.now();

        List<Offer> offers =
                offerRepository
                        .findByActiveTrueAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                now,
                                now
                        );

        if (offers.isEmpty()) {
            return null;
        }

        return offers.get(0);
    }

    // =========================
    // ADD OFFER
    // =========================

    public Offer addOffer(Offer offer) {

        validateOffer(offer);

        /*
         * If this offer is active,
         * deactivate all existing offers.
         */
        if (Boolean.TRUE.equals(
                offer.getActive()
        )) {

            deactivateAllOffers();
        }

        return offerRepository.save(offer);
    }

    // =========================
    // UPDATE OFFER
    // =========================

    public Offer updateOffer(
            Long id,
            Offer updatedOffer
    ) {

        validateOffer(updatedOffer);

        Offer existingOffer =
                offerRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Offer not found with id: " + id
                                )
                        );

        if (Boolean.TRUE.equals(
                updatedOffer.getActive()
        )) {

            deactivateAllOffers();
        }

        existingOffer.setTitle(
                updatedOffer.getTitle().trim()
        );

        existingOffer.setBadge(
                cleanText(updatedOffer.getBadge())
        );

        existingOffer.setFreeText(
                cleanText(updatedOffer.getFreeText())
        );

        existingOffer.setMainVisualText(
        cleanText(updatedOffer.getMainVisualText())
        );

        existingOffer.setMainVisualIcon(
                cleanText(updatedOffer.getMainVisualIcon())
        );

        existingOffer.setMainVisualImage(
                cleanText(updatedOffer.getMainVisualImage())
        );

        existingOffer.setStartDate(
                updatedOffer.getStartDate()
        );

        existingOffer.setEndDate(
                updatedOffer.getEndDate()
        );

        existingOffer.setFreeItem1Name(
                cleanText(
                        updatedOffer.getFreeItem1Name()
                )
        );

        existingOffer.setFreeItem1Image(
                cleanText(
                        updatedOffer.getFreeItem1Image()
                )
        );

        existingOffer.setFreeItem1Text(
                cleanText(
                        updatedOffer.getFreeItem1Text()
                )
        );

        existingOffer.setFreeItem2Name(
                cleanText(
                        updatedOffer.getFreeItem2Name()
                )
        );

        existingOffer.setFreeItem2Image(
                cleanText(
                        updatedOffer.getFreeItem2Image()
                )
        );

        existingOffer.setFreeItem2Text(
                cleanText(
                        updatedOffer.getFreeItem2Text()
                )
        );
        existingOffer.setFreeItem3Name(
        cleanText(
                updatedOffer.getFreeItem3Name()
        )
        );

        existingOffer.setFreeItem3Image(
                cleanText(
                        updatedOffer.getFreeItem3Image()
                )
        );

        existingOffer.setFreeItem3Text(
                cleanText(
                        updatedOffer.getFreeItem3Text()
                )
        );


        existingOffer.setFreeItem4Name(
                cleanText(
                        updatedOffer.getFreeItem4Name()
                )
        );

        existingOffer.setFreeItem4Image(
                cleanText(
                        updatedOffer.getFreeItem4Image()
                )
        );

        existingOffer.setFreeItem4Text(
                cleanText(
                        updatedOffer.getFreeItem4Text()
                )
        );


        existingOffer.setFreeItem5Name(
                cleanText(
                        updatedOffer.getFreeItem5Name()
                )
        );

        existingOffer.setFreeItem5Image(
                cleanText(
                        updatedOffer.getFreeItem5Image()
                )
        );

        existingOffer.setFreeItem5Text(
                cleanText(
                        updatedOffer.getFreeItem5Text()
                )
        );

        existingOffer.setNote(
                cleanText(updatedOffer.getNote())
        );

        existingOffer.setShopMessage(
                cleanText(
                        updatedOffer.getShopMessage()
                )
        );

        existingOffer.setActive(
                updatedOffer.getActive()
        );

        return offerRepository.save(
                existingOffer
        );
    }

    // =========================
    // ACTIVATE OFFER
    // =========================

    public Offer activateOffer(Long id) {

        Offer offer =
                offerRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Offer not found with id: " + id
                                )
                        );

        deactivateAllOffers();

        offer.setActive(true);

        return offerRepository.save(offer);
    }

    // =========================
    // DEACTIVATE OFFER
    // =========================

    public Offer deactivateOffer(Long id) {

        Offer offer =
                offerRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Offer not found with id: " + id
                                )
                        );

        offer.setActive(false);

        return offerRepository.save(offer);
    }

    // =========================
    // DELETE OFFER
    // =========================

    public void deleteOffer(Long id) {

        if (!offerRepository.existsById(id)) {

            throw new RuntimeException(
                    "Offer not found with id: " + id
            );
        }

        offerRepository.deleteById(id);
    }

    // =========================
    // DEACTIVATE ALL
    // =========================

    private void deactivateAllOffers() {

        List<Offer> offers =
                offerRepository.findAll();

        for (Offer offer : offers) {

            offer.setActive(false);
        }

        offerRepository.saveAll(offers);
    }

    // =========================
    // VALIDATION
    // =========================

    private void validateOffer(
            Offer offer
    ) {

        if (offer == null) {

            throw new IllegalArgumentException(
                    "Offer data is required."
            );
        }

        if (
                offer.getTitle() == null ||
                offer.getTitle().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Offer title is required."
            );
        }

        if (offer.getStartDate() == null) {

            throw new IllegalArgumentException(
                    "Offer start date is required."
            );
        }

        if (offer.getEndDate() == null) {

            throw new IllegalArgumentException(
                    "Offer end date is required."
            );
        }

        if (
                !offer.getEndDate()
                        .isAfter(
                                offer.getStartDate()
                        )
        ) {

            throw new IllegalArgumentException(
                    "Offer end date must be after start date."
            );
        }

        if (offer.getActive() == null) {

            offer.setActive(true);
        }

        offer.setTitle(
                offer.getTitle().trim()
        );
    }

    // =========================
    // CLEAN TEXT
    // =========================

    private String cleanText(
            String value
    ) {

        if (value == null) {
            return null;
        }

        String cleaned =
                value.trim();

        return cleaned.isEmpty()
                ? null
                : cleaned;
    }
}