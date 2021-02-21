package com.airplane.TicketReservationSystem.service;

import com.airplane.TicketReservationSystem.entity.FlightDetails;
import com.airplane.TicketReservationSystem.repo.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<FlightDetails> findAll(){
        return flightRepository.findAll();
    }
}
