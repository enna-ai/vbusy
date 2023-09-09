/* eslint-disable prefer-destructuring */
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../database/models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
    // const token = req.cookies.jwt;
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);
        }
    }

    if (!token) {
        res.status(401);

        throw new Error("Not authorized, no token provided.");
    }
    // if (token) {
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //         req.user = await User.findById(decoded.userId).select("-password");

    //         next();
    //     } catch (error) {
    //         console.error(error);
    //         res.status(401);

    //         throw new Error("Not authorized, invalid token.");
    //     }
    // } else {
    //     res.status(401);
    //     throw new Error("Not authorized.");
    // }
});

export default protect;