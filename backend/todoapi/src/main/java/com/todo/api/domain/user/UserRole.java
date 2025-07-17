package com.todo.api.domain.user;

public enum UserRole {
    USER("admin"),
    ADMIN("admin");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
