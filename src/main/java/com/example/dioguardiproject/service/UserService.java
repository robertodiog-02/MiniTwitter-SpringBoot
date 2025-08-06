package com.example.dioguardiproject.service;

import com.example.dioguardiproject.entity.User;
import com.example.dioguardiproject.entity.UserDTO;

public interface UserService {

    UserDTO getLoggedUser(String username);
    void createUser(User user);
}
