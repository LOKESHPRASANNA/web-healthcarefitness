package com.gym.backend.repository;

import com.gym.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUserIdOrderByDateDesc(Long userId);
    Optional<Attendance> findByUserIdAndDate(Long userId, LocalDate date);
}
