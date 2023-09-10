import keytar from "keytar";
import { isAuthenticated, promptMainMenu, promptLogin } from "./helpers.js";
import { UserAPI } from "../../../common/src/index.js";

export const handleLogin = async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
        const token = await keytar.getPassword("tasks", "token");
        const data = await UserAPI.getUserProfile(token);

        console.log(`🌱 Logged in as ${data.username}`);
        promptMainMenu();
    } else {
        promptLogin();
    }
};

export const handleLogout = async () => {
    console.log("Logging out... Cya! 🐝");

    setTimeout(async () => {
        await UserAPI.logout();
        await keytar.deletePassword("tasks", "token");

        process.exit(0);
    }, 200);
};