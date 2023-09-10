import keytar from "keytar";
import clear from "clear";
import { input, select } from "@inquirer/prompts";
import inquirer from "inquirer";
import moment from "moment";
import { handleLogout, handleLogin } from "./auth.js";
import { emailRegex } from "./regex.js";
import { isValidDate } from "./validate.js";
import { TaskAPI, UserAPI } from "../../../common/src/index.js";

export const isAuthenticated = async () => {
    const token = await keytar.getPassword("tasks", "token");
    return !!token;
};

export const promptLogin = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "email",
            message: "Enter your email:",
            validate: (value) => {
                if (!value) {
                    return "Please provide an email!";
                }

                const validateEmail = emailRegex.test(value);
                return validateEmail || "Please enter a valid email address!";
            }
        },
        {
            type: "password",
            name: "password",
            message: "Enter your password:",
            mask: "•",
        }
    ]).then(async (credentials) => {
        try {
            const { email, password } = credentials;

            const response = await UserAPI.login(email, password);
            if (response && response._id && response.token) {
                const userId = response._id;
                const token = response.token;

                await keytar.setPassword("users", "userId", userId);
                await keytar.setPassword("tasks", "token", token);

                handleLogin();
                setTimeout(() => {
                    promptMainMenu();
                }, 500);
            }
        } catch (error) {
            console.error(error);
        }
    });
};

export const promptMainMenu = async () => {
    clear();

    const choice = await select({
        message: "Command Navigation",
        choices: [
            {
                name: "Log Out",
                value: "logout",
            }
        ],
    });

    switch (choice) {
        case "logout":
            handleLogout();
            break;
    }
};

export const getUserProfile = async () => {
    const token = await keytar.getPassword("tasks", "token");
    const data = await UserAPI.getUserProfile(token);

    return data;
};

export const formatDueDate = (date) => {
    return moment.utc(date).format("ddd MMM DD");
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
    const token = await keytar.getPassword("tasks", "token");
    const tasks = await TaskAPI.getTasks(token);
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
    const token = await keytar.getPassword("tasks", "token");
    const taskName = await promptNewTask();
    const priorityChoice = await promptPriorityChoice();
    const taskDueDate = await promptDueDate();

    const newTask = await TaskAPI.createTask(taskName, priorityChoice, taskDueDate, token);
    return {
        data: newTask,
        name: taskName,
    };
};