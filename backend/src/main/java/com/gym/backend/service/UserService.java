package com.gym.backend.service;

import com.gym.backend.entity.User;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public User signup(String fullName, String email, String username, String password, String role) throws Exception {
        if (!userRepository.findByUsername(username).isEmpty()) {
            throw new Exception("Username already exists");
        }
        if (!userRepository.findByEmail(email.toLowerCase()).isEmpty()) {
            throw new Exception("Email already registered");
        }

        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email.toLowerCase());
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role != null ? role : "user");

        User savedUser = userRepository.save(user);
        
        // Email is non-blocking in Express. In Java, it can be handled with @Async, 
        // but for now, we'll call it directly.
        emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getFullName());
        
        return savedUser;
    }

    public Optional<User> login(String usernameOrEmail, String password, String role) {
        // Simple search following server.js logic
        return userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail.toLowerCase())
                .stream()
                .filter(user -> user.getPassword().equals(password) && user.getRole().equalsIgnoreCase(role))
                .findFirst();
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
