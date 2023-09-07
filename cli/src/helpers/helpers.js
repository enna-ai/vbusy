import { input, select } from "@inquirer/prompts";
import inquirer from "inquirer";
import day from "dayjs";
import { isValidDate } from "./validate.js";
import TaskAPI from "../../../common/api.js";

export const formatDueDate = (date) => {
    return day(date).format("ddd MMM DD");
};

export const promptNewTask = async () => {
    const taskName = await input({
        message: "Enter a new task:",
        validate: (value) => {
            if (!value) {
                return "Please provide a task!";
            }

            return true;
        }
    });

    return taskName;
};

export const promptUpdateChoice = async () => {
    const updateChoices = await select({
        message: "Select an update option",
        choices: [
            {
                name: "Task",
                value: "task",
                description: "Edit tasks name",
            },
            {
                name: "Due Date",
                value: "dueDate",
                description: "Update tasks due date",
            },
            {
                name: "Priority",
                value: "priority",
                description: "Update tasks priority level",
            },
            {
                name: "Completion",
                value: "completed",
                description: "Mark task as complete or incomplete",
            },
        ],
    });

    return updateChoices;
};

export const promptPriorityChoice = async () => {
    const choices = await select({
        message: "Select a task priority",
        choices: [
            {
                name: "low",
                value: "low",
                description: "Task is of low priority",
            },
            {
                name: "medium",
                value: "medium",
                description: "Task is of medium priority",
            },
            {
                name: "high",
                value: "high",
                description: "Task is of high priority",
            }
        ]
    });

    return choices;
};

export const promptDueDate = async () => {
    const taskDateInput = await input({
        message: "Enter a due date (YYYY-MM-DD):",
        validate: async (value) => {
            if (!value) {
                return true;
            }

            const validateDate = await isValidDate(value);
            if (!validateDate) {
                return "Please provide a valid date format! (YYYY-MM-DD)";
            }

            return true;
        }
    });

    return taskDateInput;
};

export const getAllTasks = async (action) => {
    const tasks = await TaskAPI.getTasks();
    if (tasks.length === 0) {
        console.log("You haven't made any tasks.");
        return;
    }

    const taskOptions = tasks.map((task) => ({
        name: task.task,
        value: task._id,
    }));

    const { selectTask } = await inquirer.prompt({
        type: "list",
        name: "selectTask",
        message: `Select a task to ${action}:`,
        choices: taskOptions,
    });

    return selectTask;
};

export const createNewTask = async () => {
    const taskName = await promptNewTask();
    const priorityChoice = await promptPriorityChoice();
    const taskDueDate = await promptDueDate();

    const newTask = await TaskAPI.createTask(taskName, priorityChoice, taskDueDate);
    return {
        data: newTask,
        name: taskName,
    };
};