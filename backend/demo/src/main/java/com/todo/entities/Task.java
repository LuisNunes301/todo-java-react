package com.todo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Task {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private boolean completed;
}
