import fs from "fs";
import { Command } from "commander";
import { handleLogin, promptMainMenu, isAuthenticated, promptLogin, handleLogout } from "./helpers/index.js";
import figlet from "figlet";
import * as Commands from "./commands/index.js";

const program = new Command();
program.version("1.0.0");

const modules = Object.values(Commands);

for (const module of modules) {
    program.addCommand(module.default);
}

fs.readFile("src/bee.txt", "utf8", (err, bee) => {
    if (err) {
        console.error(err);
        return;
    }

    figlet.text("vbusy", (error, data) => {
        if (error) {
            console.error(error);
            return;
        }

        // console.log(bee);
        // console.log(chalk.yellowBright.bold(data));

        isAuthenticated().then(async (authenticated) => {
            if (!authenticated) {
                promptLogin();
            } else {
                if (process.argv.length > 2) {
                    setTimeout(() => {
                        program.parse(process.argv);
                    }, 200);
                } else {
                    promptMainMenu().then(async (choice) => {
                        if (choice === "Log Out") {
                            await handleLogout();
                            return;
                        }
                    });
                }
            }
        });
    });
});