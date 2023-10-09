import { Command } from "commander";
import keytar from "keytar";
import { promptNewTask, promptPriorityChoice, promptDueDate } from "../../helpers/index.js";
import { TaskAPI } from "../../api/index.js";

const createCommand = new Command()
    .name("create")
    .description("Create a task")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");

            const taskName = await promptNewTask();
            const priorityChoice = await promptPriorityChoice();
            const dueDate = await promptDueDate();

            const newTask = await TaskAPI.createTask(taskName, priorityChoice, dueDate, token);
            if (newTask) {
                console.log(`Successfully created new task '${newTask.task}'!`);
            } else {
                console.log("An error occured trying to create a task.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default createCommand;