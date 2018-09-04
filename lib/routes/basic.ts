import { NextFunction, Request, Response, Router } from "express";
import fs = require("fs");
import Parser from "../utils/parser";

export class BasicRoutes {

    public static filePath = "./rabbitmq.json";

    /**
     * Applies all REST user routes
     */
    public static applyTo = (router: Router) => {
        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            const parsedData = Parser.parse(BasicRoutes.filePath);
            res.render("pages/index", {
                allRequests: parsedData.allRequests,
                allConsumes: parsedData.allConsumes
            });
        });

        router.get("/perService", (req, res) => {
            const parsedData = Parser.parse(BasicRoutes.filePath);
            res.render("pages/perService", {
                services: parsedData.services
            });
        });

        router.get("/models", (req, res) => {
            const parsedData = Parser.parse(BasicRoutes.filePath);
            res.render("pages/models", {
                models: parsedData.models,
                singleModel: undefined,
                singleModelName: undefined
            });
        });

        router.get("/models/:name", (req, res) => {
            const parsedData = Parser.parse(BasicRoutes.filePath);
            const modelName: string = req.params.name;
            res.render("pages/models", {
                models: parsedData.models,
                singleModel: parsedData.models[modelName],
                singleModelName: modelName
            });
        });
    };

}