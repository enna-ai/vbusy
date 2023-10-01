import { Request, Response, NextFunction, Router } from "express";
import { Controller } from "../interfaces/controller";
import Activity from "../models/activity.model";
import protect from "../middleware/auth";

class ActivityController implements Controller {
    public path = "/api/v1/activity";
    public router = Router();
    private activityModel = Activity;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:userId`, protect, this.getRecentActivity);
    }

    private getRecentActivity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;

            const activities = await this.activityModel.find({ user: userId });
            return res.status(200).json(activities);
        } catch (error: any) {
            return res.status(500).send({ error: error.message });
        }
    }
}

export default ActivityController;