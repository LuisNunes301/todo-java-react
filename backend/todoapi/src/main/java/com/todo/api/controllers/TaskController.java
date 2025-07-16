package com.todo.api.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.todo.api.domain.task.Task;
import com.todo.api.domain.task.TaskRequestDTO;
import com.todo.api.repositories.TaskRepository;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity postTask(@RequestBody @Valid TaskRequestDTO body) {
        Task savedTask = new Task(body);

        this.taskRepository.save(savedTask);
        return ResponseEntity.ok().build();
    }

}
