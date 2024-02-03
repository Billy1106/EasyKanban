export enum STATE {
  BACKLOG = "Backlog",
  STAY = "Stay",
  INPROGRESS = "In Process",
  DONE = "Done",
}

export const STATE_COLOR = {
  [STATE.BACKLOG]: "#CA8A04",
  [STATE.STAY]: "#DB2777",
  [STATE.INPROGRESS]: "#9333EA",
  [STATE.DONE]: "#16A34A",
};

export const TAG_COLOR = {
  "Bug": "#FF0000",
  "Feature": "#FF00FF",
  "Improvement": "#0000FF",
  "Task": "#FFFF00",
  "Epic": "#FF00FF",
  "Story": "#00FFFF",
  "Urgent": "#FFA500",
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
