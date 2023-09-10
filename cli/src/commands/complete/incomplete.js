import { Command } from "commander";
import keytar from "keytar";
import { getAllTasks } from "../../helpers/helpers.js";
import { TaskAPI } from "../../../../common/src/index.js";

const incompleteCommand = new Command()
    .name("incomplete")
    .description("Mark a task as incomplete")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");
            const selectedTask = await getAllTasks("incomplete");
            const task = await TaskAPI.getTask(selectedTask, token);
            
            if (!task.completed) {
                console.log(`${task.task} is is not marked as complete.`);
                return;
            }

            await TaskAPI.completeTask(selectedTask, token);
            console.log(`Successfully marked '${task.task}' as incomplete.`)
        } catch (error) {
            console.error(error.message);
        }
    });

export default incompleteCommand;