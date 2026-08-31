import { Router } from "express";
import { GetBooks } from "../controller/book.controller.js";

const router = Router();

router.get("/", GetBooks)

export default router;