package com.gym.backend.repository;

import com.gym.backend.entity.Nutrition;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {
    List<Nutrition> findByUserIdOrderByDateDesc(Long userId);
    List<Nutrition> findByUserIdAndDate(Long userId, java.time.LocalDate date);
}
