package com.todo.api.dto;

import com.todo.api.domain.task.Task;

public record TaskResponseDTO(Long id, String title, String description, boolean completed) {

    public TaskResponseDTO(Task task) {
        this(task.getId(), task.getTitle(), task.getDescription(), task.isCompleted());
    }
}
