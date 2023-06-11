import express from 'express';
import { login, refresh, signup } from "../controllers/auth-controller.js";
import { createPost, getAllPosts, redirectToLongUrl, searchPosts } from "../controllers/post-controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/refresh", refresh);
router.post("/post/create-post", verifyToken, createPost);
router.get("/post/all", verifyToken, getAllPosts);
router.get("/post/search",verifyToken,searchPosts);
router.get("/:shortUrlId", redirectToLongUrl);//no verification needed when going to this url

export default router;
