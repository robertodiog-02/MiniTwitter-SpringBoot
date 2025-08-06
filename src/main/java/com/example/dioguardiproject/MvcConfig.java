package com.example.dioguardiproject;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        // Reindirizza la root "/" a "/login"
        registry.addViewController("/").setViewName("redirect:/login");
        registry.addViewController("/register").setViewName("registerpage");
        registry.addViewController("/login").setViewName("loginpage");
    }

}

