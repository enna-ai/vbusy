import express, { Request, Response, NextFunction, Router } from "express";
import { Controller } from "../interfaces/controller.js";
import Task from "../models/task.js";
import User from "../models/user.js";

class VbusyController implements Controller {
    public path = "/api/v1/vbusy";
    public router: express.Router = Router();
    private taskModel = Task;
    private userModel = User;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/tasks/:userId`, this.getUserTasksData)
        this.router.get(`${this.path}/profile/:userId`, this.getUserProfileData);
    }

    private getUserTasksData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;

            const tasks = await this.taskModel.find({ user: userId });
            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(500).send({ error: "Internal server error" });
        }
    }

    private getUserProfileData = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.params.userId;

        const profile = await this.userModel.find({ _id: userId });
        return res.status(200).json(profile);
      } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
      }
    }
}

export default VbusyController;
