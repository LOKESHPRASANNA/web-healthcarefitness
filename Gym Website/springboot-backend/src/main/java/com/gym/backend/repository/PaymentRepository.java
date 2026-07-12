package com.gym.backend.repository;

import com.gym.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserIdOrderByPaymentDateDesc(Long userId);
    Optional<Payment> findFirstByUserIdOrderByPaymentDateDesc(Long userId);
}
