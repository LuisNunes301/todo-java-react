package com.todo.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.api.domain.task.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
