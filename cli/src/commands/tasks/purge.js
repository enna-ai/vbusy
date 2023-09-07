import { Command } from "commander";
import { confirm } from "@inquirer/prompts";
import TaskAPI from "../../../../common/api.js";

const purgeCommand = new Command()
    .name("purge")
    .description("Purge all tasks")
    .action(async () => {
        try {
            const confirmed = await confirm({ message: "Are you sure you want to delete all tasks?" });
            if (confirmed) {
                const deleteAllTasks = await TaskAPI.purgeTasks();
                if (deleteAllTasks) {
                    console.log("Successfully deleted all tasks!");
                } else {
                    console.log("An error occured trying to delete all tasks.");
                }
            } else {
                console.log("An error occured trying to delete all tasks.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default purgeCommand;