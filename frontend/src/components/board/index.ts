export enum STATE {
  BACKLOG = "Backlog",
  STAY = "Stay",
  INPROGRESS = "In Process",
  DONE = "Done",
}

export enum TAG {
  BUG = "Bug",
  FEATURE = "Feature",
  IMPROVEMENT = "Improvement",
  TASK = "Task",
  EPIC = "Epic",
  STORY = "Story",
  URGENT = "Urgent",
}

export const STATE_COLOR = {
  [STATE.BACKLOG]: "#CA8A04",
  [STATE.STAY]: "#DB2777",
  [STATE.INPROGRESS]: "#9333EA",
  [STATE.DONE]: "#16A34A",
};

export const TAG_COLOR = {
  [TAG.BUG]: "#FF0000",
  [TAG.FEATURE]: "#FF00FF",
  [TAG.IMPROVEMENT]: "#0000FF",
  [TAG.TASK]: "#FFFF00",
  [TAG.EPIC]: "#FF00FF",
  [TAG.STORY]: "#00FFFF",
  [TAG.URGENT]: "#FFA500",
}

export enum MODE {
  BOARD = "BOARD",
  LIST = "LIST",
}

export interface Task {
  id: string;
  title: string;
  severity: number;
  assignee: string;
  storyPoint: number;
  description: string;
  status: STATE;
  deadline: string;
  startedAt: string;
  tags: string[];
}

export interface Column {
  title: STATE;
  tasks: Task[];
}
