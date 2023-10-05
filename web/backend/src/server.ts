import "dotenv/config";
import App from "./app";
import TaskController from "./controllers/task.controller";
import UserController from "./controllers/user.controller";
import ActivityController from "./controllers/activity.controller";
import VbusyController from "./controllers/vbusy.controller";

const app = new App([new TaskController(), new UserController(), new ActivityController(), new VbusyController()]);

app.listen();