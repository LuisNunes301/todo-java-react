package com.todo.api.dto;

import jakarta.validation.constraints.Size;

public record TaskUpdateDTO(
        @Size(min = 2, max = 100, message = "Title must be between 2 and 100 characters") String title,

        @Size(max = 500, message = "Description cannot exceed 500 characters") String description,

        Boolean completed) {
}