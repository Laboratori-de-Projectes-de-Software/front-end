package com.debateia.domain;

public interface UserPort {
    public UsuarioDto save(UsuarioDto usuarioDto);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    public LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto);
    public UsuarioDto updateUserCredentials(Long userId, UpdateCredentialsDto updateCredentialsDto);
}
