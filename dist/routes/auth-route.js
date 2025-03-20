"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth-controller"));
const auth_middleware_1 = require("../middleware/auth-middleware");
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", auth_middleware_1.authMiddleware, this.authController.validate);
        this.router.post("/register", this.authController.register);
        this.router.post("/login", this.authController.login);
    }
}
exports.default = AuthRoute;
