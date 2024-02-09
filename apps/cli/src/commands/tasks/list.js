import { Command } from "commander";
import { getUserTasks } from "../../utils/helpers.js";

const listCommand = new Command()
    .name("list")
    .description("Get all tasks")
    .action(async () => {
        try {
            await getUserTasks();
        } catch (error) {
            console.error(error.message);
        }
    });

export default listCommand;
