package com.debateia.jpa;

import com.debateia.domain.UsuarioDto;

public interface UserMapper {
    UsuarioDto toDomain(UserEntity entity);
    UserEntity toEntity(UsuarioDto dto);
    
}
