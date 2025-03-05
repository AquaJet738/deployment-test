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
    author?: Author; // Denormalized author data
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(): Promise<ImageDocument[]> { // TODO #2
        try {
            const collectionName = process.env.IMAGES_COLLECTION_NAME;
            const authorsCollectionName = process.env.USERS_COLLECTION_NAME;
    
            if (!collectionName || !authorsCollectionName) {
                throw new Error("Missing collection names from environment variables");
            }
    
            const collection = this.mongoClient.db().collection<Document>(collectionName);
    
            const images = await collection
                .aggregate<Document>([
                    {
                        $lookup: {
                            from: authorsCollectionName,
                            localField: "authorId",
                            foreignField: "_id",
                            as: "author",
                        },
                    },
                    {
                        $unwind: {
                            path: "$author",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                ])
                .toArray();
    
            console.log("Fetched images:", images); // Debugging log
            return images as ImageDocument[];
        } catch (error) {
            console.error("Error fetching images:", error);
            throw new Error("Failed to fetch images");
        }
    }
}