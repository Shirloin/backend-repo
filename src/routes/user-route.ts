import { Router } from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import UserController from "../controller/user-controller"


export default class UserRoute {
    public router: Router
    private userController: UserController
    constructor() {
        this.router = Router()
        this.userController = new UserController()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get("/", authMiddleware, this.userController.getAllUsers)
        this.router.post("/", authMiddleware, this.userController.createUser)
        this.router.put("/:id", authMiddleware, this.userController.updateUser)
        this.router.delete("/:id", authMiddleware, this.userController.deleteUser)
    }
}