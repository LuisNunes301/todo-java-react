package com.todo.api.controllers;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.todo.api.domain.task.Task;
import com.todo.api.dto.TaskRequestDTO;
import com.todo.api.dto.TaskResponseDTO;
import com.todo.api.dto.TaskUpdateDTO;
import com.todo.api.repositories.TaskRepository;

@RestController
@RequestMapping("task")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> postTask(@RequestBody @Valid TaskRequestDTO body) {
        Task newTask = new Task(body);
        Task savedTask = taskRepository.save(newTask);
        return ResponseEntity.ok(new TaskResponseDTO(savedTask));
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        List<TaskResponseDTO> taskList = taskRepository.findAll()
                .stream()
                .map(TaskResponseDTO::new)
                .toList();
        return ResponseEntity.ok(taskList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> ResponseEntity.ok(new TaskResponseDTO(task)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long id,
            @RequestBody @Valid TaskUpdateDTO updateDTO) {

        return taskRepository.findById(id)
                .map(task -> {
                    if (updateDTO.title() != null) {
                        task.setTitle(updateDTO.title());
                    }
                    if (updateDTO.description() != null) {
                        task.setDescription(updateDTO.description());
                    }
                    if (updateDTO.completed() != null) {
                        task.setCompleted(updateDTO.completed());
                    }

                    Task updatedTask = taskRepository.save(task);
                    return ResponseEntity.ok(new TaskResponseDTO(updatedTask));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (!taskRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
