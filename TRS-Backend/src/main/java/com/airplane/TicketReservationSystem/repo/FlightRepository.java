package com.airplane.TicketReservationSystem.repo;

import com.airplane.TicketReservationSystem.entity.FlightDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<FlightDetails, Long> {
}
