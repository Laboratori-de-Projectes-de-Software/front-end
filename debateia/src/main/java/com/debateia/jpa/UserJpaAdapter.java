package com.debateia.jpa;

import org.springframework.stereotype.Component;

import com.debateia.domain.LoginRequestDto;
import com.debateia.domain.LoginResponseDto;
import com.debateia.domain.UpdateCredentialsDto;
import com.debateia.domain.UserPort;
import com.debateia.domain.UsuarioDto;
import java.util.Optional;
@Component
public class UserJpaAdapter implements UserPort {
    private UserJpaRepository userJpaRepository;
    private UserMapper userMapper;
    public UserJpaAdapter(UserMapper userMapper, UserJpaRepository userJpaRepository) {
        this.userMapper = userMapper;
        this.userJpaRepository = userJpaRepository;
    }
    @Override
    public UsuarioDto save(UsuarioDto usuarioDto) {
        return userMapper.toDomain(userJpaRepository.save(userMapper.toEntity(usuarioDto)));
    }
    @Override
    public boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);       
    }
    @Override
    public boolean existsByUsername(String username) {
        return userJpaRepository.existsByUserName(username);   
    }
    @Override
    public LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto) {
           Optional<UserEntity> userOptional=userJpaRepository.findByEmail(loginRequestDto.getEmail());
           if(userOptional.isEmpty()){
            return new LoginResponseDto(false,"Usuario no encontrado");
           }
           UserEntity user=userOptional.get();
           if(!user.getPassword().equals(loginRequestDto.getPassword())){
            return new LoginResponseDto(false,"Contraseña incorrecta");
           }
           return new LoginResponseDto(
            user.getId(),
            user.getNameUser(),
            user.getEmail(),
            true,
            "Inicio de sesión exitoso"
           );
        }
    @Override
    public UsuarioDto updateUserCredentials(Long userId, UpdateCredentialsDto updateCredentialsDto) {
       Optional<UserEntity> userOptional=userJpaRepository.findById(userId);
       if(userOptional.isEmpty()){
        return null;
       }
       UserEntity user=userOptional.get();
       if(updateCredentialsDto.getNewUsername()!=null && !updateCredentialsDto.getNewUsername().trim().isEmpty()){
        user.setNameUser(updateCredentialsDto.getNewUsername());
       }
       if(updateCredentialsDto.getNewPassword()!=null && !updateCredentialsDto.getNewPassword().trim().isEmpty()){
        user.setPassword(updateCredentialsDto.getNewPassword());
       }
       return userMapper.toDomain(userJpaRepository.save(user));
    }
    

    
}
