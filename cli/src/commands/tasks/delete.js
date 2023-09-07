import { Command } from "commander";
import { confirm } from "@inquirer/prompts";
import { getAllTasks } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const deleteCommand = new Command()
    .name("delete")
    .description("Delete a task")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("delete");

            const confirmed = await confirm({ message: "Are you sure you want to delete this task?" });
            if (confirmed) {
                const taskToDelete = await TaskAPI.deleteTask(selectedTask);
                if (taskToDelete) {
                    console.log("Successfully deleted task!");
                } else {
                    console.log("An error occured trying to delete a task.");
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default deleteCommand;