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
const auth_repository_1 = __importDefault(require("../repository/auth-repository"));
const user_repository_1 = require("../repository/user-repository");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class AuthController {
    constructor() {
        this.validate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield this.authRepository.getUserByEmail(email);
                if (!user) {
                    res.status(401).json({ message: "Wrong credential" });
                    return;
                }
                const token = yield firebase_admin_1.default.auth().createCustomToken(user.uid);
                res.status(200).json({ message: "Login successfull", data: token });
            }
            catch (error) {
                res.status(500).json({ message: "Login failed", error });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = req.body;
                let userRecord = yield this.authRepository.getUserByEmail(email);
                if (!userRecord) {
                    userRecord = yield this.authRepository.createUser(email, password, name);
                }
                const user = yield this.userRepository.createUser(userRecord.uid, email, name);
                res.status(201).json({ message: "User created successfully", data: user });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating user", error });
            }
        });
        this.authRepository = new auth_repository_1.default();
        this.userRepository = new user_repository_1.UserRepository();
    }
}
exports.default = AuthController;
