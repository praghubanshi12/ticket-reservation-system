package com.airplane.TicketReservationSystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

@Configuration
@Order
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
   @Override
    public void configure(ResourceServerSecurityConfigurer resources){
        resources.resourceId(AuthorizationServerConfig.RESOURCE_ID);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .requestMatchers().antMatchers("/trs", "/trs/**")
                .and()
                .requestMatchers().antMatchers("/admin", "/admin/**")
                .and()
                .authorizeRequests().anyRequest().access("#oauth2.hasScope('write')")
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }
}
