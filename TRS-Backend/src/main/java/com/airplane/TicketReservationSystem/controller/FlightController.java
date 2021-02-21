package com.airplane.TicketReservationSystem.controller;

import com.airplane.TicketReservationSystem.entity.FlightDetails;
import com.airplane.TicketReservationSystem.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping
    public List<FlightDetails> listUser() {
        return flightService.findAll();
    }
}
