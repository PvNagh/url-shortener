import Post from "../models/Post.js"
import { nanoid } from "nanoid"
import validUrl from 'valid-url'

export const createPost = async (req, res) => {
    const { longUrl, text, userId } = req.body;
    try {
        if (!validUrl.isWebUri(longUrl)) {
            return res.status(400).json({ error: "Invalid URL" });
        }
        const existingPost = await Post.findOne({ longUrl });

        if (existingPost) {
            return res.status(200).json(existingPost);
        }
        const shortUrlId = nanoid(9);

        const newPost = new Post({
            longUrl: longUrl,
            shortUrlId: shortUrlId,
            text: text,
            userId: userId
        });

        const savedPost = await newPost.save();

        res.status(200).json(savedPost);
    }
    catch (error) {
        res.status(500).json(error)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const redirectToLongUrl = async (req, res) => {
    const { shortUrlId } = req.params;

    try {
        const post = await Post.findOne({ shortUrlId });

        if (!post) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        post.visitCount += 1;
        await post.save();

        res.redirect(301, post.longUrl);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const searchPosts = async (req, res) => {
    try {
        const { search } = req.query;

        const query = {
            $or: [
                { text: { $regex: search, $options: "i" } },
                { longUrl: { $regex: search } },
                { shortUrlId: { $regex: search } }
            ]
        };
        const posts = await Post.find(query);

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching posts" });
    }
};