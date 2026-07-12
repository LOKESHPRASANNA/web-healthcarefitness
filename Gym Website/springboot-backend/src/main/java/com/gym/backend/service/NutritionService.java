package com.gym.backend.service;

import com.gym.backend.entity.Nutrition;
import com.gym.backend.repository.NutritionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class NutritionService {

    @Autowired
    private NutritionRepository nutritionRepository;

    public Nutrition addIntake(Long userId, Integer calories, BigDecimal protein, BigDecimal fat, BigDecimal carbs) {
        Nutrition intake = Nutrition.builder()
                .userId(userId)
                .calories(calories)
                .protein(protein)
                .fat(fat)
                .carbs(carbs)
                .date(LocalDate.now())
                .build();
                
        return nutritionRepository.save(intake);
    }

    public List<Nutrition> getHistory(Long userId) {
        return nutritionRepository.findByUserIdOrderByDateDesc(userId);
    }

    public java.util.Map<String, Object> getSummary(Long userId) {
        List<Nutrition> daily = nutritionRepository.findByUserIdAndDate(userId, LocalDate.now());
        
        int totalCalories = daily.stream().mapToInt(Nutrition::getCalories).sum();
        double totalProtein = daily.stream().mapToDouble(n -> n.getProtein().doubleValue()).sum();
        double totalFat = daily.stream().mapToDouble(n -> n.getFat().doubleValue()).sum();
        double totalCarbs = daily.stream().mapToDouble(n -> n.getCarbs().doubleValue()).sum();
        
        double totalMacros = totalProtein + totalFat + totalCarbs;
        double fatPercentage = totalMacros > 0 ? (totalFat / totalMacros) * 100 : 0;

        java.util.Map<String, Object> summary = new java.util.HashMap<>();
        summary.put("totalCalories", totalCalories);
        summary.put("totalProtein", Math.round(totalProtein * 10) / 10.0);
        summary.put("fatPercentage", Math.round(fatPercentage * 10) / 10.0);
        
        return summary;
    }
}
