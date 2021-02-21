package com.airplane.TicketReservationSystem.repo;

import com.airplane.TicketReservationSystem.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByUserId(Long userId);
}
