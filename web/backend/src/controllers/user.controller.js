/* eslint-disable no-underscore-dangle */
import asyncHandler from "express-async-handler";
import User from "../database/models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists.");
        }

        const user = await User.create({ username, email, password });
        if (user) {
            generateToken(res, user._id);

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data.");
        }
    } catch (error) {
        console.error(error);
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && await user.matchPassword(password)) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        console.error(error);
    }
});

export const logoutUser = asyncHandler(async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.error(error);
    }
});