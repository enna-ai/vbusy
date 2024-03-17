import "dotenv/config";
import App from "./app.js";
import ActivityController from "./controllers/activity.js";
import LabelController from "./controllers/label.js";
import PublicController from "./controllers/public.js";
import TaskController from "./controllers/task.js";
import UserController from "./controllers/user.js";

const app = new App([new ActivityController(), new LabelController(), new PublicController(), new TaskController(), new UserController()]);

app.listen();
