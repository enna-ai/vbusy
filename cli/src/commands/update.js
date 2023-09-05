import { Command } from "commander";
import { getAllTasks, promptUpdateChoice, promptDueDate, promptNewTask, promptPriorityChoice } from "../helpers/index.js";
import TaskAPI from "../../../common/api.js";

const updateCommand = new Command("update")
    .description("Update a task")
    .action(async () => {
        try {
            const selectedTask = await getAllTasks("update");

            const updateChoice = await promptUpdateChoice();

            switch (updateChoice) {
                case "task":
                    const taskName = await promptNewTask();
                    
                    const updateTaskName = await TaskAPI.updateTask(selectedTask, taskName);
                    if (updateTaskName) {
                        console.log(`Successfully updated task name to '${taskName}'`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                case "priority":
                    const taskPriority = await promptPriorityChoice();

                    const updateTaskPriority = await TaskAPI.updateTaskPriority(selectedTask, taskPriority);
                    if (updateTaskPriority) {
                        console.log(`Successfully edited tasks priority level to ${taskPriority}`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                case "dueDate":
                    const taskDueDate = await promptDueDate();

                    const updateTaskDate = await TaskAPI.updateTaskDueDate(selectedTask, taskDueDate);
                    if (updateTaskDate) {
                        console.log(`Successfully edited tasks due date to ${taskDueDate ? taskDueDate : "no date"}`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                case "completed":
                    const toggleComplete = await TaskAPI.completeTask(selectedTask);
                    if (toggleComplete) {
                        console.log(`Successfully marked task as '${toggleComplete ? "complete" : "incomplete"}'`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                default:
                    console.log("Invalid choice.");
                    return;
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default updateCommand;