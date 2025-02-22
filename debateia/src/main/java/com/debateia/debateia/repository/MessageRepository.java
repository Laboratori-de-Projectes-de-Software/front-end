package com.debateia.debateia.dto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.debateia.debateia.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    // Buscar mensajes por debate
    List<Message> findByDebateId(Long debateId);
    
    // Buscar mensajes del enemigo
    List<Message> findByDebateIdAndIsEnemyTrue(Long debateId);
    
    // Buscar mensajes rendidos
    List<Message> findByDebateIdAndHasYieldedTrue(Long debateId);
    
    // Obtener el último mensaje de un debate
    @Query("SELECT m FROM Message m WHERE m.debate.id = :debateId ORDER BY m.createdAt DESC LIMIT 1")
    Optional<Message> findLastMessageByDebateId(@Param("debateId") Long debateId);
}
