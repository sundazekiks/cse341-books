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

export const CreateBook = async (req, res) => {
    try {
        const { authorId, title, publicationDate } = req.body;
        const create = await BookService.CreateBook({ authorId, title, publicationDate });
        return res.status(201).json({ ...create });
    } catch (err) {
        const normsErr = NormalizeError(err)
        return res.status(normsErr.code).json({ message: normsErr.message })
    }
}

export const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId, title, publicationDate } = req.body;
        const updateBook = await BookService.UpdateABook({ id, authorId, title, publicationDate });
        return res.status(200).json({ ...updateBook, message: "Book updated successfully" })
    } catch (err) {
        const normsErr = NormalizeError(err)
        return res.status(normsErr.code).json({ message: normsErr.message })
    }
}

export const DeleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const delService = await BookService.DeleteBook({ id });
        return res.status(200).json({ ...delService, message: "Book has been deleted" })
    } catch (err) {
        const normsErr = NormalizeError(err)
        return res.status(normsErr.code).json({ message: normsErr.message })
    }
}