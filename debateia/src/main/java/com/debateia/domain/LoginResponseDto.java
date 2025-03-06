package com.debateia.domain;

public class LoginResponseDto {
    private Long id;
    private String nombre;
    private String email;
    private boolean success;
    private String message;
    public LoginResponseDto() {
    }
    public LoginResponseDto(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    public LoginResponseDto(Long id, String nombre, String email, boolean success, String message) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.success = success;
        this.message = message;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    };
    


}
