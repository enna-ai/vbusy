import { Command } from "commander";
import keytar from "keytar";
import moment from "moment";
import { getAllTasks, promptUpdateChoice, promptDueDate, promptNewTask, promptPriorityChoice } from "../../helpers/index.js";
import { TaskAPI } from "../../../../common/src/index.js";

const updateCommand = new Command()
    .name("update")
    .description("Update a task")
    .action(async () => {
        try {
            const token = await keytar.getPassword("tasks", "token");
            const selectedTask = await getAllTasks("update");

            const updateChoice = await promptUpdateChoice();

            switch (updateChoice) {
                case "task":
                    const taskName = await promptNewTask();

                    const updateTaskName = await TaskAPI.updateTask(selectedTask, taskName, token);
                    if (updateTaskName) {
                        console.log(`Successfully updated task name to '${taskName}'`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                case "priority":
                    const taskPriority = await promptPriorityChoice();

                    const updateTaskPriority = await TaskAPI.updateTaskPriority(selectedTask, taskPriority, token);
                    if (updateTaskPriority) {
                        console.log(`Successfully edited tasks priority level to ${taskPriority}`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                case "dueDate":
                    const currentDate = Date.now();
                    const taskDueDate = await promptDueDate();

                    const dueDateValue = moment.utc(taskDueDate);
                    const daysBeforeDue = dueDateValue.diff(currentDate, "day");

                    if (daysBeforeDue <= 0) {
                        console.log("You can't set a due date past today!")
                    } else {
                        const updateTaskDate = await TaskAPI.updateTaskDueDate(selectedTask, taskDueDate, token);
                        if (updateTaskDate) {
                            console.log(`Successfully edited tasks due date to ${taskDueDate ? taskDueDate : "no date"}`);
                        } else {
                            console.log("An error occured trying to update task.");
                        }
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