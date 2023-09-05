import express from "express";
import { createTask, getTask, getTasks, deleteTask, updateTask, completeTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/tasks", createTask);
router.put("/tasks/:taskId/complete", completeTask);
router.get("/tasks", getTasks);
router.get("/task/:taskId", getTask);
router.delete("/task/:taskId", deleteTask);
router.put("/task/:taskId", updateTask);

export default router;