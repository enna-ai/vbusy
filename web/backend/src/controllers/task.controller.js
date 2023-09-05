import Task from "../database/models/task.model.js";
import { getTaskSchema, createTaskSchema, updateTaskSchema, completeTaskSchema } from "../validators/task.js";

export const createTask = async (req, res) => {
    try {
        const { error, value } = createTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newTask = await Task.create({ task: value.task });
        await newTask.save();

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getTask = async (req, res) => {
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
};

export const deleteTask = async (req, res) => {
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
};

export const updateTask = async (req, res) => {
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
        console.log("Validator", body);

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
};

export const completeTask = async (req, res) => {
    try {
        const { error, value } = completeTaskSchema.validate(req.params);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = value.taskId;

        const toggle = await Task.findById(id);
        const task = await Task.findOneAndUpdate(
            { _id: id },
            { completed: !toggle.completed },
        );

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};