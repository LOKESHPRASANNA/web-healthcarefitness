package com.gym.backend.controller;

import com.gym.backend.entity.User;
import com.gym.backend.service.UserService;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Optional health check
    @GetMapping("/hello")
    public String checkHealth() {
        return "Backend is running!";
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.signup(
                payload.get("fullName"),
                payload.get("email"),
                payload.get("username"),
                payload.get("password"),
                payload.get("role")
            );
            response.put("success", true);
            response.put("message", "User registered successfully");
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(409).body(response); // Mimic Express 409
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {
        String usernameOrEmail = payload.get("usernameOrEmail") != null ? payload.get("usernameOrEmail") : payload.get("username"); 
        // fallback to username if frontend uses it
        String password = payload.get("password");
        String role = payload.get("role") != null ? payload.get("role") : "user";
        
        Optional<User> userOptional = userService.login(usernameOrEmail, password, role);
        Map<String, Object> response = new HashMap<>();
        
        if (userOptional.isPresent()) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", userOptional.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("users", userService.getAllUsers());
        return ResponseEntity.ok(response);
    }
}
