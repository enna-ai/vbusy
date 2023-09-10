import keytar from "keytar";
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
import Table from "cli-table";
import { input, select } from "@inquirer/prompts";
import inquirer from "inquirer";
import moment from "moment";
import { handleLogout, handleLogin } from "./auth.js";
import { isValidDate, isValidEmail } from "./validate.js";
import { TaskAPI, UserAPI } from "../../../common/src/index.js";

export const promptLogin = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "email",
            message: "Enter your email:",
            validate: async (value) => {
                if (!value) {
                    return "Please provide an email!";
                }

                const validateEmail = await isValidEmail(value);
                if (!validateEmail) {
                    return "Please provide a valid email address!";
                }

                return validateEmail;
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
        pageSize: 3,
        choices: [
            { name: "Info", value: "info" },
            { name: "Cmds", value: "cmds" },
            { name: "Settings", value: "settings" },
            { name: "Log Out", value: "logout" },
        ],
    });

    switch (choice) {
        case "logout":
            handleLogout();
            break;
        case "info":
            figlet.text("vbusy", (error, data) => {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(chalk.yellow.bold(data));
            });

            console.log(`An efficient task manager: Your shortcut to 'V'ery easy task management.`);
            break;
        case "cmds":
            console.log("✨ Commands List");
            const commands = await keytar.getPassword("cmdList", "cmds");
            const cmds = JSON.parse(commands);

            const table = new Table({
                head: [chalk.bgBlue.black(" Name "), chalk.bgBlue.black(" Description ")],
                colWidths: [20, 50],
                chars: {
                    "top": "", "top-mid": "", "top-left": "", "top-right": "",
                    "bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
                    "left": "", "left-mid": "", "mid": "", "mid-mid": "",
                    "right": "", "right-mid": "", "middle": " ",
                },
                style: { "padding-left": 0, "padding-right": 0, "compact": true },
            });

            for (const cmd of cmds) {
                table.push([`${chalk.blue("•")} ${cmd.name}`, cmd.description]);
            }

            console.log(table.toString());
            break;
        case "settings":
            console.log("settings page");
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