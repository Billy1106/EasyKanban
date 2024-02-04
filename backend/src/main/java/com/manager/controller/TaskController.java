package com.manager.controller;

import com.manager.model.Task;
import com.manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService service;
    @RequestMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return service.addTask(task);
    }

    @GetMapping
    public List<Task> getTasks() {
        return service.findAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable String id) {
        return service.getTaskById(id);
    }

    @GetMapping("/severity/{severity}")
    public List<Task> findTasksBySeverity(@PathVariable int severity){
        return service.getTasksBySeverity(severity);
    }

    @GetMapping("/assignee/{assignee}")
    public List<Task> findTasksByAssignee(@PathVariable String assignee){
        return service.getTasksByAssignee(assignee);
    }

    @PutMapping
    public Task modifyTask(@RequestBody Task task) {
        return service.updateTask(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable String id) {
        return service.deleteTask(id);
    }

    @GetMapping("/status/{status}")
    public List<Task> findTasksByStatus(@PathVariable String status) {
        return service.getTasksByStatus(status);
    }

    @GetMapping("/tags/{tag}")
    public List<Task> findTasksByTags(@PathVariable String tag) {
        return service.getTasksByTags(tag);
    }

    @GetMapping("/deadline/{deadline}")
    public List<Task> findTasksByDeadline(@PathVariable String deadline) {
        return service.getTasksByDeadline(deadline);
    }

    @GetMapping("/startedAt/{startedAt}")
    public List<Task> findTasksByStartedAt(@PathVariable String startedAt) {
        return service.getTasksByStartedAt(startedAt);
    }

    @GetMapping("/title/{title}")
    public List<Task> findTasksByTitle(@PathVariable String title) {
        return service.getTasksByTitle(title);
    }

}
