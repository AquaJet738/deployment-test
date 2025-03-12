import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "../CredentialsProvider";
import jwt from "jsonwebtoken";

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // console.log(authHeader);
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, 
            process.env.JWT_SECRET || "oscarPastryVSLandoNoChancesIntoTurn1",
            (error, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    const credentialsProvider = new CredentialsProvider(mongoClient);

    app.post("/auth/register", async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }

        try {
            await credentialsProvider.registerUser(username, password);
            res.status(201).send();
        } catch (error: any) {
            if (error.message === "User already exists") {
                res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken"
                });

                return;
            }

            res.status(500).send({ error: "Internal server error" });
        }
    });

    app.post("/auth/login", async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const verifyPasswordResult = await credentialsProvider.verifyPassword(username, password);

        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Username or password not provided"
            });

            return;
        }

        if (verifyPasswordResult) {
            const token = jwt.sign(
                {
                    username,
                    expiresIn: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // token expires 24 hours from now
                },
                process.env.JWT_SECRET || "oscarPastryVSLandoNoChancesIntoTurn1", // Replace with a secure secret
                { algorithm: "HS256" }
            );

            res.status(200).send({ token }); 
        } else {
            res.status(401).send({ error: "Incorrect username or password" });
        }

    });
}