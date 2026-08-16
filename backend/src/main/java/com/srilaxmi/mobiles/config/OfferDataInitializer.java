package com.srilaxmi.mobiles.config;

import com.srilaxmi.mobiles.entity.Offer;
import com.srilaxmi.mobiles.repository.OfferRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class OfferDataInitializer {

    @Bean
    CommandLineRunner initializeOffers(
            OfferRepository offerRepository
    ) {

        return args -> {

            if (offerRepository.count() > 0) {
                return;
            }

            Offer offer = new Offer();

            offer.setTitle(
                    "PUT A SCREEN PROTECTOR ON YOUR PHONE & GET"
            );

            offer.setBadge(
                    "SPECIAL OFFER"
            );

            offer.setFreeText(
                    "FREE"
            );

            offer.setStartDate(
                    LocalDateTime.of(
                            2026,
                            8,
                            15,
                            0,
                            0
                    )
            );

            offer.setEndDate(
                    LocalDateTime.of(
                            2026,
                            9,
                            1,
                            23,
                            59,
                            59
                    )
            );

            offer.setFreeItem1Name(
                    "OnePlus Wired Earphone"
            );

            offer.setFreeItem1Text(
                    "FREE"
            );

            offer.setFreeItem1Image(
                    ""
            );

            offer.setFreeItem2Name(
                    "Gaming Finger Gloves"
            );

            offer.setFreeItem2Text(
                    "One Pair FREE"
            );

            offer.setFreeItem2Image(
                    ""
            );

            offer.setNote(
                    "Offer available for a limited time only."
            );

            offer.setShopMessage(
                    "Visit Sri Laxmi Mobiles in Chincholli to avail this offer."
            );

            offer.setActive(true);

            offerRepository.save(offer);
        };
    }
}