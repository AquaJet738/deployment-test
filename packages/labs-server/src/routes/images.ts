import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/images", async (req: Request, res: Response) => {
        let userId: string | undefined = undefined;

        try {
            if (typeof req.query.createdBy === "string") {
                userId = req.query.createdBy;
                // console.log(userId);
            }

            const imageProvider = new ImageProvider(mongoClient);
            const images = await imageProvider.getAllImages(userId);
            res.json(images);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.patch("/api/images/:id", async (req: Request, res: Response) => {
        const imageId = req.params.id;
        const name = req.body.name;
        console.log("Image ID:", imageId);
        console.log("Name:", name);

        if (!name) {
            res.status(400).send(
                {error: "Bad request",
                message: "Missing name property"}
            );

            return;
        }
        try {
            const imageProvider = new ImageProvider(mongoClient);
            const updateResult = await imageProvider.updateImageName(imageId, name);

            if (updateResult === 0) {
                res.status(404).send({
                    error: "Not found",
                    message: "Image does not exist"
                });

                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error("Error updating image:", error);
            res.status(500).send({ error: "Failed to update image name." });
        }
    });
}
