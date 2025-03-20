import { Router } from "express"
import AuthController from "../controller/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export default class AuthRoute {
    public router: Router
    private authController: AuthController
    constructor() {
        this.router = Router()
        this.authController = new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get("/", authMiddleware, this.authController.validate)
        this.router.post("/register", this.authController.register)
        this.router.post("/login", this.authController.login)
    }
}