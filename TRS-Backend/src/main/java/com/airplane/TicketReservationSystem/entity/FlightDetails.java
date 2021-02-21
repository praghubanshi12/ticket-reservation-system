package com.airplane.TicketReservationSystem.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class FlightDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromAirport;

    private String toAirport;

    private int totalSeats;

    private double price;

    @OneToMany(mappedBy = "flightDetails")
    private List<FlightDepartureTime> flightDepartureTimes;
}
