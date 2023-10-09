import { Request, Response, NextFunction, Router } from "express";
import { Controller } from "../interfaces/controller";
import protect from "../middleware/auth";
import User from "../models/user.model";
import Task from "../models/task.model";
import generateToken from "../utils/generateToken";

class UserController implements Controller {
    public path = "/api/v1/users";
    public router = Router();
    private userModel = User;
    private taskModel = Task;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getHello);
        this.router.post(`${this.path}/register`, this.registerUser);
        this.router.post(`${this.path}/login`, this.loginUser);
        this.router.post(`${this.path}/logout`, this.logoutUser);
        this.router.get(`${this.path}/profile`, protect, this.getUserProfile);
        this.router.patch(`${this.path}/settings`, protect, this.updateUserProfile);
        this.router.delete(`${this.path}/:userId`, protect, this.deleteUser);
    }

    private getHello = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({ msg: "Hello World!" });
    }

    private registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, password } = req.body;

            const userExists = await this.userModel.findOne({ email });
            if (userExists) {
                res.status(400).send({ error: "User already exists." });
            }

            const user = await this.userModel.create({ username, email, password });
            if (user) {
                res.status(201).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400).send({ error: "Invalid user data." });
            }
        } catch (error) {
            console.error(error);
        }
    }

    private loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await this.userModel.findOne({ email });
            if (user && await user.matchPassword(password)) {
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id)
                });
            } else {
                res.status(401).send({ error: "Invalid email or password" });
            }
        } catch (error) {
            console.error(error);
        }
    }

    private logoutUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("jwt", "", {
                httpOnly: true,
                expires: new Date(0),
            });

            res.status(200).json({ message: "Logged out." });
        } catch (error) {
            console.error(error);
        }
    }

    private getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userModel.findById(req.user._id);
            if (user) {
                const tasks = await this.taskModel.find({ user: user._id });
                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    tasks,
                });
            } else {
                res.status(404).send({ error: "User not found." });
            }
        } catch (error) {
            console.error(error);
        }
    }

    private updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, username, password } = req.body;
            if (!password) {
                return res.status(400).send({ error: "Password is required to change your username." });
            }
            const user = await this.userModel.findOne({ email });
            if (user && await user.matchPassword(password)) {
                const exists = await this.userModel.findOne({ username });
                if (exists) {
                    return res.status(400).send({ error: "Username already exists!" });
                }

                user.username = req.body.username;
                user.password = req.body.password;
                const updatedUser = await user.save();

                res.json({
                    _id: updatedUser._id,
                    username: updatedUser.username,
                });
            } else {
                res.status(401).send({ error: "Invalid password" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal server error" });
        }
    }

    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const user = await this.userModel.findOneAndDelete({ _id: userId });
            if (!user) {
                return res.status(404).send({ error: "User not found." });
            }

            return res.status(200).json({ message: "Successfully deleted account!" });
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserController;