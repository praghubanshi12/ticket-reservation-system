package com.airplane.TicketReservationSystem.repo;

import com.airplane.TicketReservationSystem.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCustomerId(Long customerId);
    int countByCreatedDateBetween(Date date1, Date date2);
}
