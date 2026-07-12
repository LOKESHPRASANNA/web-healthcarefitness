package com.gym.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/diet")
public class DietController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDietInfo() {
        Map<String, Object> diet = new HashMap<>();
        diet.put("calories", "2500 kcal");
        diet.put("protein", "150g");
        diet.put("fats", "70g");
        diet.put("vitamins suggestion", "Vitamin D, B12, and Omega-3");

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("diet", diet);
        
        return ResponseEntity.ok(response);
    }
}
