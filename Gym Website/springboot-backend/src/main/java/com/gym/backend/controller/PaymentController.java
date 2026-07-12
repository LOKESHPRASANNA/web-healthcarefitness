package com.gym.backend.controller;

import com.gym.backend.entity.Payment;
import com.gym.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPayment(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("user_id").toString());
        Integer amount = Integer.valueOf(payload.get("amount").toString());
        
        Map<String, Object> response = new HashMap<>();
        try {
            paymentService.createPayment(userId, amount);
            response.put("success", true);
            response.put("message", "Payment processed");
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPayments() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("payments", paymentService.getAllPayments());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getPayments(@PathVariable Long userId) {
        List<Payment> history = paymentService.getPayments(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("payments", history);
        return ResponseEntity.ok(response);
    }
}
