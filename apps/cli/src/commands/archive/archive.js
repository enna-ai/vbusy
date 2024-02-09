import { Command } from "commander";
import keytar from "keytar";
import { getAllTasks } from "../../utils/helpers.js";
import { TaskAPI } from "../../api/index.js";

const unarchiveCommand = new Command()
    .name("unarchive")
    .description("Unarchive a task")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");
            const selectedTask = await getAllTasks("unarchive");
            const task = await TaskAPI.getTask(selectedTask, token);

            if (!task.archived) {
                console.log(`${task.task} is not archived.`);
                return;
            }

            const taskToUnarchive = await TaskAPI.archiveTask(task._id, token);
            if (taskToUnarchive) {
                console.log(`Successfully unarchived '${task.task}'`);
            } else {
                console.log(`An error occured trying to unarchive '${task.task}'`)
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default unarchiveCommand;
