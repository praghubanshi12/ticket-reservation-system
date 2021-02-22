package com.airplane.TicketReservationSystem.repo;

import com.airplane.TicketReservationSystem.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    int countByCreatedDateBetween(Date date1, Date date2);
}
