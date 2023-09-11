import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token: any;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);

            res.status(401);
            throw new Error("Not authorized, token verification failed.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token provided.");
    }
};

export default protect;