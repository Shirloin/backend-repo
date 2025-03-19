import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { SECRET_KEY } from "../config/env-config";
import { db } from "../config/firebase-config";
import admin from "firebase-admin"
import { UserRepository } from "../repository/user-repository";

const userRepository = new UserRepository()

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: Please login to access this resource" });
            return
        }
        const token = authHeader.split(" ")[1];

        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken || !decodedToken.uid) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return
        }
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: "Unauthorized", error });
        return
    }
}
