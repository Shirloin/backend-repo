import { Request, Response } from "express";
import { UserRepository } from "../repository/user-repository";
import AuthRepository from "../repository/auth-repository";
import { User } from "shared/user";

export default class UserController {
    private userRepository: UserRepository
    private authRepository: AuthRepository

    constructor() {
        this.userRepository = new UserRepository()
        this.authRepository = new AuthRepository()
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepository.getAllUsers();
            res.status(200).json({ message: "Users fetched successfully", data: users });
        } catch (error) {
            res.status(500).json({ message: "Fail to fetch user", data: error });
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {

            const { email, password, name } = req.body
            const userRecord = await this.authRepository.createUser(email, password, name)
            const newUser = await this.userRepository.createUser(userRecord.uid, email, name)
            res.status(201).json({ message: "User created successfully", newUser })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error creating user", error })
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userData: Partial<User> = req.body;

            if (!id) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }

            const existingUser = await this.userRepository.getUserById(id);
            if (!existingUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const updatedUser = await this.userRepository.updateUser(id, userData);

            await this.authRepository.updateAuthUser(id, {
                email: userData.email,
                displayName: userData.name,
            });

            res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Fail to update user", error });
        }
    };
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            const existingUser = await this.userRepository.getUserById(id);
            if (!existingUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            this.userRepository.deleteUser(id)
            this.authRepository.deleteUser(id)
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Fail to delete user", error });
        }
    }
}