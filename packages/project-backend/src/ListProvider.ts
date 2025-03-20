import { MongoClient, ObjectId, Document } from "mongodb";

interface TodoListDocument {
    _id: string;
    createdAt: Date;
    author: string;
    contents: Array<any>;
}

export class ListProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async updateListName(listId: string, newName: string): Promise<number> {
        try {
            const collectionName = process.env.LISTS_COLLECTION_NAME;
            if (!collectionName) {
                throw new Error("Missing collection name from environment variables");
            }

            const collection = this.mongoClient.db().collection<TodoListDocument>(collectionName);
            const result = await collection.updateOne(
                { _id: listId },
                { $set: { name: newName } }
            );
            return result.modifiedCount;
        } catch (error) {
            console.error("Error updating list name:", error);
            throw new Error("Failed to update list name");
        }
    }

    async getAllLists(author?: string): Promise<TodoListDocument[]> {
        try {
            const collectionName = process.env.LISTS_COLLECTION_NAME;
    
            if (!collectionName) {
                throw new Error("Missing collection name from environment variables");
            }
    
            const collection = this.mongoClient.db().collection<TodoListDocument>(collectionName);
            const query = author ? { author } : {};
            const lists = await collection.find(query).toArray();

            return lists;
        } catch (error) {
            console.error("Error fetching lists:", error);
            throw new Error("Failed to fetch lists");
        }
    }
}