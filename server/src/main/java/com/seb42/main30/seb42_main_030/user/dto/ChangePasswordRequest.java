package com.seb42.main30.seb42_main_030.user.dto;

public class ChangePasswordRequest {

    private String currentPassword;
    private String newPassword;

    // 기본 생성자
    public ChangePasswordRequest() {
    }

    // 모든 필드를 인자로 받는 생성자
    public ChangePasswordRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    // getter 메서드들
    public String getCurrentPassword() {
        return currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    // setter 메서드들
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}

