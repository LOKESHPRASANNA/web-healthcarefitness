package com.gym.backend.service;

import com.gym.backend.entity.Payment;
import com.gym.backend.entity.User;
import com.gym.backend.repository.PaymentRepository;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public Payment createPayment(Long userId, Integer amount) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        Payment payment = new Payment();
        payment.setUserId(userId);
        payment.setAmount(amount);
        payment.setPaymentDate(java.time.LocalDate.now());
        payment.setStatus("completed");
                
        Payment savedPayment = paymentRepository.save(payment);
        
        // Send payment confirmation email
        emailService.sendPaymentConfirmation(user.getEmail(), user.getFullName(), amount.toString());
        
        return savedPayment;
    }

    public List<Payment> getPayments(Long userId) {
        return paymentRepository.findByUserIdOrderByPaymentDateDesc(userId);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
