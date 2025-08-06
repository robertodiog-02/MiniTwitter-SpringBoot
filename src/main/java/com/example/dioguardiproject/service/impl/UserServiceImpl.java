package com.example.dioguardiproject.service.impl;

import com.example.dioguardiproject.entity.User;
import com.example.dioguardiproject.entity.UserDTO;
import com.example.dioguardiproject.repository.UserRepository;
import com.example.dioguardiproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void validateUserUniqueness(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username inserito è già in uso.");
        }
        if (userRepository.existsByNumero(user.getNumero())) {
            throw new IllegalArgumentException("Il numero di cellulare inserito è già in uso.");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("L'email inserita è già in uso.");
        }
    }

    @Override
    public void createUser(User user) {
        validateUserUniqueness(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    // Metodo per ottenere il DTO dell'utente loggato
    @Override
    public UserDTO getLoggedUser(String username) {
        User user = userRepository.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);  // Restituisci il DTO direttamente
    }

}
