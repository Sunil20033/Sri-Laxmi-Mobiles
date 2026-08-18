package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Order;
import com.srilaxmi.mobiles.entity.OrderItem;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import java.time.Duration;

@Service
public class WhatsAppService {

    @Value("${WHATSAPP_PHONE_NUMBER_ID:}")
    private String phoneNumberId;

    @Value("${WHATSAPP_ACCESS_TOKEN:}")
    private String accessToken;

    @Value("${WHATSAPP_OWNER_NUMBER:}")
    private String ownerNumber;

    @Value("${WHATSAPP_API_VERSION:v21.0}")
    private String apiVersion;


    private final HttpClient httpClient =
            HttpClient.newBuilder()
                    .connectTimeout(
                            Duration.ofSeconds(10)
                    )
                    .build();


    // =========================================================
    // SEND ORDER NOTIFICATION
    // =========================================================

    public void sendOrderNotification(Order order) {

        if (!isConfigured()) {

            System.out.println(
                    "WhatsApp notification skipped: " +
                    "WhatsApp API is not configured."
            );

            return;
        }


        try {

            String message =
                    buildOrderMessage(order);


            String url =
                    "https://graph.facebook.com/"
                            + apiVersion
                            + "/"
                            + phoneNumberId
                            + "/messages";


            String json =
                    "{"
                    + "\"messaging_product\":\"whatsapp\","
                    + "\"recipient_type\":\"individual\","
                    + "\"to\":\""
                    + escapeJson(ownerNumber)
                    + "\","
                    + "\"type\":\"text\","
                    + "\"text\":{"
                    + "\"preview_url\":false,"
                    + "\"body\":\""
                    + escapeJson(message)
                    + "\""
                    + "}"
                    + "}";


            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(
                                    URI.create(url)
                            )
                            .timeout(
                                    Duration.ofSeconds(20)
                            )
                            .header(
                                    "Authorization",
                                    "Bearer "
                                            + accessToken
                            )
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofString(json)
                            )
                            .build();


            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString()
                    );


            if (
                    response.statusCode() >= 200 &&
                    response.statusCode() < 300
            ) {

                System.out.println(
                        "WhatsApp order notification sent successfully."
                );

            } else {

                System.err.println(
                        "WhatsApp notification failed. " +
                        "HTTP "
                        + response.statusCode()
                        + ": "
                        + response.body()
                );

            }


        } catch (Exception exception) {

            /*
             * IMPORTANT:
             *
             * WhatsApp notification must NEVER
             * make a successfully created order fail.
             */

            System.err.println(
                    "WhatsApp notification error: "
                            + exception.getMessage()
            );

        }

    }


    // =========================================================
    // BUILD ORDER MESSAGE
    // =========================================================

    private String buildOrderMessage(
            Order order
    ) {

        StringBuilder message =
                new StringBuilder();


        message.append(
                "🔔 NEW ORDER - SRI LAXMI MOBILES\n\n"
        );


        message.append(
                "Order: #"
        );

        message.append(
                order.getId()
        );

        message.append("\n\n");


        message.append(
                "Customer: "
        );

        message.append(
                safe(order.getCustomerName())
        );

        message.append("\n");


        message.append(
                "Mobile: "
        );

        message.append(
                safe(order.getMobile())
        );

        message.append("\n\n");


        message.append(
                "Address:\n"
        );

        message.append(
                safe(order.getAddress())
        );

        message.append("\n");


        if (
                order.getNotes() != null &&
                !order.getNotes()
                        .trim()
                        .isEmpty()
        ) {

            message.append("\n");

            message.append(
                    "Notes: "
            );

            message.append(
                    order.getNotes()
            );

            message.append("\n");

        }


        message.append("\n");

        message.append(
                "PRODUCTS\n"
        );


        if (
                order.getItems() != null &&
                !order.getItems().isEmpty()
        ) {

            for (
                    OrderItem item :
                    order.getItems()
            ) {

                message.append("• ");

                message.append(
                        safe(
                                item.getProductName()
                        )
                );

                message.append(" × ");

                message.append(
                        item.getQuantity()
                );

                message.append(" - ₹");

                message.append(
                        money(
                                item.getTotal()
                        )
                );

                message.append("\n");

            }

        } else {

            message.append(
                    "No product details available.\n"
            );

        }


        message.append("\n");

        message.append(
                "Subtotal: ₹"
        );

        message.append(
                money(
                        order.getSubtotal()
                )
        );

        message.append("\n");


        message.append(
                "Delivery: ₹"
        );

        message.append(
                money(
                        order.getDeliveryCharge()
                )
        );

        message.append("\n");


        message.append(
                "TOTAL: ₹"
        );

        message.append(
                money(
                        order.getTotal()
                )
        );

        message.append("\n\n");


        /*
         * Orders in your new checkout flow are
         * intended to be online-payment orders.
         *
         * We deliberately don't claim "PAID"
         * here unless your payment-confirmation
         * field is explicitly available.
         */

        message.append(
                "Payment: ONLINE\n"
        );


        message.append(
                "Status: "
        );

        message.append(
                safe(order.getStatus())
        );

        message.append("\n");


        return message.toString();

    }


    // =========================================================
    // CONFIGURATION CHECK
    // =========================================================

    private boolean isConfigured() {

        return
                phoneNumberId != null &&
                !phoneNumberId.trim().isEmpty() &&

                accessToken != null &&
                !accessToken.trim().isEmpty() &&

                ownerNumber != null &&
                !ownerNumber.trim().isEmpty();

    }


    // =========================================================
    // SAFE TEXT
    // =========================================================

    private String safe(
            String value
    ) {

        if (
                value == null ||
                value.trim().isEmpty()
        ) {

            return "-";

        }

        return value.trim();

    }


    // =========================================================
    // MONEY
    // =========================================================

    private String money(
            Double value
    ) {

        if (value == null) {

            return "0.00";

        }

        return String.format(
                "%.2f",
                value
        );

    }


    // =========================================================
    // JSON ESCAPE
    // =========================================================

    private String escapeJson(
            String value
    ) {

        if (value == null) {

            return "";

        }

        return value
                .replace(
                        "\\",
                        "\\\\"
                )
                .replace(
                        "\"",
                        "\\\""
                )
                .replace(
                        "\r",
                        "\\r"
                )
                .replace(
                        "\n",
                        "\\n"
                );

    }

}