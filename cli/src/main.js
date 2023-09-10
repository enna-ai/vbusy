import fs from "fs";
import keytar from "keytar";
import { Command } from "commander";
import { handleLogin, promptMainMenu, isAuthenticated, promptLogin } from "./helpers/index.js";
import figlet from "figlet";
import * as Commands from "./commands/index.js";

const program = new Command();
program.version("1.0.0");

const modules = Object.values(Commands);

for (const module of modules) {
    program.addCommand(module.default);
}

const cmds = program.commands.map((cmd) => ({
    name: cmd.name(),
    description: cmd.description() || "No description provided",
}));

const jsonCmds = JSON.stringify(cmds);

keytar.setPassword("cmdList", "cmds", jsonCmds);

fs.readFile("src/bee.txt", "utf8", (err, bee) => {
    if (err) {
        console.error(err);
        return;
    }

    isAuthenticated().then(async (authenticated) => {
        if (!authenticated) {
            console.log(bee);
            promptLogin();
        } else {
            if (process.argv.length > 2) {
                program.parse(process.argv);
            } else {
                handleLogin();
                setTimeout(() => {
                    promptMainMenu();
                }, 500);
            }
        }
    });

    figlet.text("vbusy", (error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        // console.log(chalk.yellowBright.bold(data));
    });
});