package com.todo.api.domain.task;

import jakarta.validation.constraints.NotBlank;

public record TaskRequestDTO(
                @NotBlank String title,
                @NotBlank String description,
                boolean completed) {
}
