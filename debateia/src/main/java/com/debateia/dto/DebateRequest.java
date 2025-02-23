package com.debateia.dto;

// DebateRequest.java
import lombok.Data;

@Data
//Permite recibir la peticion de crear un debate
public class DebateRequest {
    private String topic;        // Tema del debate
    private String initialMessage;  // Mensaje inicial
    private String aiType;       // Tipo de IA a usar
    private Boolean isActive;    // Estado del debate
}