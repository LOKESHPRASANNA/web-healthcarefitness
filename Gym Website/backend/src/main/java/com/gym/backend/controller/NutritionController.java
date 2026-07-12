package com.gym.backend.controller;

import com.gym.backend.entity.Nutrition;
import com.gym.backend.service.NutritionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nutrition")
public class NutritionController {

    @Autowired
    private NutritionService nutritionService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addIntake(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("user_id").toString());
        Integer calories = Integer.valueOf(payload.get("calories").toString());
        BigDecimal protein = new BigDecimal(payload.get("protein").toString());
        BigDecimal fat = new BigDecimal(payload.get("fat").toString());
        BigDecimal carbs = new BigDecimal(payload.get("carbs").toString());
        
        nutritionService.addIntake(userId, calories, protein, fat, carbs);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Intake added");
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getNutrition(@PathVariable Long userId) {
        List<Nutrition> history = nutritionService.getHistory(userId);
        Map<String, Object> summary = nutritionService.getSummary(userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", history);
        response.put("summary", summary);
        return ResponseEntity.ok(response);
    }
}
