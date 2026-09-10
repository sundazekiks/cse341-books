import { getDb } from "../db/mongo.js";
import { AppError } from "../lib/custom_error.js";

export const AuthorService = {
    GetAuthors: async () => {
        return await getDb.collection("authors").find().toArray();
    },
    GetAuthor: async (id) => {
        return await getDb.collection("authors").findOne({ id });
    },
    CreateAuthor: async ({ id, name, birthYear }) => {
        const authorExist = await getDb.collection("authors").findOne({ id })
        if (authorExist) throw new AppError("Author with that ID already exist", 400)
        const author = await getDb.collection("authors").insertOne({ id, name, birthYear })
    },
    UpdateAuthor: async ({ id, updateDetails }) => {
        // We need to filter the author's update details so we can know which is which
        const detailedUpdate = Object.fromEntries(Object.entries(updateDetails).filter(([key, value]) => value !== "")); // eslint-disable-line
        return await getDb.collection("authors").updateOne(
            { id },
            { $set: detailedUpdate }
        )
    },
    DeleteAuthor: async ({ id }) => {
        return await getDb.collection("authors").deleteOne({ id })
    }
}