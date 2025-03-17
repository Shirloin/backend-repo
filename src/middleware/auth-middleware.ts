import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { SECRET_KEY } from "../config/env-config";
import { db } from "../config/firebase-config";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: No token" });
            return
        }
        const token = authHeader.split(" ")[1];
        const secret = SECRET_KEY || "secret_key"
        const payload = await new Promise<JwtPayload>((resolve, reject) => {
            jwt.verify(token, secret, (error, decoded) => {
                if (error) reject(error);
                else resolve(decoded as JwtPayload);
            });
        });

        const id = payload?.id;
        if (!id) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return
        }

        const userRef = db.collection("USERS").doc(id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: "Unauthorized", error });
        return
    }
}
