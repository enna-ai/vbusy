import Joi from "joi";

export const createTaskSchema = Joi.object({
    task: Joi.string().required(),
    priority: Joi.string().valid("low", "medium", "high"),
});

export const getTaskSchema = Joi.object({
    taskId: Joi.string().required(),
});

export const updateTaskSchema = Joi.object({
    taskId: Joi.string().required(),
    task: Joi.string().required(),
});

export const completeTaskSchema = Joi.object({
    taskId: Joi.string().required(),
});

export const updateTaskPrioritySchema = Joi.object({
    taskId: Joi.string().required(),
    priority: Joi.string().valid("low", "medium", "high"),
});

export const updateTaskDueSchema = Joi.object({
    taskId: Joi.string().required(),
});