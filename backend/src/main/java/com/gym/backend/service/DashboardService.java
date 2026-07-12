package com.gym.backend.service;

import com.gym.backend.entity.Attendance;
import com.gym.backend.entity.Payment;
import com.gym.backend.entity.User;
import com.gym.backend.repository.AttendanceRepository;
import com.gym.backend.repository.PaymentRepository;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Map<String, Object> getDashboardData(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        Optional<Payment> lastPayment = paymentRepository.findFirstByUserIdOrderByPaymentDateDesc(userId);
        
        List<Attendance> attendanceList = attendanceRepository.findByUserIdOrderByDateDesc(userId);
        long monthlyAttendance = attendanceList.stream()
                .filter(a -> a.getDate().getMonth() == LocalDate.now().getMonth() &&
                            a.getDate().getYear() == LocalDate.now().getYear())
                .count();

        Map<String, Object> data = new HashMap<>();
        data.put("welcomeMessage", "Welcome, " + user.getFullName() + "!");
        data.put("membershipStatus", lastPayment.isPresent() ? "Active" : "Trial");
        data.put("lastPayment", lastPayment.orElse(null));
        data.put("attendanceCount", monthlyAttendance);
        
        return data;
    }
}
