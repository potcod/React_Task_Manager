package com.example.demo.Task;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class Task {

    
    @Id //Marks next? var as a primary key of an Entity
    @SequenceGenerator( //Create a sequence that will be used by the @GeneratedValue
        name = "task-sequence",
        sequenceName = "task-sequence",
        allocationSize = 1
    )
    @GeneratedValue( //Uses "task-sequence" as a way to generate IDS in a order.
        strategy = GenerationType.SEQUENCE,
        generator = "task-sequence"
    )
    private Long id;


    private String name;
    private String description;
    private boolean completion;
    private String category;

    //Constructors - Normally for this kind of class we want a -
    // No args constructors - required by JPA for entity instantiation
    // All args - For manually creating IDS
    // No Id - For the program to create its own task with a generated ID.
    public Task() {

    }

    
    public Task(Long id, String name, String description, boolean completion) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.completion = completion;
    }
    
    
    public Task(String name, String description, boolean completion) {
        this.name = name;
        this.description = description;
        this.completion = completion;
    }

    //User adds task, ID will be auto, completion starts at false
    public Task(String name, String description, String category) {
        this.name = name;
        this.description = description;
        this.category = category;
    }

    //Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public boolean isCompletion() {
        return completion;
    }
    public void setCompletion(boolean completion) {
        this.completion = completion;
    }
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    @Override
    public String toString() {
        return "Task [id=" + id + ", name=" + name + ", description=" + description + ", completion=" + completion
                + "]";
    }

    

}
