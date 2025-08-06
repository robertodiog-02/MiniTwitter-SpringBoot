package com.example.dioguardiproject.controller;

import com.example.dioguardiproject.entity.UserDTO;
import com.example.dioguardiproject.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/home")
    public String HomePage(Authentication authentication, Model model){
        UserDTO loggedUser = userService.getLoggedUser(authentication.getName());
        model.addAttribute("loggedUser", loggedUser);
        return "homepage";
    }

}
