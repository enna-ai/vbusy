import { Command } from "commander";
import { createNewTask } from "../../helpers/index.js";

const createCommand = new Command()
    .name("create")
    .description("Create a task")
    .action(async () => {
        try {
            const newTask = await createNewTask();
            if (newTask.data) {
                console.log(`Created new task '${newTask.name}'`);
            } else {
                console.log("An error occured trying to create a task.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default createCommand;