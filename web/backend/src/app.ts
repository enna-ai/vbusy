import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { castErrorHandler, notFound } from "./middleware/index";
import { Controller } from "./interfaces/controller";

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandler();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Started server on port ${process.env.PORT || 4000}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddleware() {
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeErrorHandler() {
        this.app.use(notFound);
        this.app.use(castErrorHandler);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    private connectDatabase() {
        mongoose.connect(`${process.env.MONGODB_URI}`);
    };
}

export default App;