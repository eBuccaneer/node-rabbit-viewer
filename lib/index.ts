import http = require("http");
import path = require("path");
import express = require("express");
import { BasicRoutes } from "./routes/basic";

class NodeRabbitViewer {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "./views"));
        const apiRouter: express.Router = express.Router();
        BasicRoutes.filePath = <string>(process.env.VIEWER_PATH ? process.env.VIEWER_PATH : "./rabbitmq.json");
        BasicRoutes.applyTo(apiRouter);
        this.app.use("/", apiRouter);
        http.createServer(this.app).listen(process.env.VIEWER_PORT ? process.env.VIEWER_PORT : 8880);
    }

}

const server = new NodeRabbitViewer();