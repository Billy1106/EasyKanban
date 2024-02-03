export enum STATE {
  BACKLOG = "Backlog",
  STAY = "Stay",
  INPROGRESS = "In Process",
  DONE = "Done"
}

export enum MODE {
  BOARD = "BOARD",
  LIST = "LIST"
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
