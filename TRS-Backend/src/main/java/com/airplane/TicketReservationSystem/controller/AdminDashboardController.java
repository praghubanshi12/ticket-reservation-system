package com.airplane.TicketReservationSystem.controller;

import com.airplane.TicketReservationSystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")

public class AdminDashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/count")
    public Map<String, Integer> getDailyReservationAndPaymentCount(@RequestParam String date){
        return dashboardService.getDailyReservationAndPaymentCount(date);
    }

}
