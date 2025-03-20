"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const env_config_1 = require("../config/env-config");
const user_route_1 = __importDefault(require("../routes/user-route"));
const auth_route_1 = __importDefault(require("../routes/auth-route"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.env = env_config_1.NODE_ENV || "development";
        this.port = env_config_1.PORT || "3000";
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }));
        // this.app.use(cors({ origin: "*", credentials: true }));
        this.app.use(express_1.default.json());
    }
    initializeRoutes() {
        this.app.use("/auth", new auth_route_1.default().router);
        this.app.use("/users", new user_route_1.default().router);
    }
}
exports.app = new App().app;
// app.listen()
