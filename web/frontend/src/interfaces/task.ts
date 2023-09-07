export interface Task {
    task: string;
    completed: boolean;
    priority: string;
    dueDate?: Date | null;
}