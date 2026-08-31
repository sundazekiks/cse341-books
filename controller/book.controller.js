import { NormalizeError } from "../lib/error.js"
import { BookService } from "../services/book.services.js"

export const GetBooks = async (req, res) => {
    try {
        const books = await BookService.GetBooks();
        return res.status(200).json(books)
    } catch (err) {
        const normsErr = NormalizeError(err)
        return res.status(normsErr.statusCode).json({ message: normsErr.message })
    }
}