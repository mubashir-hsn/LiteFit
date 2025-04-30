import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
     name:{
        type: String,
        required: true,
        unique : true,
     },
     type:{
        type:String
     }
},
{timestamps:true})

const Category = new mongoose.model('category',categorySchema);

export default Category;