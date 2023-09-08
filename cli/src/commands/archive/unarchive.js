import { Command } from "commander";
import { getAllTasks } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const unarchiveCommand = new Command()
    .name("unarchive")
    .description("Unarchive a task")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("unarchive");
            const task = await TaskAPI.getTask(selectedTask);

            if (!task.archived) {
                console.log(`${task.task} is not archived.`);
                return;
            }

            const taskToUnarchive = await TaskAPI.archiveTask(task._id);
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