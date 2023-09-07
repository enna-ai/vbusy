import { Command } from "commander";
import { getAllTasks } from "../helpers/helpers.js";
import TaskAPI from "../../../common/api.js";

const archiveCommand = new Command("archive")
    .description("Archive a task")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("archive");
            
            const taskToArchive = await TaskAPI.archiveTask(selectedTask);
            if (taskToArchive) {
                console.log("Successfully archived task!");
            } else {
                console.log("An error occured trying to archive a task.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default archiveCommand;