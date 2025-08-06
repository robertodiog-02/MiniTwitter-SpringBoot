package com.example.dioguardiproject.repository;

import com.example.dioguardiproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByNumero(String numero);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> getUserByUsername(String username);

}
