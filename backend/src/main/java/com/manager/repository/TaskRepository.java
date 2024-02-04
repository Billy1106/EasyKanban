package com.manager.repository;

import com.manager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findBySeverity(int severity);
    @Query("{assignee: ?0}")
    List<Task> getTasksByAssignee(String assignee);

    @Query("{status: ?0}")
    List<Task> getTasksByStatus(String status);

    @Query("{tags: ?0}")
    List<Task> getTasksByTags(String tag);

    @Query("{deadline: ?0}")
    List<Task> getTasksByDeadline(String deadline);

    @Query("{startedAt: ?0}")
    List<Task> getTasksByStartedAt(String startedAt);

    @Query("{title: ?0}")
    List<Task> getTasksByTitle(String title);
    
}
