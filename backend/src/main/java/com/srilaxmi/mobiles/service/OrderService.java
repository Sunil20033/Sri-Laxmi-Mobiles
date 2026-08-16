package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.Order;
import com.srilaxmi.mobiles.entity.OrderItem;
import com.srilaxmi.mobiles.repository.CustomerRepository;
import com.srilaxmi.mobiles.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final CustomerRepository customerRepository;


    // =========================
    // CONSTRUCTOR
    // =========================

    public OrderService(
            OrderRepository orderRepository,
            CustomerRepository customerRepository
    ) {

        this.orderRepository =
                orderRepository;

        this.customerRepository =
                customerRepository;
    }


    // =========================
    // CREATE ORDER
    // =========================

    public Order createOrder(Order order) {

        // Customer ID is required
        if (order.getCustomerId() == null) {

            throw new IllegalArgumentException(
                    "Customer is required to create an order."
            );
        }


        Long customerId =
                order.getCustomerId();


        // Verify customer exists
        if (!customerRepository.existsById(customerId)) {

        throw new IllegalArgumentException(
                "Customer not found with id: "
                        + customerId
        );
        }

        // Set order date
        order.setOrderDate(
                LocalDateTime.now()
        );


        // Set initial status
        order.setStatus("PENDING");


        // Default delivery charge
        if (order.getDeliveryCharge() == null) {

            order.setDeliveryCharge(0.0);
        }


        // =========================
        // CALCULATE SUBTOTAL
        // =========================

        double subtotal = 0.0;


        if (order.getItems() != null) {

            for (OrderItem item : order.getItems()) {

                // Connect item to order
                item.setOrder(order);


                double itemTotal =
                        item.getPrice()
                                * item.getQuantity();


                item.setTotal(itemTotal);


                subtotal += itemTotal;
            }
        }


        // =========================
        // SET TOTALS
        // =========================

        order.setSubtotal(subtotal);


        order.setTotal(
                subtotal
                        + order.getDeliveryCharge()
        );


        // Save order
        return orderRepository.save(order);
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

    public Order getOrderById(Long id) {

        return orderRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
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
                        () -> new RuntimeException(
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
                                () -> new RuntimeException(
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


        return orderRepository.save(order);
    }
}