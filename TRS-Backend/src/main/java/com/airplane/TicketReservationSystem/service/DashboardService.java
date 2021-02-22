package com.airplane.TicketReservationSystem.service;

import com.airplane.TicketReservationSystem.repo.PaymentRepository;
import com.airplane.TicketReservationSystem.repo.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public Map<String, Integer> getDailyReservationAndPaymentCount(String date){
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date startDate = cal.getTime();

        cal.set(Calendar.HOUR_OF_DAY, 24);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 0);
        Date endDate = cal.getTime();
        int reservationCount = reservationRepository.countByCreatedDateBetween(startDate, endDate);
        int paymentCount = paymentRepository.countByCreatedDateBetween(startDate, endDate);
        Map<String, Integer> result = new HashMap<>();
        result.put("reservationCount", reservationCount);
        result.put("paymentCount", paymentCount);
        return result;
    }
}
