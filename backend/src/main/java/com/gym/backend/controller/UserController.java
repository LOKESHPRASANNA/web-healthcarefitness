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

    @Autowired
    private org.springframework.security.authentication.AuthenticationManager authenticationManager;

    @Autowired
    private com.gym.backend.security.JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {
        String usernameOrEmail = payload.get("usernameOrEmail") != null ? payload.get("usernameOrEmail") : payload.get("username"); 
        String password = payload.get("password");
        String role = payload.get("role") != null ? payload.get("role") : "user";
        
        Map<String, Object> response = new HashMap<>();

        try {
            org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
                    new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(usernameOrEmail, password));
            
            org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            com.gym.backend.security.UserDetailsImpl userDetails = (com.gym.backend.security.UserDetailsImpl) authentication.getPrincipal();
            
            // Validate requested role against actual role, just to be safe
            boolean roleMatches = userDetails.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equalsIgnoreCase("ROLE_" + role));
            
            if (!roleMatches) {
                response.put("success", false);
                response.put("message", "Invalid role for this user");
                return ResponseEntity.status(403).body(response);
            }

            // Mock the user object format the frontend expects
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", userDetails.getId());
            userData.put("username", userDetails.getUsername());
            userData.put("email", userDetails.getEmail());
            userData.put("role", role);

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", jwt);
            response.put("user", userData);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
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
