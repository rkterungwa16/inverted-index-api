import cors from "cors";
import express from "express";
import { Inject } from "typescript-ioc";
import { InvertedIndexRoutes } from "./routes";

export class App {
    public static init() {
        const app = express();

        app.use(cors());
        app.use(express.json());

        app.use("/api/v1", this.invertedIndexRoute.routes);

        return app;
    }
    @Inject
    private static invertedIndexRoute: InvertedIndexRoutes;
}
