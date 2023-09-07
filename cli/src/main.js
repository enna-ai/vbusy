import { Command } from "commander";
import * as Commands from "./commands/index.js";

const program = new Command();
program.version("1.0.0");

const modules = Object.values(Commands);

for (const module of modules) {
    program.addCommand(module.default);
}

program.parse(process.argv);