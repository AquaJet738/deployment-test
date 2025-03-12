import { MongoClient, ObjectId, Document } from "mongodb";

// Denormalized author field
interface Author {
    _id: string;
    name: string;
    email: string;
}

// TODO 1: Create a new TS interface that matches the documents in the images collection.
interface ImageDocument {
    _id: string;
    url: string;
    description?: string;
    uploadedAt: Date;
    author: string;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async updateImageName(imageId: string, newName: string): Promise<number> {
        try {
            const collectionName = process.env.IMAGES_COLLECTION_NAME;
            if (!collectionName) {
                throw new Error("Missing collection name from environment variables");
            }

            const collection = this.mongoClient.db().collection<ImageDocument>(collectionName);
            const result = await collection.updateOne(
                { _id: imageId },
                { $set: { description: newName } }
            );
            return result.modifiedCount;
        } catch (error) {
            console.error("Error updating image name:", error);
            throw new Error("Failed to update image name");
        }
    }

    async getAllImages(author?: string): Promise<ImageDocument[]> { // TODO #2
        try {
            const collectionName = process.env.IMAGES_COLLECTION_NAME;
            const authorsCollectionName = process.env.USERS_COLLECTION_NAME;
    
            if (!collectionName || !authorsCollectionName) {
                throw new Error("Missing collection names from environment variables");
            }
    
            const collection = this.mongoClient.db().collection<ImageDocument>(collectionName);
            const query = author ? { author } : {};
            console.log(query);
            const images = await collection.find(query).toArray();

            // console.log("Fetched images:", images); // Debugging log
            return images;
        } catch (error) {
            console.error("Error fetching images:", error);
            throw new Error("Failed to fetch images");
        }
    }
}