import { AppError } from "../lib/custom_error.js";
import { NormalizeError } from "../lib/error.js";
import { AuthorService } from "../services/authors.services.js";

export async function getAllAuthors(req, res) {
    try {
        const authors = await AuthorService.GetAuthors();
        return res.status(200).json(authors);
    } catch (err) {
        const appError = NormalizeError(err);
        return res.status(appError.statusCode).json({ message: appError.message });
    }
}

export async function getAuthorById(req, res) {
    try {
        const { id } = req.params;

        if (!id) throw new AppError("ID is not valid", 400)
        const author = await AuthorService.GetAuthor(id);
        if (!author) throw new AppError("Author not found", 404);
        return res.status(200).json(author);
    } catch (err) {
        const appError = NormalizeError(err);
        return res.status(appError.code).json({ message: appError.message });
    }
}

export async function createAuthor(req, res) {
    try {
        const { id, name, birthYear } = req.body;
        if (!id && !name && !birthYear) throw new AppError("Invalid author details", 400);
        const author = await AuthorService.CreateAuthor({ id, name, birthYear });

        return res.status(201).json(author)
    } catch (err) {
        const appError = NormalizeError(err);
        return res.status(appError.code).json({ message: appError.message });
    }
}
export async function updateAuthor(req, res) {
    try {
        const { id } = req.params;
        const newADetails = req.body; // expecting { name, birthYear}

        const AuthorUpdate = await AuthorService.UpdateAuthor({ id, updateDetails: newADetails });

        if (AuthorUpdate.matchedCount === 0) throw new AppError("Author does not exist", 404);
        if (AuthorUpdate.modifiedCount === 0) throw new AppError("An error occurred on updating the author's details", 400);
        return res.status(200).json({ ...AuthorUpdate })
    } catch (err) {
        const appError = NormalizeError(err);
        return res.status(appError.code).json({ message: appError.message });
    }
}

export async function deleteAuthor(req, res) {
    try {
        const { id } = req.params;
        const deleteA = await AuthorService.DeleteAuthor({ id })
        if (deleteA.deletedCount === 0) throw new AppError("Author does not exist", 404)
        return res.status(200).json({ author: deleteA, message: "Successfully deleted one document." })
    } catch (err) {
        const appError = NormalizeError(err);
        return res.status(appError.code).json({ message: appError.message });
    }
}