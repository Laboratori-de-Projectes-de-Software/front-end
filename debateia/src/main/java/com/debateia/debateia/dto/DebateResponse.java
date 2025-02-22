package com.debateia.debateia.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
//Mensaje de respuesta al frontend
public class DebateResponse {
    private Long debateId;          // ID del debate
    private String topic;           // Tema del debate
    private String lastMessage;     // Último mensaje
    private Boolean isEnemyTurn;    // Si es turno del enemigo
    private Boolean hasEnded;       // Si el debate ha terminado
    private List<MessageDTO> messages; // Lista de mensajes resumida
}

