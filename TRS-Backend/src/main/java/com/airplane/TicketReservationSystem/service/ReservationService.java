package com.airplane.TicketReservationSystem.service;

import com.airplane.TicketReservationSystem.entity.Reservation;
import com.airplane.TicketReservationSystem.repo.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public ResponseEntity<Object> save(Reservation reservation){
        try {
            reservationRepository.save(reservation);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    public Reservation findById(Long id) {
        return reservationRepository.findById(id).get();
    }

    public List<Reservation> findByCustomerId(Long customerId){
        return reservationRepository.findByCustomerId(customerId);
    }
}
