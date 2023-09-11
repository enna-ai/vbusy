import { Command } from "commander";
import keytar from "keytar";
import { getAllTasks } from "../../helpers/helpers.js";
import { TaskAPI } from "../../../../common/src/index.js";

const completeCommand = new Command()
    .name("complete")
    .description("Mark a task as complete")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");
            const selectedTask = await getAllTasks("complete", token);
            const task = await TaskAPI.getTask(selectedTask, token);
            
            if (task.completed) {
                console.log(`${task.task} is already marked as completed.`);
                return;
            }

            const completedTask = await TaskAPI.completeTask(selectedTask, token);
            if (completedTask) {
                console.log(`Successfully marked '${task.task}' as completed.`);
            } else {
                console.log("An error occured trying to mark task as complete.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default completeCommand;