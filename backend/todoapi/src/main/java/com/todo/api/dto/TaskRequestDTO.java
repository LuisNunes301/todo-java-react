package com.todo.api.dto;

import jakarta.validation.constraints.NotBlank;

public record TaskRequestDTO(
        @NotBlank String title,
        @NotBlank String description,
        boolean completed) {
}
