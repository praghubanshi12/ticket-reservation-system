package com.airplane.TicketReservationSystem.controller;

import com.airplane.TicketReservationSystem.entity.Payment;
import com.airplane.TicketReservationSystem.entity.Reservation;
import com.airplane.TicketReservationSystem.service.PaymentService;
import com.airplane.TicketReservationSystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trs/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ReservationService reservationService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Object> save(@RequestBody Payment payment) {
        ResponseEntity<Object> response = paymentService.save(payment);
        Reservation reservation = reservationService.findById(payment.getReservation().getId());
        reservation.setPaid(true);
        reservationService.save(reservation);
        return response;
    }
}
