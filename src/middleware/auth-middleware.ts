import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin"


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
