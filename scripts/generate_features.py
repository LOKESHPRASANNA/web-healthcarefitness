import os

base_pkg = r'D:\Gym Website zip\backend\src\main\java\com\gym\backend'
entity_dir = os.path.join(base_pkg, 'entity')
repo_dir = os.path.join(base_pkg, 'repository')
controller_dir = os.path.join(base_pkg, 'controller')

# Personal Record Entity
pr_entity = """package com.gym.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "personal_records")
public class PersonalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "exercise_name")
    private String exerciseName;

    private Double weight;
    private Integer reps;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getExerciseName() { return exerciseName; }
    public void setExerciseName(String exerciseName) { this.exerciseName = exerciseName; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public Integer getReps() { return reps; }
    public void setReps(Integer reps) { this.reps = reps; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
"""

# Personal Record Repository
pr_repo = """package com.gym.backend.repository;

import com.gym.backend.entity.PersonalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    List<PersonalRecord> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<PersonalRecord> findByUserIdAndExerciseNameOrderByCreatedAtDesc(Long userId, String exerciseName);
}
"""

# Personal Record Controller
pr_controller = """package com.gym.backend.controller;

import com.gym.backend.entity.PersonalRecord;
import com.gym.backend.repository.PersonalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/personal-records")
public class PersonalRecordController {

    @Autowired
    private PersonalRecordRepository repository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PersonalRecord>> getUserPRs(@PathVariable Long userId) {
        return ResponseEntity.ok(repository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addPR(@RequestBody PersonalRecord pr) {
        repository.save(pr);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Personal record saved");
        response.put("data", pr);
        return ResponseEntity.ok(response);
    }
}
"""

# Notification Entity
notif_entity = """package com.gym.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String title;
    private String message;

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
"""

# Notification Repository
notif_repo = """package com.gym.backend.repository;

import com.gym.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
}
"""

# Notification Controller
notif_controller = """package com.gym.backend.controller;

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
"""

# Write files
def write_f(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

write_f(os.path.join(entity_dir, 'PersonalRecord.java'), pr_entity)
write_f(os.path.join(repo_dir, 'PersonalRecordRepository.java'), pr_repo)
write_f(os.path.join(controller_dir, 'PersonalRecordController.java'), pr_controller)

write_f(os.path.join(entity_dir, 'Notification.java'), notif_entity)
write_f(os.path.join(repo_dir, 'NotificationRepository.java'), notif_repo)
write_f(os.path.join(controller_dir, 'NotificationController.java'), notif_controller)

print("Feature files created successfully.")
