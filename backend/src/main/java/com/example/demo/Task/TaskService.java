package com.example.demo.Task;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;

    }


    //Serve GET method
    public List<Task> getTasks(){
        return taskRepository.findAll();
    }

    //Serve POST method
    public void addTask(Task task){
        Optional<Task> taskByName = taskRepository.findTaskByName(task.getName()); //Make sure it doesnt exist yet
        if(taskByName.isPresent()){ 
            throw new IllegalStateException("Task Name Taken Already");
        }
        System.out.println("Added Task!");
        
        taskRepository.save(task); //.save is boilerplate code done by JpaRepo already
        
    }

    //Serve DELETE method
    public void deleteTask(Long id){
        if(!taskRepository.existsById(id))
            throw new IllegalStateException("Task does not exist, can not be deleted");
        taskRepository.deleteById(id);
    }

    //Serve PUT method
    public void updateTask(Long id, String name, String description, Boolean completion, String category) {
        Task task = taskRepository.findTaskById(id).orElseThrow(() -> new IllegalStateException("Task DNE"));

        if(name != null && name.length() > 0){
            task.setName(name);
        }
        
        if(description != null){
            task.setDescription(description); //User might want an empty desc
        }

        if(completion != null){
            task.setCompletion(completion);
            System.out.println("Completion set to:" + task.isCompletion());
        }
        if(category != null) {
            task.setCategory(category);
        }

        taskRepository.save(task);
    }
    
}
