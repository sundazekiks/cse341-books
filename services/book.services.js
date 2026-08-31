import { db } from "../db/mongo.js"

export const BookService = {
    GetBooks: async () => {
        return await db.collection("books").find().toArray();
    }
}