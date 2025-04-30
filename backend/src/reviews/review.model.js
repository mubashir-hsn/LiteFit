import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    comment:{ type: String, required: true},
    rating: { type: Number, default: 0, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    
},{timestamps:true})

const Review = mongoose.model('Review', reviewSchema)
export default Review;
