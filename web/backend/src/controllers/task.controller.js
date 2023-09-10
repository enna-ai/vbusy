/* eslint-disable no-underscore-dangle */
import asyncHandler from "express-async-handler";
import Task from "../database/models/task.model.js";
import { getTaskSchema, createTaskSchema, updateTaskSchema, completeTaskSchema, updateTaskDueSchema, updateTaskPrioritySchema } from "../validators/task.js";

export const createTask = asyncHandler(async (req, res) => {
    try {
        console.log(req.user);
        const { error, value } = createTaskSchema.validate({
            task: req.body.task,
            priority: req.body.priority,
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const date = req.body.dueDate;
        const { task, priority } = value;

        const newTask = new Task({
            user: req.user._id,
            task,
            priority,
            dueDate: date || null,
        });

        const saveTask = await newTask.save();

        return res.status(200).json(saveTask);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const getTask = asyncHandler(async (req, res) => {
    try {
        const { error, value } = getTaskSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const task = await Task.findById(value.taskId);
        if (!task) {
            return res.status(404).json("Task not found");
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const { error, value } = getTaskSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const task = await Task.findByIdAndDelete(value.taskId);
        if (!task) {
            return res.status(404).json("Task not found");
        }

        return res.status(200).json("Successfully deleted task.");
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const updateTask = asyncHandler(async (req, res) => {
    try {
        const { error, value } = updateTaskSchema.validate({
            taskId: req.params.taskId,
            task: req.body.task,
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = value.taskId;
        const body = value.task;

        const editTask = await Task.findOneAndUpdate(
            { _id: id },
            { task: body },
        );

        if (!editTask) {
            return res.status(404).json("Task not found");
        }

        const updatedTask = await Task.findById(id);
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const completeTask = asyncHandler(async (req, res) => {
    try {
        const { error, value } = completeTaskSchema.validate(req.params);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = value.taskId;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json("Task not found");
        }

        const toggle = await Task.findOneAndUpdate(
            { _id: id },
            { completed: !task.completed },
        );

        return res.status(200).json(toggle);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const updateTaskDueDate = asyncHandler(async (req, res) => {
    try {
        const { error, value } = updateTaskDueSchema.validate({
            taskId: req.params.taskId,
        });

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = value.taskId;
        const { dueDate } = req.body;

        const updateTaskDate = await Task.findByIdAndUpdate(
            { _id: id },
            { dueDate },
        );

        if (!updateTaskDate) {
            return res.status(404).json("Task not found");
        }

        const updatedTask = await Task.findById(id);
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const updateTaskPriority = asyncHandler(async (req, res) => {
    try {
        const { error, value } = updateTaskPrioritySchema.validate({
            taskId: req.params.taskId,
            priority: req.body.priority,
        });

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { taskId, priority } = value;

        const updatePriority = await Task.findOneAndUpdate(
            { _id: taskId },
            { priority: priority || null },
        );

        if (!updatePriority) {
            return res.status(400).json("Task not found.");
        }

        const updatedTask = await Task.findById(taskId);
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const archiveTask = asyncHandler(async (req, res) => {
    try {
        const { error, value } = getTaskSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = value.taskId;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json("Task not found");
        }

        const taskToArchive = await Task.findOneAndUpdate(
            { _id: id },
            { archived: !task.archived },
        );

        return res.status(200).json(taskToArchive);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

export const purgeTasks = asyncHandler(async (req, res) => {
    try {
        await Task.deleteMany({ user: req.user._id });

        return res.status(200).json("All tasks have been purged.");
    } catch (error) {
        return res.status(500).json(error.message);
    }
});