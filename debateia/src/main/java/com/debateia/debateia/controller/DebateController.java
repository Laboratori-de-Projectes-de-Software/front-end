package com.debateia.debateia.controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.debateia.debateia.dto.DebateRequest;
import com.debateia.debateia.model.Debate;
import com.debateia.debateia.service.AIService;
import com.debateia.debateia.model.Message;;

@RestController
@RequestMapping("/api/debates")
public class DebateController {
    @Autowired
    private AIService aiService;
    @PostMapping("/start")
    public ResponseEntity<Debate> startDebate(@RequestBody DebateRequest request) {
        // Iniciar nuevo debate
        Debate newDebate = new Debate();
        return ResponseEntity.ok(newDebate);
    }
/*
@PostMapping("/debates")
public ResponseEntity<DebateResponse> createDebate(@RequestBody DebateRequest request) {
    Debate debate = debateService.createDebate(request);
    return ResponseEntity.ok(convertToResponse(debate));
}
 */

 /*
  * 
  @PostMapping("/debates/{debateId}/messages")
public ResponseEntity<MessageDTO> addMessage(
    @PathVariable Long debateId,
    @RequestBody Message message
) {
    Message saved = messageService.addMessage(debateId, message);
    return ResponseEntity.ok(convertToDTO(saved));
}
  */
    @PostMapping("/{debateId}/message")
    public ResponseEntity<Message> processMessage(@PathVariable Long debateId, 
                                                @RequestBody Message message) {
        // Procesar mensaje y obtener respuesta de la IA
        Message savedMessage=new Message();
        return ResponseEntity.ok(savedMessage);
    }
}
