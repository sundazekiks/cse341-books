import { AppError } from "../lib/custom_error.js";
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
export const GetBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new AppError("no id provided", 400)
        const book = await BookService.GetBook(id);
        if (!book) throw new AppError("Book not found", 404)
        return res.status(200).json(book)
    } catch (err) {
        const normsErr = NormalizeError(err)
        return res.status(normsErr.code).json({ message: normsErr.message })
    }
}