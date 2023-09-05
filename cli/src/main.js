import { Command } from "commander";
import listCommand from "./commands/list.js";
import createCommand from "./commands/create.js";
import deleteCommand from "./commands/delete.js";
import updateCommand from "./commands/update.js";

const program = new Command();
program.version("1.0.0");

program.addCommand(listCommand);
program.addCommand(createCommand);
program.addCommand(deleteCommand);
program.addCommand(updateCommand);

program.parse(process.argv);