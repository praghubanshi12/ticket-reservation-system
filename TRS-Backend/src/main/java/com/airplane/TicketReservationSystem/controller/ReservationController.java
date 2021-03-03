package com.airplane.TicketReservationSystem.controller;

import com.airplane.TicketReservationSystem.entity.Reservation;
import com.airplane.TicketReservationSystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trs/reservations")
@PreAuthorize("hasRole('CUSTOMER')")

public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> save(@RequestBody Reservation reservation) {
        return reservationService.save(reservation);
    }

    @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Reservation getReservationById(@PathVariable("id") Long id) {
        return reservationService.findById(id);
    }

    @GetMapping(value="/customer/{customerid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Reservation> getReservationByCustomerId(@PathVariable("customerid") Long customerid) {
        return reservationService.findByCustomerId(customerid);
    }

}
