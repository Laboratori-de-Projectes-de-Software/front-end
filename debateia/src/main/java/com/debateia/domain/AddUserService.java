package com.debateia.domain;

import org.springframework.stereotype.Service;

@Service
public class AddUserService implements AddUserUseCase {
    private final UserPort userPort;
    public AddUserService(UserPort userPort) {
        this.userPort = userPort;
    }

    @Override
    public UsuarioDto createUser(UsuarioDto usuarioDto) {
      String encryptedPassword=usuarioDto.getPassword();
      usuarioDto.setPassword(encryptedPassword);
      return userPort.save(usuarioDto);
    }
    
}
