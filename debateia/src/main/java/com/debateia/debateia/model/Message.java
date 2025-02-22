package com.debateia.debateia.model;

// Message.java
import lombok.Data;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
@Data
//Mensaje de debate
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
