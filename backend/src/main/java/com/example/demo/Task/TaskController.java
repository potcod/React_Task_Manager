package com.example.demo.Task;

import java.util.List;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController //Return as JSON
@RequestMapping("/home") //Create path 
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks(){
        return taskService.getTasks();
    }

    @PostMapping
    public void createTask(@RequestBody Task task){
        System.out.println("TAG" + task);
        taskService.addTask(task);
    }

    @DeleteMapping(path = "{taskId}")
    public void deleteTask(@PathVariable("taskId") Long id){
        taskService.deleteTask(id);
    }

    @PutMapping(path = "{taskId}")
    public void updateTask(@PathVariable("taskId") Long id, @RequestBody Task task){
        taskService.updateTask(id, task.getName(), task.getDescription(), task.isCompletion(), task.getCategory());
    }

    @SendTo("/topic/tasks")
    public Task sendTaskUpdate(Task task){
        return task;
    }
}
