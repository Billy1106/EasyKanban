# Task Manager API

## Overview
The Task Manager API is a RESTful service designed to facilitate task management within a project or organization. It allows users to create, retrieve, update, and delete tasks, making it a versatile tool for tracking and organizing work items.

## Features
- **Create Tasks:** Users can add new tasks by specifying details such as the task description, assignee, severity, and due date.
- **Retrieve Tasks:** The API provides multiple endpoints to retrieve tasks:
  - Retrieve all tasks in the system.
  - Retrieve a specific task by its unique ID.
  - Retrieve tasks filtered by severity level.
  - Retrieve tasks assigned to a specific individual.
- **Update Tasks:** Users can update the details of an existing task, such as modifying its description, changing the assignee, adjusting the severity, or updating the due date.
- **Delete Tasks:** Tasks can be removed from the system by specifying their unique ID.

## Endpoints
- **POST /tasks:** Create a new task with the specified details in the request body.
- **GET /tasks:** Retrieve a list of all tasks.
- **GET /tasks/{id}:** Retrieve details of a specific task by its ID.
- **GET /tasks/severity/{severity}:** Find tasks with a specific severity level.
- **GET /tasks/assignee/{assignee}:** Find tasks assigned to a specific individual.
- **PUT /tasks:** Update an existing task with new details provided in the request body.
- **DELETE /tasks/{id}:** Delete a specific task by its ID.

## Usage
To use the Task Manager API, clients need to make HTTP requests to the respective endpoints with the required information. For creating or updating tasks, the request body should include the task details in JSON format.

## Security
Please note that this API currently does not include authentication or authorization mechanisms. It is recommended to implement suitable security measures before deploying this API in a production environment.

## Dependencies
- Spring Boot
- Spring Web MVC
