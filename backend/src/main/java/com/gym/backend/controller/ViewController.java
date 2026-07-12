package com.gym.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping({"/", "index"})
    public String index() {
        return "forward:/src/pages/index.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/src/pages/log-in.html";
    }

    @GetMapping("/signup")
    public String signup() {
        return "forward:/src/pages/signup.html";
    }

    @GetMapping("/admin")
    public String admin() {
        return "forward:/src/pages/admin_dashboard.html";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "forward:/src/pages/user_dashboard.html";
    }

    @GetMapping("/diet-view") // Avoid conflict with /api/diet
    public String dietView() {
        return "forward:/src/pages/proteins_vitamins.html";
    }

    @GetMapping("/plants")
    public String plants() {
        return "forward:/src/pages/medicinal_plants.html";
    }

    @GetMapping("/payment-view") // Avoid conflict with /api/payment
    public String paymentView() {
        return "forward:/src/pages/payment.html";
    }
}
