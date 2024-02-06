const express=require("express");
const mongoose =require("mongoose");
const Blog=require("./modules/blogModel");

const app=express();

app.use(express.json());

app.post("/blog", async(req,res)=>{
    try {
        const blog=await Blog.create(req.body);
        res.status(200).json(blog)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.get('/',(req,res)=>{
    res.send("hello");
});

app.get("/blog",async(req,res)=>{
    try {
        const blog= await Blog.find({});
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get("/blog/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
        const blog=await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message:error.message });
    }
});

app.put("/blog/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
        const blog=await Blog.findByIdAndUpdate(id,req.body);
        if(!blog){
            res.status(404).json({message: "not founded ${id}"})
        }
        const updatedBlog=await Blog.findById(id);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({message:error.message });    }
})

app.delete('/blog/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const blog=await Blog.findByIdAndDelete(id);
        if(!blog){
            res.status(404).json({message: "not founded ${id}"})
        }
        const updatedBlog=await Blog.find({});
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({message:error.message });
    }
})

mongoose.connect("mongodb+srv://beka24k:040205@web.0rf2pml.mongodb.net/CRUD-API?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000,()=>{
        console.log("working on port 3000")
    })
    console.log("connected to db");
})
.catch((error)=>{
    console.error(error)
});
