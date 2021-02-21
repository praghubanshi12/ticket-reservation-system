package com.airplane.TicketReservationSystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "flight_id", referencedColumnName = "id")
    private FlightDetails flightDetails;

    @ManyToOne
    @JoinColumn(name="departure_time_id", referencedColumnName = "id")
    private FlightDepartureTime flightDepartureTime;

    private Date reservationDate;

    private boolean isPaid;

    @OneToOne(mappedBy = "reservation")
    @JsonIgnore
    private Payment payment;
}

