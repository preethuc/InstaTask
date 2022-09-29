const mongoose = require('mongoose')
const validator = require('validator')



const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postName: {
        type: String
    },
    likes: {
        type: String,
        enum: ["Like", "dislike"],
        default: "Like"
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    caption: {
        type: String
    }
    
})
const Post = mongoose.model("Post", postSchema);

module.exports = Post;