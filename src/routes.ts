import express from "express";
import { Inject } from "typescript-ioc";
import { InvertedIndexController } from "./controller";
import { upload } from "./multer.service";

const router = express.Router();

export class InvertedIndexRoutes {
    @Inject
    private invertedIndexController!: InvertedIndexController;

    get routes() {
        router.route("/create-index").post(upload.single("texts"), this.invertedIndexController.createIndex);
        router.route("/search").post(this.invertedIndexController.search);
        return router;
    }
}
