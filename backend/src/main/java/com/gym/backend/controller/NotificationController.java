package com.gym.backend.controller;

import com.gym.backend.entity.Notification;
import com.gym.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository repository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(repository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createNotification(@RequestBody Notification notif) {
        repository.save(notif);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long id) {
        Optional<Notification> opt = repository.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (opt.isPresent()) {
            Notification n = opt.get();
            n.setIsRead(true);
            repository.save(n);
            response.put("success", true);
            return ResponseEntity.ok(response);
        }
        response.put("success", false);
        return ResponseEntity.status(404).body(response);
    }
}
