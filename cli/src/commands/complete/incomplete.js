import { Command } from "commander";
import { getAllTasks } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const incompleteCommand = new Command()
    .name("incomplete")
    .description("Mark a task as incomplete")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("incomplete");
            const task = await TaskAPI.getTask(selectedTask);
            
            if (!task.completed) {
                console.log(`${task.task} is is not marked as complete.`);
                return;
            }

            await TaskAPI.completeTask(selectedTask);
            console.log(`Successfully marked '${task.task}' as incomplete.`)
        } catch (error) {
            console.error(error.message);
        }
    });

export default incompleteCommand;