package com.debateia.model;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String content;      // Contenido del mensaje
    private Boolean isEnemy;     // Indica si es mensaje del "enemigo"
    private Boolean hasYielded;  // Booleano de rendido
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToOne
    @JoinColumn(name = "debate_id")
    private Debate debate;       // Relación con el debate
}