const mongoose=require("mongoose");

const blogSchema=mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a product title"]
    },
    body: {
        type: String,
        required: [true, "Please enter a product description"]
    },
    author: {
        type: String,
        required: [true, "Please enter the author's name"]
    },
    timestamps: {
        type: Date,
        default: Date.now
    }})

    const Blog=mongoose.model("Blog",blogSchema);
    module.exports=Blog;