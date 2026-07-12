package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    private Integer age;

    private String gender;

    private String plan;

    @Column(columnDefinition = "TEXT")
    private String message;
}
