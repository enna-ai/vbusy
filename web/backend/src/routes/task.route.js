import express from "express";
import { createTask, getTask, getTasks, deleteTask, updateTask, completeTask, updateTaskDueDate, updateTaskPriority, purgeTasks, archiveTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:taskId", getTask);
router.patch("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);
router.delete("/tasks/purge", purgeTasks);

router.put("/tasks/:taskId/complete", completeTask);
router.put("/tasks/:taskId/priority", updateTaskPriority);
router.put("/tasks/:taskId/due", updateTaskDueDate);
router.put("/tasks/:taskId/archive", archiveTask);

export default router;