package com.debateia.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
//Entidad debate (contiene todo estado de la conv.)
@Data
public class Debate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String topic;            // Tema del debate
    private Boolean isActive;        // Estado del debate
    private LocalDateTime createdAt; // Fecha de creación
    
    @OneToMany(mappedBy = "debate", cascade = CascadeType.ALL)
    private List<Message> messages;  // Lista de mensajes del debate

    // Constructor vacío requerido por JPA
    public Debate() {
        this.messages = new ArrayList<>();
        this.isActive = true;
        this.createdAt = LocalDateTime.now();
    }
    public Debate(String topic) {
        this();  // Llama al constructor vacío
        this.topic = topic;
    }

    // Getters y Setters (generados por Lombok con @Data)
    // Si no usaras Lombok, necesitarías escribir:
    
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    // ... resto de getters y setters
}