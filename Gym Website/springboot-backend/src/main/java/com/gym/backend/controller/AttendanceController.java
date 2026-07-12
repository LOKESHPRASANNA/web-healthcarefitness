package com.gym.backend.controller;

import com.gym.backend.entity.Attendance;
import com.gym.backend.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/checkin")
    public ResponseEntity<Map<String, Object>> markAttendance(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("user_id");
        Map<String, Object> response = new HashMap<>();
        try {
            attendanceService.markAttendance(userId);
            response.put("success", true);
            response.put("message", "Attendance marked successfully");
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(409).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAttendance() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("attendance", attendanceService.getAllAttendance());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getAttendance(@PathVariable Long userId) {
        List<Attendance> history = attendanceService.getHistory(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("attendance", history);
        return ResponseEntity.ok(response);
    }
}
