package com.debateia.domain;

public interface UpdateUserCredentialsUseCase {
    UsuarioDto updateCredentials(Long userId, UpdateCredentialsDto updateCredentialsDto);
}
