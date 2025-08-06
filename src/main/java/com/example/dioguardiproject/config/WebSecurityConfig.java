package com.example.dioguardiproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/users/create" , "/login**", "/register","/css/**", "/js/**", "/images/**").permitAll() // Permetti accesso pubblico
                        .anyRequest().authenticated() // Tutte le altre richieste richiedono autenticazione
                )//loginProcessingUrl di default è /login ma la richiesta è POST
                .formLogin(form -> form
                        .loginPage("/login") // Pagina di login personalizzata
                        .defaultSuccessUrl("/home",true) // Reindirizza alla pagina principale dopo il login
                        .failureUrl("/login?error=true") // Pagina di errore in caso di login fallito
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Endpoint per il logout
                        .logoutSuccessUrl("/login?logout=true") // Reindirizza alla pagina di login (template Thymeleaf)
                        .invalidateHttpSession(true) // Invalida la sessione
                        .deleteCookies("JSESSIONID") // Elimina il cookie di sessione
                        .permitAll()
                )
                .csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}