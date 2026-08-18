package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Order;
import com.srilaxmi.mobiles.entity.OrderItem;
import com.srilaxmi.mobiles.repository.CustomerRepository;
import com.srilaxmi.mobiles.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final CustomerRepository customerRepository;

    private final WhatsAppService whatsAppService;


    // =========================
    // SRI LAXMI MOBILES LOCATION
    // =========================

    private static final double SHOP_LATITUDE =
            17.458870499033107;

    private static final double SHOP_LONGITUDE =
            77.4200179686237;


    // =========================
    // DELIVERY LIMIT
    // =========================

    private static final double MAX_DELIVERY_DISTANCE_KM =
            10.0;


    // =========================
    // CONSTRUCTOR
    // =========================

        public OrderService(
                OrderRepository orderRepository,
                CustomerRepository customerRepository,
                WhatsAppService whatsAppService
        ) {
        this.orderRepository =
                orderRepository;

        this.customerRepository =
                customerRepository;

        this.whatsAppService =
                whatsAppService;
        }


    // =========================
    // CREATE ORDER
    // =========================

    public Order createOrder(Order order) {


        // =========================
        // CUSTOMER VALIDATION
        // =========================

        if (order.getCustomerId() == null) {

            throw new IllegalArgumentException(
                    "Customer is required to create an order."
            );
        }


        Long customerId =
                order.getCustomerId();


        if (!customerRepository.existsById(customerId)) {

            throw new IllegalArgumentException(
                    "Customer not found with id: "
                            + customerId
            );
        }


        // =========================
        // RETURN POLICY
        // =========================

        if (
                order.getReturnPolicyAccepted() == null
                        ||
                !order.getReturnPolicyAccepted()
        ) {

            throw new IllegalArgumentException(
                    "Return policy must be accepted before placing the order."
            );
        }


        // =========================
        // PAYMENT VALIDATION
        // =========================

        if (
                order.getPaymentMethod() == null
                        ||
                !"ONLINE".equalsIgnoreCase(
                        order.getPaymentMethod().trim()
                )
        ) {

            throw new IllegalArgumentException(
                    "Only online payment is allowed."
            );
        }


        if (
                order.getPaymentStatus() == null
                        ||
                !"PAID_CONFIRMED".equalsIgnoreCase(
                        order.getPaymentStatus().trim()
                )
        ) {

            throw new IllegalArgumentException(
                    "Online payment must be confirmed before placing the order."
            );
        }


        // =========================
        // GPS VALIDATION
        // =========================

        if (
                order.getCustomerLatitude() == null
                        ||
                order.getCustomerLongitude() == null
        ) {

            throw new IllegalArgumentException(
                    "Customer GPS location is required."
            );
        }


        double customerLatitude =
                order.getCustomerLatitude();

        double customerLongitude =
                order.getCustomerLongitude();


        if (
                customerLatitude < -90
                        ||
                customerLatitude > 90
        ) {

            throw new IllegalArgumentException(
                    "Invalid customer latitude."
            );
        }


        if (
                customerLongitude < -180
                        ||
                customerLongitude > 180
        ) {

            throw new IllegalArgumentException(
                    "Invalid customer longitude."
            );
        }


        // =========================
        // CALCULATE REAL DISTANCE
        // =========================

        double calculatedDistance =
                calculateDistanceKm(
                        SHOP_LATITUDE,
                        SHOP_LONGITUDE,
                        customerLatitude,
                        customerLongitude
                );


        // Round to 2 decimal places

        calculatedDistance =
                Math.round(
                        calculatedDistance * 100.0
                ) / 100.0;


        // =========================
        // DELIVERY LIMIT CHECK
        // =========================

        if (
                calculatedDistance
                        > MAX_DELIVERY_DISTANCE_KM
        ) {

            throw new IllegalArgumentException(
                    "Delivery is available only within 10 km from Sri Laxmi Mobiles. "
                            +
                            "Your location is approximately "
                            +
                            calculatedDistance
                            +
                            " km away."
            );
        }


        // =========================
        // STORE SERVER-CALCULATED DISTANCE
        // =========================

        order.setDeliveryDistanceKm(
                calculatedDistance
        );


        // =========================
        // SET ORDER DATE
        // =========================

        order.setOrderDate(
                LocalDateTime.now()
        );


        // =========================
        // SET INITIAL STATUS
        // =========================

        order.setStatus(
                "PENDING"
        );


        // =========================
        // DEFAULT DELIVERY CHARGE
        // =========================

        if (
                order.getDeliveryCharge() == null
        ) {

            order.setDeliveryCharge(
                    0.0
            );
        }


        // =========================
        // CALCULATE SUBTOTAL
        // =========================

        double subtotal = 0.0;


        if (
                order.getItems() != null
        ) {

            for (
                    OrderItem item :
                    order.getItems()
            ) {

                // Connect item to order

                item.setOrder(order);


                double itemTotal =
                        item.getPrice()
                                *
                        item.getQuantity();


                item.setTotal(
                        itemTotal
                );


                subtotal +=
                        itemTotal;
            }
        }


        // =========================
        // SET TOTALS
        // =========================

        order.setSubtotal(
                subtotal
        );


        order.setTotal(
                subtotal
                        +
                order.getDeliveryCharge()
        );


        // =========================
        // SAVE ORDER
        // =========================

        Order savedOrder =
        orderRepository.save(
                order
        );


        // =========================
        // WHATSAPP ORDER NOTIFICATION
        // =========================

        whatsAppService.sendOrderNotification(
                savedOrder
        );


        return savedOrder;
    }


    // =========================
    // DISTANCE CALCULATION
    // HAVERSINE FORMULA
    // =========================

    private double calculateDistanceKm(
            double latitude1,
            double longitude1,
            double latitude2,
            double longitude2
    ) {

        final double earthRadiusKm =
                6371.0;


        double latitudeDifference =
                Math.toRadians(
                        latitude2 - latitude1
                );


        double longitudeDifference =
                Math.toRadians(
                        longitude2 - longitude1
                );


        double a =
                Math.sin(
                        latitudeDifference / 2
                )
                        *
                Math.sin(
                        latitudeDifference / 2
                )
                        +
                Math.cos(
                        Math.toRadians(
                                latitude1
                        )
                )
                        *
                Math.cos(
                        Math.toRadians(
                                latitude2
                        )
                )
                        *
                Math.sin(
                        longitudeDifference / 2
                )
                        *
                Math.sin(
                        longitudeDifference / 2
                );


        double c =
                2 *
                Math.atan2(
                        Math.sqrt(a),
                        Math.sqrt(1 - a)
                );


        return earthRadiusKm * c;
    }


    // =========================
    // GET ALL ORDERS
    // =========================

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // =========================
    // GET ORDER BY ID
    // =========================

    public Order getOrderById(
            Long id
    ) {

        return orderRepository
                .findById(id)
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Order not found with id: "
                                                + id
                                )
                );
    }


    // =========================
    // GET CUSTOMER ORDERS
    // =========================

    public List<Order> getOrdersByCustomerId(
            Long customerId
    ) {

        return orderRepository
                .findByCustomerIdOrderByOrderDateDesc(
                        customerId
                );
    }


    // =========================
    // GET CUSTOMER ORDER BY ID
    // =========================

    public Order getOrderByIdForCustomer(
            Long orderId,
            Long customerId
    ) {

        return orderRepository
                .findByIdAndCustomerId(
                        orderId,
                        customerId
                )
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Order not found."
                                )
                );
    }


    // =========================
    // UPDATE ORDER STATUS
    // =========================

    public Order updateOrderStatus(
            Long id,
            String status
    ) {

        Order order =
                orderRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Order not found with id: "
                                                        + id
                                        )
                        );


        String updatedStatus =
                status == null
                        ? ""
                        : status
                                .trim()
                                .toUpperCase();


        switch (updatedStatus) {

            case "PENDING":

            case "CONFIRMED":

            case "PROCESSING":

            case "OUT_FOR_DELIVERY":

            case "DELIVERED":

            case "CANCELLED":

                break;


            default:

                throw new IllegalArgumentException(
                        "Invalid order status: "
                                + status
                );
        }


        order.setStatus(
                updatedStatus
        );


        return orderRepository.save(
                order
        );
    }
}