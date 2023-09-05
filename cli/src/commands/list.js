import { Command } from "commander";
import TaskAPI from "../../../common/api.js";

const createCommand = new Command("list")
    .description("Get all tasks")
    .action(async () => {
        try {
            const tasks = await TaskAPI.getTasks();
            // const taskList = tasks.map((task) => ({
            //     name: `${task.task}`,
            //     value: task._id,
            // }));

            if (tasks.length === 0) {
                console.log("You haven't made any tasks.");
                return;
            }

            console.log("Task List");
            tasks.forEach((task) => {
                console.log(`- ${task.task}`);
            });
        } catch (error) {
            console.error(error.message);
        }
    });

export default createCommand;