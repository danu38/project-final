
import express from "express";
import { getPosts, createPost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);                 // public
router.post("/", authMiddleware, createPost); // protected

export default router;