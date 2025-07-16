package com.todo.api.domain.task;

public record TaskResponseDTO(Long id, String title, String description, boolean completed) {

    public TaskResponseDTO(Task task) {
        this(task.getId(), task.getTitle(), task.getDescription(), task.isCompleted());
    }
}
