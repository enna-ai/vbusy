export interface Task {
    _id: string;
    task: string;
    completed: boolean;
    priority: string;
    dueDate?: Date | null;
}