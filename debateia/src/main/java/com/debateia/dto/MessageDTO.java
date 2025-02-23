package com.debateia.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MessageDTO {
    private String content;
    private Boolean isEnemy;
    private Boolean hasYielded;
    private LocalDateTime timestamp;
}
