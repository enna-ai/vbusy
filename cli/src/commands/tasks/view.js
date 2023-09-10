import { Command } from "commander";
import chalk from "chalk";
import Table from "cli-table";
import keytar from "keytar";
import { getAllTasks, formatDueDate } from "../../helpers/helpers.js";
import { TaskAPI } from "../../../../common/src/index.js";

const viewCommand = new Command()
    .name("view")
    .description("Preview a task")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");
            const selectedTask = await getAllTasks("view");
            const tasks = await TaskAPI.getTask(selectedTask, token);
            const table = new Table({
                head: [chalk.cyan("Completed"), chalk.cyan("Task"), chalk.cyan("Priority"), chalk.cyan("Due")],
                colWidths: [10, 30, 8, 14],
                chars: {
                    "top": "", "top-mid": "", "top-left": "", "top-right": "",
                    "bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
                    "left": "", "left-mid": "", "mid": "", "mid-mid": "",
                    "right": "", "right-mid": "", "middle": " ",
                },
                style: { "padding-left": 0, "padding-right": 0, "compact": true },
            });

            const completed = tasks.completed ? chalk.green("[✔]") : "[ ]";
            const dueDate = tasks.dueDate ? formatDueDate(tasks.dueDate) : " ";

            const priority = {
                low: chalk.cyan("low"),
                medium: chalk.yellow("med"),
                high: chalk.red("high"),
            }[tasks.priority] || chalk.gray("N/A");

            table.push([completed, tasks.task, priority, dueDate]);

            console.log(table.toString());
        } catch (error) {
            console.error(error.message);
        }
    });

export default viewCommand;