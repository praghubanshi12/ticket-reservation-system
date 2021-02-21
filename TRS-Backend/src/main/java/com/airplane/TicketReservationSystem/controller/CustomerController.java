package com.airplane.TicketReservationSystem.controller;

import com.airplane.TicketReservationSystem.auth.service.UserService;
import com.airplane.TicketReservationSystem.entity.Customer;
import com.airplane.TicketReservationSystem.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @GetMapping("/loggedIn")
    public Customer getLoggedInCustomer(final Principal principal){
        Long loggedInUserId = userService.getLoggedInUserIdByUserName(principal.getName());
        return customerService.findByUserId(loggedInUserId);
    }

}
