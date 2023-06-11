import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    longUrl: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    shortUrlId: {
        type: String
    },
    visitCount: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true
    })

const Post = mongoose.model('Post', PostSchema);

export default Post;