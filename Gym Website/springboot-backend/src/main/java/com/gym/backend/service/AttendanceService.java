package com.gym.backend.service;

import com.gym.backend.entity.Attendance;
import com.gym.backend.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance markAttendance(Long userId) throws Exception {
        LocalDate today = LocalDate.now();
        
        // Prevent duplicate attendance
        if (attendanceRepository.findByUserIdAndDate(userId, today).isPresent()) {
            throw new Exception("Attendance already marked for today");
        }

        Attendance attendance = Attendance.builder()
                .userId(userId)
                .date(today)
                .checkInTime(LocalTime.now())
                .build();
                
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getHistory(Long userId) {
        return attendanceRepository.findByUserIdOrderByDateDesc(userId);
    }
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
}
