package com.airplane.TicketReservationSystem.config;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class CustomJwtAccessTokenConverter extends JwtAccessTokenConverter {
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        authentication.getUserAuthentication().getAuthorities().forEach(authority -> {
            ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(new HashMap<String, Object>(){
                { put("role", authority.getAuthority()); }
            });
        });
        return super.enhance(accessToken, authentication);
    }
}
