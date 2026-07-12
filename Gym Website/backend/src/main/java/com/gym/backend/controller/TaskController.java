package com.gym.backend.controller;

import com.gym.backend.entity.Task;
import com.gym.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addTask(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("user_id").toString());
        String taskName = payload.get("task_name").toString();
        
        taskService.addTask(userId, taskName);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Task added");
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Map<String, Object>> updateTask(@PathVariable Long taskId, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        Map<String, Object> response = new HashMap<>();
        try {
            taskService.updateStatus(taskId, status);
            response.put("success", true);
            response.put("message", "Task status updated");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(404).body(response);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getTasks(@PathVariable Long userId) {
        List<Task> tasks = taskService.getTasks(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("tasks", tasks);
        return ResponseEntity.ok(response);
    }
}
