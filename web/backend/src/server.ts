import "dotenv/config";
import App from "./app";
import TaskController from "./controllers/task.controller";
import UserController from "./controllers/user.controller";

const app = new App([new TaskController(), new UserController()]);

app.listen();