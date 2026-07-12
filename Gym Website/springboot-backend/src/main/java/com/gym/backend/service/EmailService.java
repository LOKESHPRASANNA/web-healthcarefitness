package com.gym.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("your-gym-app@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }

    public void sendWelcomeEmail(String to, String fullName) {
        String subject = "Welcome to Our Gym!";
        String body = "Hello " + fullName + ",\n\nWelcome to our fitness family! Your account has been successfully created. We are excited to have you with us.\n\nBest Regards,\nThe Gym Team";
        sendEmail(to, subject, body);
    }

    public void sendPaymentConfirmation(String to, String fullName, String amount) {
        String subject = "Payment Confirmation - Gym Membership";
        String body = "Hello " + fullName + ",\n\nWe have received your payment of Rs. " + amount + ". Your membership is now active.\n\nThank you for choosing us!\n\nThe Gym Team";
        sendEmail(to, subject, body);
    }
}
