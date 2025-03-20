"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", auth_middleware_1.authMiddleware, this.userController.getAllUsers);
        this.router.post("/", auth_middleware_1.authMiddleware, this.userController.createUser);
        this.router.put("/:id", auth_middleware_1.authMiddleware, this.userController.updateUser);
        this.router.delete("/:id", auth_middleware_1.authMiddleware, this.userController.deleteUser);
    }
}
exports.default = UserRoute;
