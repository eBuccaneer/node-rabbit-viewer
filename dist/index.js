"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const path = require("path");
const express = require("express");
const basic_1 = require("./routes/basic");
class NodeRabbitViewer {
    constructor() {
        this.app = express();
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "./views"));
        const apiRouter = express.Router();
        basic_1.BasicRoutes.filePath = (process.env.VIEWER_PATH ? process.env.VIEWER_PATH : "./config/rabbitmq.json");
        basic_1.BasicRoutes.applyTo(apiRouter);
        this.app.use("/", apiRouter);
        http.createServer(this.app).listen(process.env.VIEWER_PORT ? process.env.VIEWER_PORT : 8880);
    }
}
const server = new NodeRabbitViewer();
