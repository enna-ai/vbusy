import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Controller } from "./interfaces/controller.js";
import { castErrorHandler, notFound } from "./middleware/index.js";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectDatabase();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Started server on port ${process.env.PORT || 8080}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initMiddleware() {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initErrorHandler() {
    this.app.use(notFound);
    this.app.use(castErrorHandler);
  }

  private initControllers(controllers: Controller[]) {
    for (const controller of controllers) {
      this.app.use("/", controller.router);
    }
  }

  private connectDatabase() {
    mongoose.connect(`${process.env.MONGODB_URI}`);
  }
}

export default App;
