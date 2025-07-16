package com.todo.api.domain.task;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "tasks")
@Entity(name = "task")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean completed;

    public Task(TaskRequestDTO taskRequestDTO) {
        this.title = taskRequestDTO.title();
        this.description = taskRequestDTO.description();
        this.completed = taskRequestDTO.completed();
    }

}
