package com.airplane.TicketReservationSystem.service;

import com.airplane.TicketReservationSystem.entity.Customer;
import com.airplane.TicketReservationSystem.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer findByUserId(Long userId){
        return customerRepository.findByUserId(userId);
    }
}
