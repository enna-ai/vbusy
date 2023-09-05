import { Command } from "commander";
import listCommand from "./commands/list.js";
import createCommand from "./commands/create.js";

const program = new Command();
program.version("1.0.0");

program.addCommand(listCommand);
program.addCommand(createCommand);

program.parse(process.argv);