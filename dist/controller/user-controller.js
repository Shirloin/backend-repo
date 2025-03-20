"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../repository/user-repository");
const auth_repository_1 = __importDefault(require("../repository/auth-repository"));
class UserController {
    constructor() {
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.getAllUsers();
                res.status(200).json({ message: "Users fetched successfully", data: users });
            }
            catch (error) {
                res.status(500).json({ message: "Fail to fetch user", data: error });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = req.body;
                const userRecord = yield this.authRepository.createUser(email, password, name);
                const newUser = yield this.userRepository.createUser(userRecord.uid, email, name);
                res.status(201).json({ message: "User created successfully", newUser });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error creating user", error });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userData = req.body;
                if (!id) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                const existingUser = yield this.userRepository.getUserById(id);
                if (!existingUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                const updatedUser = yield this.userRepository.updateUser(id, userData);
                yield this.authRepository.updateAuthUser(id, {
                    email: userData.email,
                    displayName: userData.name,
                });
                res.status(200).json({ message: "User updated successfully", data: updatedUser });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Fail to update user", error });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                const existingUser = yield this.userRepository.getUserById(id);
                if (!existingUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                this.userRepository.deleteUser(id);
                this.authRepository.deleteUser(id);
                res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Fail to delete user", error });
            }
        });
        this.userRepository = new user_repository_1.UserRepository();
        this.authRepository = new auth_repository_1.default();
    }
}
exports.default = UserController;
