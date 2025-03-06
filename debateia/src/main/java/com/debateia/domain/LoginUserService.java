package com.debateia.domain;

import org.springframework.stereotype.Service;

@Service
public class LoginUserService implements LoginUserUseCase{
    private final UserPort userPort;
    public LoginUserService(UserPort userPort) {
        this.userPort = userPort;
    }
    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
       return userPort.authenticateUser(loginRequestDto); 
    }
    
}
