package com.debateia.domain;

import org.springframework.stereotype.Service;

@Service
public class UpdateUserCredentialsService implements UpdateUserCredentialsUseCase{

    private final UserPort userPort;
        public UpdateUserCredentialsService(UserPort userPort){
            this.userPort=userPort;
        }   
    @Override
    public UsuarioDto updateCredentials(Long userId,UpdateCredentialsDto updateCredentialsDto) {
        return userPort.updateUserCredentials(userId,updateCredentialsDto);
    }
    
}
