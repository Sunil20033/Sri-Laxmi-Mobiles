package com.srilaxmi.mobiles.repository;

import com.srilaxmi.mobiles.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {
}