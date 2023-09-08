import { Command } from "commander";
import { getAllTasks } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const completeCommand = new Command()
    .name("complete")
    .description("Mark a task as complete")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("complete");
            const task = await TaskAPI.getTask(selectedTask);
            
            if (task.completed) {
                console.log(`${task.task} is already marked as completed.`);
                return;
            }

            await TaskAPI.completeTask(selectedTask);
            console.log(`Successfully marked '${task.task}' as completed.`)
        } catch (error) {
            console.error(error.message);
        }
    });

export default completeCommand;