package com.example.demo.Task;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository //Marks interface as Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
    
    Optional<Task> findTaskByName(String name);
    //Might be unnecessary but practicing.

    Optional<Task> findTaskById(Long id);
}
