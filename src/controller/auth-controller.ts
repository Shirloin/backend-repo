import { Request, Response } from "express";
import admin from "firebase-admin";
import { auth, db } from "../config/firebase-config";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/env-config";
import AuthRepository from "../repository/auth-repository";
import { UserRepository } from "../repository/user-repository";

export default class AuthController {

    private authRepository: AuthRepository
    private userRepository: UserRepository
    constructor() {
        this.authRepository = new AuthRepository()
        this.userRepository = new UserRepository()
    }

    public validate = async (req: Request, res: Response) => {
        res.status(200)
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await this.authRepository.getUserByEmail(email)
            if (!user) {
                res.status(401).json({ message: "Wrong credential" })
                return;
            }
            const token = jwt.sign(
                { id: user.uid },
                SECRET_KEY || "secret_key",
                { expiresIn: 86400 }
            )
            res.status(200).json({ message: "Login successfull", token })
        } catch (error) {
            res.status(500).json({ message: "Login failed", error })
        }
    }
    public register = async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body

            const userRecord = await this.authRepository.createUser(email, password, name)
            await this.userRepository.createUser(userRecord.uid, email, name)
            res.status(201).json({ message: "User created successfully" })
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error })
        }
    }

}

