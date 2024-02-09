import express, { Request, Response, NextFunction, Router } from "express";
import { Controller } from "../interfaces/controller.js";
import Task from "../models/task.js";

class VbusyController implements Controller {
    public path = "/api/v1/vbusy";
    public router: express.Router = Router();
    private taskModel = Task;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:userId`, this.getUserData)
    }

    private getUserData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;

            const tasks = await this.taskModel.find({ user: userId });
            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }
}

export default VbusyController;
