import { Command } from "commander";
import inquirer from "inquirer";
import TaskAPI from "../../../common/api.js";

const deleteCommand = new Command("delete")
    .description("Delete a task")
    .action(async () => {
        try {
            const tasks = await TaskAPI.getTasks();
            if (tasks.length === 0) {
                console.log("You haven't made any tasks.");
                return;
            }

            const taskOptions = tasks.map((task) => ({
                name: task.task,
                value: task._id,
                description: "Task to delete",
            }));

            const { selectTask } = await inquirer.prompt({
                type: "list",
                name: "selectTask",
                message: "Select a task to delete:",
                choices: taskOptions,
            });

            const taskToDelete = await TaskAPI.deleteTask(selectTask);
            if (taskToDelete) {
                console.log("Successfully deleted task!");
            } else {
                console.log("An error occured trying to delete task.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default deleteCommand;