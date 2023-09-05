import { Command } from "commander";
import listCommand from "./commands/list.js";

const program = new Command();
program.version("1.0.0");

program.addCommand(listCommand);

program.parse(process.argv);