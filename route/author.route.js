import { Router } from "express";
import {
    getAllAuthors,
    getAuthorById
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

export default router;
