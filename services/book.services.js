import { getDb } from "../db/mongo.js"


export const BookService = {
    GetBooks: async () => {
        return await getDb.collection("books").find().toArray();
    },
    GetBook: async (id) => {
        return await getDb.collection("books").findOne({ id });
    }
}