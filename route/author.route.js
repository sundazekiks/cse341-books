import { Router } from "express";
import {
    createAuthor,
    deleteAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor
} from "../controller/author.controller.js";

const router = Router();

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Authors returned successfully
 *       500:
 *         description: Unable to retrieve authors
 */
router.get("/", getAllAuthors)

/**
 * @openapi
 * /authors/{id}:
 *  get:
 *      summary: Get author by id
 *      tags: 
 *          - Authors
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the custom author id, such as a1, a2 and so on
 *            schema:
 *              type: string
 *      responses: 
 *          200:
 *              description: Author returned successfully
 *          400: 
 *              description: Invalid ID
 *          404: 
 *              description: Author not found
 *          500:
 *              description: Unable to retrieve authors 
 */
router.get("/:id", getAuthorById)
/**
 * @openapi
 * /authors:
 *  post:
 *     summary: Create an author
 *     tags:
 *          - Authors
 *     requestBody:
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties: 
 *                          name:
 *                              type: string
 *                          birthYear: 
 *                              type: integer
 *                          id: 
 *                              type: string
 *     responses:
 *          201:
 *              description: Created an author
 *          400:
 *              description: Invalid author details or ID already exist
 *          500:
 *              description: internal server error
 */
router.post("/", createAuthor)
/**
 * @openapi 
 * /authors/{id}:
 *  put:
 *      summary: Update an author's details
 *      tags:
 *          - Authors
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: the custom author id
 *            schema: 
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          birthYear:
 *                              type: integer
 *      responses:
 *          200:
 *              description: Author updated successfully
 *          400:
 *              description: required fields missing
 *          500:
 *              description: An internal error occured while updating author, try again later
 */
router.put("/:id", updateAuthor)
/**
 * @openapi
 * /authors/{id}:
 *  delete:
 *      summary: delete an author
 *      tags: 
 *          - Authors
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Delete an author using the custom ID such as, a1 a2
 *            schema:
 *                  type: string
 *      responses: 
 *          200:
 *              description: Deleted an author successfully
 *          404:
 *              description: Author does not exist
 *          500: 
 *              description: An internal error occured please try again later
 * 
 */
router.delete("/:id", deleteAuthor)
export default router;
