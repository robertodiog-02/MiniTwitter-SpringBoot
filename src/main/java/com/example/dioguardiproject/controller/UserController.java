package com.example.dioguardiproject.controller;

import com.example.dioguardiproject.entity.User;
import com.example.dioguardiproject.entity.UserDTO;
import com.example.dioguardiproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        try {
            userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("Registrazione avvenuta con successo! Verrai reindirizzato alla pagina di login entro 5 secondi");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());//codice 400
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getLoggedUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utente non autenticato");//codice 401
        }
        UserDTO loggedUser = userService.getLoggedUser(authentication.getName());
        return ResponseEntity.ok(loggedUser);  // Restituisce il DTO
    }
}
