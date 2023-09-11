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
        this.router.post(`${this.path}/register`, this.registerUser);
        this.router.post(`${this.path}/login`, this.loginUser);
        this.router.post(`${this.path}/logout`, this.logoutUser);
        this.router.get(`${this.path}/profile`, protect, this.getUserProfile);
        this.router.get(`${this.path}/settings`, protect, this.updateUserProfile);
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
            const user = await this.userModel.findById(req.user._id);
            if (user) {
                user.username = req.body.username || user.username;
                user.email = req.body.email || user.email;
    
                if (req.body.password) {
                    user.password = req.body.password;
                }
    
                const updatedUser = await user.save();
    
                res.json({
                    _id: updatedUser._id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                });
            } else {
                res.status(404).send({ error: "User not found." });
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserController;