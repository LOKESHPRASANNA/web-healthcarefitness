package com.gym.backend.controller;

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
