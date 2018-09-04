"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../utils/parser");
class BasicRoutes {
}
BasicRoutes.filePath = "./rabbitmq.json";
/**
 * Applies all REST user routes
 */
BasicRoutes.applyTo = (router) => {
    router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const parsedData = parser_1.default.parse(BasicRoutes.filePath);
        res.render("pages/index", {
            allRequests: parsedData.allRequests,
            allConsumes: parsedData.allConsumes
        });
    }));
    router.get("/perService", (req, res) => {
        const parsedData = parser_1.default.parse(BasicRoutes.filePath);
        res.render("pages/perService", {
            services: parsedData.services
        });
    });
    router.get("/models", (req, res) => {
        const parsedData = parser_1.default.parse(BasicRoutes.filePath);
        res.render("pages/models", {
            models: parsedData.models,
            singleModel: undefined,
            singleModelName: undefined
        });
    });
    router.get("/models/:name", (req, res) => {
        const parsedData = parser_1.default.parse(BasicRoutes.filePath);
        const modelName = req.params.name;
        res.render("pages/models", {
            models: parsedData.models,
            singleModel: parsedData.models[modelName],
            singleModelName: modelName
        });
    });
};
exports.BasicRoutes = BasicRoutes;
