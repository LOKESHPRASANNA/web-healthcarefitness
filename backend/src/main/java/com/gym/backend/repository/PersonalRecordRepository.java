package com.gym.backend.repository;

import com.gym.backend.entity.PersonalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    List<PersonalRecord> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<PersonalRecord> findByUserIdAndExerciseNameOrderByCreatedAtDesc(Long userId, String exerciseName);
}
