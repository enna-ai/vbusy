import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import inquirer from "inquirer";
import { isValidDate } from "../helpers/validate.js";
import TaskAPI from "../../../common/api.js";

const updateCommand = new Command("update")
    .description("Update a task")
    .action(async () => {
        try {
            const tasks = await TaskAPI.getTasks();
            if (tasks.length === 0) {
                console.log("You haven't made any tasks.");
                return;
            }

            const taskOptions = tasks.map((task) => ({
                name: task.task,
                value: task._id,
                message: "Task to update",
            }));

            const { selectTask } = await inquirer.prompt({
                type: "list",
                name: "selectTask",
                message: "Select a task to update:",
                choices: taskOptions,
            });

            const updateOptions = await select({
                message: "Select an update option",
                choices: [
                    {
                        name: "Task",
                        value: "task",
                        description: "Edit tasks name",
                    },
                    {
                        name: "Due Date",
                        value: "dueDate",
                        description: "Update tasks due date",
                    },
                    {
                        name: "Priority",
                        value: "priority",
                        description: "Update tasks priority level",
                    },
                    {
                        name: "Completion",
                        value: "completed",
                        description: "Mark task as complete or incomplete",
                    },
                ],
            });

            switch (updateOptions) {
                case "task":
                    const taskName = await input({
                        message: "Enter new task name:",
                        validate: (value) => {
                            if (!value) {
                                return "Please provide a new task name!";
                            }

                            return true;
                        }
                    });

                    const editedTask = await TaskAPI.updateTask(selectTask, taskName);
                    if (editedTask) {
                        console.log(`Successfully edited tasks name to '${taskName}'`);
                    } else {
                        console.log("An error occured trying to edit task.");
                    }
                    break;
                case "priority":
                    const priorityChoice = await select({
                        message: "Select a task priority",
                        choices: [
                            {
                                name: "low",
                                value: "low",
                                description: "Task is of low priority",
                            },
                            {
                                name: "medium",
                                value: "medium",
                                description: "Task is of medium priority",
                            },
                            {
                                name: "high",
                                value: "high",
                                description: "Task is of high priority",
                            }
                        ]
                    });

                    const editedPriority = await TaskAPI.updateTaskPriority(selectTask, priorityChoice);
                    if (editedPriority) {
                        console.log(`Successfully edited tasks priority to ${priorityChoice}`);
                    } else {
                        console.log("An error occured trying to edit task.");
                    }
                    break;
                case "dueDate":
                    let taskDate;
                    
                    await input({
                        message: "Enter a due date (YYYY-MM-DD):",
                        validate: async (value) => {
                            if (!value) {
                                taskDate = null;
                                return true;
                            }

                            const validateDate = await isValidDate(value);
                            if (!validateDate) {
                                return "Please provide a valid date format! (YYYY-MM-DD)";
                            }

                            taskDate = value;
                            return true;
                        }
                    });

                    const editedDate = await TaskAPI.updateTaskDueDate(selectTask, taskDate);
                    if (editedDate) {
                        console.log(`Successfully edited tasks due date to ${taskDate}`);
                    } else {
                        console.log("An error occured trying to update task.");
                    }
                    break;
                case "completed":
                    const editedComplete = await TaskAPI.completeTask(selectTask);
                    if (editedComplete) {
                        console.log(`Successfully marked task as ${editedComplete ? "complete" : "incomplete"}`);
                    } else {
                        console.log("An error occured trying to edit task.");
                    }
                    break;
            };
        } catch (error) {
            console.error(error.message);
        }
    });

export default updateCommand;