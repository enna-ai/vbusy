import { Request, Response, NextFunction, Router } from "express";
import { completeTaskSchema, createTaskSchema, getTaskSchema, updateTaskDueSchema, updateTaskPrioritySchema, updateTaskSchema } from "../validators/task";
import { Controller } from "../interfaces/controller";
import Task from "../models/task.model";
import protect from "../middleware/auth";

class TaskController implements Controller {
    public path = "/api/v1/tasks";
    public router = Router();
    private taskModel = Task;
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, protect, this.createTask);
        this.router.get(`${this.path}`, protect, this.getTasks);
        this.router.get(`${this.path}/:taskId`, protect, this.getTask);
        this.router.patch(`${this.path}/:taskId`, protect, this.updateTask);
        this.router.delete(`${this.path}/:taskId`, protect, this.deleteTask);
        this.router.delete(`${this.path}/:taskId/purge`, protect, this.purgeTasks);
        this.router.put(`${this.path}/:taskId/complete`, protect, this.completeTask);
        this.router.put(`${this.path}/:taskId/archive`, protect, this.archiveTask);
        this.router.put(`${this.path}/:taskId/due`, protect, this.updateTaskDueDate);
        this.router.put(`${this.path}/:taskId/priority`, protect, this.updateTaskPriority);
    }

    private createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = createTaskSchema.validate({
                task: req.body.task,
                priority: req.body.priority,
            });

            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }

            const date = req.body.dueDate;
            const { task, priority } = value;

            const newTask = new this.taskModel({
                user: req.user._id,
                task,
                priority,
                dueDate: date || null,
            });

            const saveTask = await newTask.save();

            return res.status(200).json(saveTask);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private getTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tasks = await this.taskModel.find({ user: req.user._id });
            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private getTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = getTaskSchema.validate(req.params);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }

            const task = await this.taskModel.findById(value.taskId);
            if (!task) {
                return res.status(404).send({ error: "Task not found." });
            }

            return res.status(200).json(task);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = getTaskSchema.validate(req.params);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
    
            const task = await this.taskModel.findByIdAndDelete(value.taskId);
            if (!task) {
                return res.status(404).send({ error: "Task not found" });
            }
    
            return res.status(200).json({ message: "Successfully deleted task!" });
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = updateTaskSchema.validate({
                taskId: req.params.taskId,
                task: req.body.task,
            });
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
    
            const id = value.taskId;
            const body = value.task;
    
            const editTask = await this.taskModel.findOneAndUpdate(
                { _id: id },
                { task: body },
            );
    
            if (!editTask) {
                return res.status(404).send({ error: "Task not found" });
            }
    
            const updatedTask = await this.taskModel.findById(id);
            return res.status(200).json(updatedTask);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private completeTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = completeTaskSchema.validate(req.params);
    
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
    
            const id = value.taskId;
    
            const task = await this.taskModel.findById(id);
            if (!task) {
                return res.status(404).send({ error: "Task not found" });
            }
    
            const toggle = await this.taskModel.findOneAndUpdate(
                { _id: id },
                { completed: !task.completed },
            );
    
            return res.status(200).json(toggle);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private updateTaskDueDate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = updateTaskDueSchema.validate({
                taskId: req.params.taskId,
            });
    
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
    
            const id = value.taskId;
            const { dueDate } = req.body;
    
            const updateTaskDate = await this.taskModel.findByIdAndUpdate(
                { _id: id },
                { dueDate },
            );
    
            if (!updateTaskDate) {
                return res.status(404).send({ error: "Task not found" });
            }
    
            const updatedTask = await this.taskModel.findById(id);
            return res.status(200).json(updatedTask);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private updateTaskPriority = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = updateTaskPrioritySchema.validate({
                taskId: req.params.taskId,
                priority: req.body.priority,
            });
    
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
    
            const { taskId, priority } = value;
    
            const updatePriority = await this.taskModel.findOneAndUpdate(
                { _id: taskId },
                { priority: priority || null },
            );
    
            if (!updatePriority) {
                return res.status(400).send({ error: "Task not found." });
            }
    
            const updatedTask = await this.taskModel.findById(taskId);
            return res.status(200).json(updatedTask);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private archiveTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = getTaskSchema.validate(req.params);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
    
            const id = value.taskId;
            const task = await this.taskModel.findById(id);
            if (!task) {
                return res.status(404).send({ error: "Task not found" });
            }
    
            const taskToArchive = await this.taskModel.findOneAndUpdate(
                { _id: id },
                { archived: !task.archived },
            );
    
            return res.status(200).json(taskToArchive);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }

    private purgeTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.taskModel.deleteMany({ user: req.user._id });
    
            return res.status(200).json({ message: "Successfully purged tasks!" });
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }
};

export default TaskController;