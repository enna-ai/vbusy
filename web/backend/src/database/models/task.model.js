import { Schema, model } from "mongoose";

const Task = new Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    dueDate: { type: Date, default: null },
});

export default model("tasks", Task);