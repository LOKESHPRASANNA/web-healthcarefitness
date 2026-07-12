package com.gym.backend.controller;

import com.gym.backend.entity.Registration;
import com.gym.backend.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    @PostMapping
    public Registration createRegistration(@ModelAttribute Registration registration) {
        // index.html uses FormData, which submit as multipart/form-data or application/x-www-form-urlencoded
        // @ModelAttribute handles these. @RequestBody would handle JSON.
        return registrationRepository.save(registration);
    }
}
