import { Router } from "express";
import { CreateBook, DeleteBook, GetBook, GetBooks, UpdateBook } from "../controller/book.controller.js";

const router = Router();


/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books
 */
router.get("/", GetBooks)
/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get("/:id", GetBook)
/**
 * @openapi
 * /books: 
 *  post:
 *      summary: Creating a book
 *      tags:
 *          - Books
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          authorId: 
 *                              type: string
 *                          title:
 *                              type: string
 *                          publicationDate:
 *                              type: string
 *      responses:
 *          201: 
 *              description: Book created successfully
 *          400: 
 *              description: required field missing || id already exists || authorId does not match and existing author
 *          500:
 *              description: unexpected server error
 */
router.post("/", CreateBook)
/**
 * @openapi
 * /books/{id}: 
 *  put:
 *      summary: Creating a book
 *      tags:
 *          - Books
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Provide an id such as b1, b2 ,b3 anything that starts with a "b"
 *            schema: 
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          authorId: 
 *                              type: string
 *                          title:
 *                              type: string
 *                          publicationDate:
 *                              type: string
 *      responses:
 *          400: 
 *              description: required field missing || id already exists || authorId does not match and existing author
 *          404: 
 *              description: no book exists with that id
 *          500:
 *              description: unexpected server error
 */
router.put("/:id", UpdateBook)
/**
 * @openapi
 * /books/{id}:
 *  delete:
 *      summary: Delete a book
 *      tags:
 *          - Books
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Provide a book id such as b1, b2, b3
 *      responses:
 *          400:
 *              description: book does not exist
 *          500:
 *              description: an error occured while deleting book
 */
router.delete("/:id", DeleteBook)
export default router;