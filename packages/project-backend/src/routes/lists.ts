import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ListProvider } from "../ListProvider";

export function registerListRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/lists", async (req: Request, res: Response) => {
        let userId: string | undefined = undefined;

        try {
            if (typeof req.query.createdBy === "string") {
                userId = req.query.createdBy;
            }

            const listProvider = new ListProvider(mongoClient);
            const lists = await listProvider.getAllLists(userId);
            res.json(lists);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch lists" });
        }
    });

    app.patch("/api/lists/:id", async (req: Request, res: Response) => {
        const listId = req.params.id;
        const name = req.body.name;
        console.log("List ID:", listId);
        console.log("Name:", name);

        if (!name) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });

            return;
        }

        try {
            const listProvider = new ListProvider(mongoClient);
            const updateResult = await listProvider.updateListName(listId, name);

            if (updateResult === 0) {
                res.status(404).send({
                    error: "Not found",
                    message: "List does not exist"
                });

                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error("Error updating list:", error);
            res.status(500).send({ error: "Failed to update list name." });
        }
    });
}
