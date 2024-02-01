package com.manager.service;

import com.manager.model.Task;
import com.manager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repository;

    //CRUD
    public Task addTask(Task task) {
        task.setTaskId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(task);
    }

    public List<Task> findAllTasks() {
        return repository.findAll();
    }

    public Task getTaskById(String id) {
        return repository.findById(id).get(); //not returning
    }

    public List<Task> getTasksBySeverity(int severity){
        return repository.findBySeverity(severity);
    }

    public List<Task> getTasksByAssignee(String assignee){
        return repository.getTasksByAssignee(assignee);
    }

    public Task updateTask(Task taskRequest) {
        Task task = repository.findById(taskRequest.getTaskId()).get();
        task.setDescription(taskRequest.getDescription());
        task.setAssignee(taskRequest.getAssignee());
        task.setSeverity(taskRequest.getSeverity());
        task.setStoryPoint(taskRequest.getStoryPoint());
        return repository.save(task);
    }

    public String deleteTask(String id) {
        repository.deleteById(id);
        return id + " task deleted from dashboard";
    }
}
