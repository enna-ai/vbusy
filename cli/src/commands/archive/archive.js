import { Command } from "commander";
import { getAllTasks } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const archiveCommand = new Command()
    .name("archive")
    .description("Archive a task")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("archive");
            const task = await TaskAPI.getTask(selectedTask);
            
            if (task.archived) {
                console.log(`${task.task} is already archived.`);
                return;
            }

            const taskToArchive = await TaskAPI.archiveTask(task._id);
            if (taskToArchive) {
                console.log(`Successfully archived '${task.task}'`);
            } else {
                console.log(`An error occured trying to archive '${task.task}'.`);
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default archiveCommand;