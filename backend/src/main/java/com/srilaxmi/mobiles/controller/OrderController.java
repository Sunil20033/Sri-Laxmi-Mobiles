package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.Order;
import com.srilaxmi.mobiles.service.OrderService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;


    public OrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }


    // =========================
    // CREATE ORDER
    // =========================

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order
    ) {

        Order savedOrder =
                orderService.createOrder(order);


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedOrder);
    }


    // =========================
    // GET ALL ORDERS
    // =========================

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }


    // =========================
    // GET ORDER BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long id
    ) {

        try {

            return ResponseEntity.ok(
                    orderService.getOrderById(id)
            );

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
    // =========================
// GET ORDERS BY CUSTOMER
// =========================

@GetMapping("/customer/{customerId}")
public ResponseEntity<List<Order>> getCustomerOrders(
        @PathVariable Long customerId
) {

    return ResponseEntity.ok(
            orderService.getOrdersByCustomerId(
                    customerId
            )
    );
}


// =========================
// GET CUSTOMER ORDER BY ID
// =========================

@GetMapping(
        "/customer/{customerId}/{orderId}"
)
public ResponseEntity<Order> getCustomerOrderById(
        @PathVariable Long customerId,
        @PathVariable Long orderId
) {

    try {

        return ResponseEntity.ok(
                orderService.getOrderByIdForCustomer(
                        orderId,
                        customerId
                )
        );

    } catch (RuntimeException exception) {

        return ResponseEntity
                .notFound()
                .build();
    }
}
    // =========================
// UPDATE ORDER STATUS
// =========================

@PutMapping("/{id}/status")
public ResponseEntity<Order> updateOrderStatus(
        @PathVariable Long id,
        @RequestBody Map<String, String> request
) {

    try {

        String status =
                request.get("status");


        if (status == null ||
                status.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }


        Order updatedOrder =
                orderService.updateOrderStatus(
                        id,
                        status
                );


        return ResponseEntity.ok(
                updatedOrder
        );

    } catch (IllegalArgumentException exception) {

        return ResponseEntity
                .badRequest()
                .build();

    } catch (RuntimeException exception) {

        return ResponseEntity
                .notFound()
                .build();
    }
}
}