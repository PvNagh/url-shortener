import Post from "../models/Post.js"
import { nanoid } from "nanoid"
import validUrl from 'valid-url'

export const createPost = async (req, res) => {
    const { longUrl, text } = req.body;
    const userId = req.user.id;

    try {
        if (!validUrl.isWebUri(longUrl)) {
            return res.status(400).json({ error: "Invalid URL" });
        }
        const existingPost = await Post.findOne({ longUrl });

        if (existingPost) {
            return res.status(200).json(existingPost);
        }
        const shortUrlId = nanoid(9);
        const shortUrl = `${process.env.BACKEND}/${shortUrlId}`;
        const newPost = new Post({
            longUrl: longUrl,
            shortUrl: shortUrl,
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

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await Post.find({ userId: userId });

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


export const updateVisitCounter = async (req, res) => {
    const { shortUrlId } = req.params;

    try {
        const post = await Post.findOne({ shortUrlId });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.visitCount += 1;
        await post.save();
        res.status(200).json({ message: 'Visit counter updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export const searchPosts = async (req, res) => {
    try {
      const { search } = req.query;
      const userId  = req.user.id; // Assuming you have the user's ID available
      const query = {
        $and: [
          {
            $or: [
              { text: { $regex: search, $options: "i" } },
              { longUrl: { $regex: search, $options: "i" } },
              { shortUrl: { $regex: search, $options: "i" } },
            ],
          },
          { userId: userId }, // Only include posts belonging to the user
        ],
      };
      const posts = await Post.find(query);
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching posts" });
    }
  };
  