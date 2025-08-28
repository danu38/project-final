
import express from "express";
import { getPosts, createPost, getPostById } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);                 // public
router.post("/", authMiddleware, createPost); // protected
router.get("/:id", getPostById);
export default router;