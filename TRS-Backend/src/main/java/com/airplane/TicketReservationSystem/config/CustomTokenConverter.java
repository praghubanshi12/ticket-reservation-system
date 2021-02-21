package com.airplane.TicketReservationSystem.config;

import com.airplane.TicketReservationSystem.auth.entity.User;
import com.airplane.TicketReservationSystem.auth.repository.UserRepository;
import com.airplane.TicketReservationSystem.entity.Customer;
import com.airplane.TicketReservationSystem.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class CustomTokenConverter extends JwtAccessTokenConverter {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        final Map<String, Object> userInfo = new HashMap<>();
        User user = userRepository.findByUsername(authentication.getName());
        Long userId = user.getId();
        String role = user.getRole().getName();
        userInfo.put("trs_user_role", role);
        userInfo.put("trs_user_id", userId);
        if(role.equalsIgnoreCase("customer")){
            Customer loggedInCustomer = customerRepository.findByUserId(userId);
            System.out.println(loggedInCustomer.getId());
            userInfo.put("trs_customer_id", loggedInCustomer.getId());
            userInfo.put("trs_customer_name", loggedInCustomer.getName());
        }
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(userInfo);
        return super.enhance(accessToken, authentication);
    }
}
