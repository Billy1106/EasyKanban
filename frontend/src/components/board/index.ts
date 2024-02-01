export enum STATE {
  STAY = "Stay",
  INPROGRESS = "In Process",
  DONE = "Done"
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
  tag: string;
}

export interface Column {
  title: STATE;
  tasks: Task[];
}
