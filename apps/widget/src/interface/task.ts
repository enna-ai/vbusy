export interface Task {
  task: string;
  dueDate: string;
  archived: boolean;
  priority: string;
  completed: boolean;
}

export interface WidgetProps {
  userId: string | null;
  borderRadius: boolean;
  headerColor: string | null;
  bodyColor: string | null;
  textColor: string | null;
  accentColor: string | null,
  dueDates: boolean;
  priorityLevels: boolean;
  hideCompleted: boolean;
  userData: Task[];
  errorMsg: string | null;
}
