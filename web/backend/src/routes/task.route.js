import express from "express";
import { createTask, getTask, getTasks, deleteTask, updateTask, completeTask, updateTaskDueDate, updateTaskPriority } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/tasks", createTask);
router.put("/tasks/:taskId/complete", completeTask);
router.put("/tasks/:taskId/priority", updateTaskPriority);
router.put("/tasks/:taskId/due", updateTaskDueDate);
router.get("/tasks", getTasks);
router.get("/task/:taskId", getTask);
router.delete("/task/:taskId", deleteTask);
router.put("/task/:taskId", updateTask);

export default router;