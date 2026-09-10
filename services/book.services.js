import { getDb } from "../db/mongo.js"
import { AppError } from "../lib/custom_error.js";


export const BookService = {
    GetBooks: async () => {
        return await getDb.collection("books").find().toArray();
    },
    GetBook: async (id) => {
        return await getDb.collection("books").findOne({ id });
    },
    CreateBook: async ({ authorId, title, publicationDate }) => {
        // validate client sent request
        if (!authorId || !title || !publicationDate) {
            const missing = Object.entries({ authorId, title, publicationDate }).filter(([key, value]) => { return value === "" }).map(([key]) => { return key });
            throw new AppError(`required fields are missing: ${missing.join(", ")}`, 400);
        }
        const authorExist = await getDb.collection("authors").findOne({ id: authorId });
        if (!authorExist) throw new AppError("Author does not exist, please provide an ", 404);
        // generating a random number for the book id like: a + [random value] so there won't be manual input of book ids or any duplicates. I'm using crypto built in module in nodejs
        const id = ("b" + crypto.randomUUID());
        const book = await getDb.collection("books").insertOne({
            id,
            authorId: authorExist.id,
            title,
            publicationDate
        })
        return book;
    },
    UpdateABook: async ({ id, authorId, title, publicationDate }) => {
        const newDetails = Object.fromEntries(Object.entries({ authorId, title, publicationDate }).filter(([key, value]) => { return value !== "" }));
        // still check if the author exists even if the client didn't send a change on the author
        const authorExist = await getDb.collection("authors").findOne({ id: authorId });
        if (!authorExist) throw new AppError("authorId does not match an existing author", 400);
        const update = await getDb.collection("books").updateOne(
            { id },
            {
                $set: {
                    ...newDetails
                }
            }
        )
        if (update.matchedCount === 0) throw new AppError("Book does not exist", 404);
        return update;
    },
    DeleteBook: async ({ id }) => {
        const delBook = await getDb.collection("books").deleteOne({ id });
        if (delBook.deletedCount === 0) throw new AppError("Book does not exist or it may have been deleted", 404)
        return delBook
    }
}