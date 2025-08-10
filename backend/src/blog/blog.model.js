import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type: String,
        default: "admin"
    }
    
},{timestamps:true});

const Blog = new mongoose.model("Blog",blogSchema);

export default Blog;