package com.example.demo;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.demo.Task.Task;

@Controller
public class MessageController {
    
    @MessageMapping("/updateTask")
    @SendTo("/topic/tasks")
    public Task sendUpdate(Task task){
        System.out.println("Server has received:" + task);
        return task;

    }


}
