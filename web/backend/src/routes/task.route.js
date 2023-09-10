import express from "express";
import protect from "../middleware/auth.js";
import {
    createTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask,
    completeTask,
    updateTaskDueDate,
    updateTaskPriority,
    purgeTasks,
    archiveTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:taskId", protect, getTask);
router.patch("/:taskId", protect, updateTask);
router.delete("/:taskId", protect, deleteTask);
router.delete("/:userId/purge", protect, purgeTasks);

router.put("/:taskId/complete", protect, completeTask);
router.put("/:taskId/archive", protect, archiveTask);
router.put("/:taskId/due", protect, updateTaskDueDate);
router.put("/:taskId/priority", protect, updateTaskPriority);

export default router;