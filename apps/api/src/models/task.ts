import { Schema, model, Document, Types } from "mongoose";

interface TaskModel extends Document {
    user: Types.ObjectId;
    task: string;
    completed: boolean;
    archived: boolean;
    priority: "high" | "medium" | "low";
    dueDate: Date | null;
    description: string;
    labels: string[];
}

const TaskSchema = new Schema<TaskModel>({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    dueDate: { type: Date, default: null },
    description: { type: String, default: null },
    labels: { type: [String], default: null },
}, {
  timestamps: true,
});

const Task = model<TaskModel>("tasks", TaskSchema);

export default Task;
