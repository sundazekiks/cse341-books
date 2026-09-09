import { getDb } from "../db/mongo.js";

export const AuthorService = {
    GetAuthors: async () => {
        return await getDb.collection("authors").find().toArray();
    },
    GetAuthor: async (id) => {
        return await getDb.collection("authors").findOne({ id });
    },
    CreateAuthor: async ({ id, name, bYear }) => {
        const author = await getDb.collection("authors").insertOne({ id, name, bYear })
    },
    UpdateAuthor: async({ id, updateDetails })
}