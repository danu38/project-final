import express from "express";
import { getComments, createComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:postId", getComments); // public
router.post("/:postId", authMiddleware, createComment); // protected

export default router;