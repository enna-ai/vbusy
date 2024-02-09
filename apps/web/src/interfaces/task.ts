export interface Task {
  _id: string;
  task: string;
  completed: boolean;
  archived: boolean;
  priority: string;
  dueDate?: Date | null;
}
