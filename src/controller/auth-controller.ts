import { Request, Response } from "express";
import AuthRepository from "../repository/auth-repository";
import { UserRepository } from "../repository/user-repository";
import admin from "firebase-admin"

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
            const { email } = req.body

            const user = await this.authRepository.getUserByEmail(email)
            if (!user) {
                res.status(401).json({ message: "Wrong credential" })
                return;
            }
            const token = await admin.auth().createCustomToken(user.uid);
            res.status(200).json({ message: "Login successfull", data: token })
        } catch (error) {
            res.status(500).json({ message: "Login failed", error })
        }
    }
    public register = async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body

            let userRecord = await this.authRepository.getUserByEmail(email)
            if (!userRecord) {
                userRecord = await this.authRepository.createUser(email, password, name)
            }
            const user = await this.userRepository.createUser(userRecord.uid, email, name)
            res.status(201).json({ message: "User created successfully", data: user })
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error })
        }
    }

}

