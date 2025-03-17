import express from "express"
import { NODE_ENV, PORT } from "../config/env-config"
import UserRoute from "../routes/user-route";
import AuthRoute from "../routes/auth-route";

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor() {
        this.app = express();
        this.env = NODE_ENV || "development";
        this.port = PORT || "3000";
        this.initializeMiddlewares()
        this.initializeRoutes()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        })
    }

    private initializeMiddlewares() {
        this.app.use(express.json())
    }

    private initializeRoutes() {
        this.app.use("/auth", new AuthRoute().router)
        this.app.use("/users", new UserRoute().router)
    }
}
const app = new App()
app.listen()