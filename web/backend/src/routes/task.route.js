import express from "express";
import protect from "../middleware/auth.js";
import { createTask, getTask, getTasks,
    // deleteTask, updateTask, completeTask, updateTaskDueDate, updateTaskPriority, purgeTasks, archiveTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);
router.route("/:taskId").get(protect, getTask);

export default router;