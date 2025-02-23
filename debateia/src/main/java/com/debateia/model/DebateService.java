package com.debateia.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.debateia.dto.DebateRequest;
import com.debateia.repository.DebateRepository;
import com.debateia.repository.MessageRepository;
@Service
public class DebateService {
    @Autowired
    private DebateRepository debateRepository;
    
    @Autowired
    private MessageRepository messageRepository;
    public Debate createDebate(DebateRequest request) {
        Debate debate = new Debate();
        debate.setTopic(request.getTopic());
        // ... más lógica
        return debateRepository.save(debate);
    }

    public Message processMessage(Long debateId, Message message) {
        // Lógica para procesar el mensaje y obtener respuesta de la IA
        return messageRepository.save(message);
    }
}