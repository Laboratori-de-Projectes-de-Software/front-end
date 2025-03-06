package com.debateia.domain;

public class UpdateCredentialsDto {
    private String newUsername;
    private String newPassword;
    public UpdateCredentialsDto(String newUsername, String newPassword) {
        this.newUsername = newUsername;
        this.newPassword = newPassword;
    }

    public UpdateCredentialsDto() {
    }

    public String getNewUsername() {
        return newUsername;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
       this.newPassword=newPassword;
}}
