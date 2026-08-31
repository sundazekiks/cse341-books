import { Router } from "express";
import { GetBook, GetBooks } from "../controller/book.controller.js";

const router = Router();

router.get("/", GetBooks)
router.get("/:id", GetBook)
export default router;