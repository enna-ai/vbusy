import keytar from "keytar";
import { UserAPI } from "../../../common/src/index.js";

export const isAuthenticated = async () => {
    const token = await keytar.getPassword("tasks", "token");
    return !!token;
};

export const handleLogin = async () => {
    const token = await keytar.getPassword("tasks", "token");
    const data = await UserAPI.getUserProfile(token);

    console.log(`🌱 Logged in as ${data.username}`);
};

export const handleLogout = async () => {
    console.log("Logging out... Cya! 🐝");

    try {
        await UserAPI.logout();
        await keytar.deletePassword("tasks", "token");
    } catch (error) {
        console.error("Error during logout:", error);
    }

    process.exit(0);
};