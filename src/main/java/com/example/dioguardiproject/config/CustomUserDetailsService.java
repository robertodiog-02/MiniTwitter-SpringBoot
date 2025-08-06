package com.example.dioguardiproject.config;

import com.example.dioguardiproject.entity.User;
import com.example.dioguardiproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Cerco l'utente con username: " + username);
        User user = userRepository.getUserByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("Utente non trovato con username: " + username);
                    return new UsernameNotFoundException("Utente non trovato con username: " + username);
                });
        System.out.println("Utente trovato: " + user.getUsername());
         return new MyUserDetails(user);
         //restituisce l'oggetto MyuserDetails come principal dell'autenticazione
    }
}
