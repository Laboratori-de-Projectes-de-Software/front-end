package com.debateia.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.debateia.domain.AddUserUseCase;
import com.debateia.domain.LoginRequestDto;
import com.debateia.domain.LoginResponseDto;
import com.debateia.domain.LoginUserUseCase;
import com.debateia.domain.UpdateCredentialsDto;
import com.debateia.domain.UpdateUserCredentialsUseCase;
import com.debateia.domain.UsuarioDto;

@RestController
@RequestMapping("/api")
public class UsuarioController {
    @PostMapping("/inicio")
    public String HolaMundo(){
        return "hola Mundo";
    }
    @GetMapping("/inicio")
    public String getInicio() {
        return "Inicio";
    }
    @GetMapping("/crear/{nombre}")
    public String customPostMethod(@PathVariable String nombre) {
        return nombre;
    }

    private final AddUserUseCase addUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final UpdateUserCredentialsUseCase updateUserCredentialsUseCase;
    
    public UsuarioController(AddUserUseCase addUserUseCase,LoginUserUseCase loginUserCase,UpdateUserCredentialsUseCase updateCredentialsUseCase) {
        this.addUserUseCase = addUserUseCase;
        this.loginUserUseCase=loginUserCase;
        this.updateUserCredentialsUseCase = updateCredentialsUseCase;
    }
    @RequestMapping("/registro/{nombre}/{email}/{password}")
    public ResponseEntity<UsuarioDto> registrarUsuario(
            @PathVariable String nombre,
            @PathVariable String email,
            @PathVariable String password) {
        
        // Llamar al caso de uso directamente con los parámetros
        UsuarioDto usuarioCreado = addUserUseCase.createUser(new UsuarioDto(nombre,email,password));
        
        return new ResponseEntity<>(usuarioCreado, HttpStatus.CREATED);
    }

    @PostMapping("/registropost")
    public ResponseEntity<UsuarioDto> registrarUsuario(@RequestBody UsuarioDto usuarioDto) {
        UsuarioDto usuarioCreado = addUserUseCase.createUser(usuarioDto);
        return new ResponseEntity<>(usuarioCreado, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        LoginResponseDto response=loginUserUseCase.login(loginRequestDto);
        if(response.isSuccess()){
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/usuarios/{userId}/credenciales")
    public ResponseEntity<UsuarioDto> updateCredentials(@PathVariable Long userId,@RequestBody UpdateCredentialsDto updateCredentialsDto){
        UsuarioDto updateUser=updateUserCredentialsUseCase.updateCredentials(userId, updateCredentialsDto );
        if(updateUser==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updateUser,HttpStatus.OK);
    
    }


    
}
