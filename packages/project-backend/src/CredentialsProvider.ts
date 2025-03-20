import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

interface ICredentialsDocument {
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        // Check if username already exists
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            console.log("User already exists");
            return false;
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        // Store user in database
        await this.collection.insertOne({
            username,
            password: hashedPassword,
        });

        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {
        // Retrieve user record from database
        const userRecord = await this.collection.findOne({ username });
        if (!userRecord) {
            return false;
        }

        // Extract stored password
        const hashedDatabasePassword = userRecord.password;

        // Compare provided password with stored password
        return await bcrypt.compare(plaintextPassword, hashedDatabasePassword);
    }
}
