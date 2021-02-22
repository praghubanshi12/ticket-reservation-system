package com.airplane.TicketReservationSystem.service;

import com.airplane.TicketReservationSystem.entity.Payment;
import com.airplane.TicketReservationSystem.repo.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public ResponseEntity<Object> save(Payment payment){
        try {
            payment.setPaid(true);
            payment.setCreatedDate(new Date());
            paymentRepository.save(payment);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

}
