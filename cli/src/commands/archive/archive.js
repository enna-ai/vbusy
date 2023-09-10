import { Command } from "commander";
import keytar from "keytar";
import { getAllTasks } from "../../helpers/helpers.js";
import { TaskAPI } from "../../../../common/src/index.js";

const archiveCommand = new Command()
    .name("archive")
    .description("Archive a task")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");
            const selectedTask = await getAllTasks("archive");
            const task = await TaskAPI.getTask(selectedTask, token);
            
            if (task.archived) {
                console.log(`${task.task} is already archived.`);
                return;
            }

            const taskToArchive = await TaskAPI.archiveTask(task._id, token);
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