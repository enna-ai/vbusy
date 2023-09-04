import { Schema, model } from "mongoose";

const Task = new Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: true },
});

export default model("tasks", Task);