package com.airplane.TicketReservationSystem.controller;

import com.airplane.TicketReservationSystem.entity.Customer;
import com.airplane.TicketReservationSystem.repo.ReservationRepository;
import com.airplane.TicketReservationSystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class AdminDashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/count")
    public Map<String, Integer> getDailyReservationAndPaymentCount(@RequestParam String date){
        return dashboardService.getDailyReservationAndPaymentCount(date);
    }

}
