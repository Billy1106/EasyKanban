import { Task } from "../components/board";

export function taskSearch(query: string, tasks: Task[]) {
    const q = query.toLowerCase();
    if (!q) {
        return tasks;
    }
    return tasks.filter((task) => {
        return (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
        );
    });
}

export function sortTasks(tasks: Task[], compareFunction: (a: Task, b: Task) => number): Task[]{
    return tasks.sort(compareFunction);
}

export const sortByDeadline = (a:Task, b:Task) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
export const sortBySeverity = (a:Task, b:Task) => a.severity - b.severity;
export const sortByStoryPoint = (a: Task, b:Task) => a.storyPoint - b.storyPoint;
export const sortByAssignee = (a: Task, b:Task) => a.assignee.localeCompare(b.assignee);
export const sortByStatus = (a: Task, b:Task) => a.status.localeCompare(b.status);
export const sortByTag = (a: Task, b:Task) => a.tag.localeCompare(b.tag);
export const sortByStartedAt = (a: Task, b:Task) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime();
export const sortByTitle = (a: Task, b:Task) => a.title.localeCompare(b.title);
export const sortByDescription = (a: Task, b:Task) => a.description.localeCompare(b.description);
