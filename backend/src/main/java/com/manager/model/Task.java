package com.manager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private String taskId;
    private String title;
    private String description;
    private int severity;
    private String assignee;
    private int storyPoint;
    private String status;
    private String deadline;
    private String startedAt;
    private String[] tags;
}  