import Product from "../products/model/products.model.js";
import Review from "./review.model.js";

// Controller to post or update a review
export const postReview = async (req, res) => {
    try {
        const { comment, rating, userId, productId } = req.body;

        if (!comment || !rating || !userId || !productId) {
            return res.status(400).send({ message: "All fields are required." });
        }

        // Check if the review already exists for the user and product
        let review = await Review.findOne({ userId, productId });

        if (review) {
            // Update the existing review
            review.comment = comment;
            review.rating = rating;
        } else {
            // Create a new review if it doesn't exist
            review = new Review({
                comment,
                rating,
                userId,
                productId
            });
        }

        await review.save();

        // Calculate the average rating for the product
        const reviews = await Review.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;

            const product = await Product.findOne({ _id: productId });
            if (product) {
                product.rating = averageRating;
                await product.save({ validateBeforeSave: false });
            } else {
                return res.status(404).send({ message: "Product not found." });
            }
        }

        return res.status(200).send({ message: "Review posted.", reviews });

    } catch (error) {
        console.log('Error while posting user review: ' + error);
        res.status(500).send({ message: "Failed to post review." });
    }
};

// Controller to get all reviews for a specific product
export const getReviews = async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).send({ message: "Product ID is required" });
    }

    try {
        const reviews = await Review.find({ productId: productId })
            .populate('userId', 'username') // Populate only the username field from the User model
            .sort({ createdAt: -1 });

        if (reviews.length === 0) {
            return res.status(404).send({ message: "No reviews found for this product." });
        }

        res.status(200).send(reviews);
    } catch (error) {
        console.log('Error while fetching reviews: ' + error);
        res.status(500).send({ message: "Failed to fetch reviews." });
    }
};

// count total reviews

export const totalReviews = async(req,res)=>{
    try {

        const totalReview = await Review.countDocuments({});
        res.status(200).send({totalReview})
        
    } catch (error) {
        console.log('Error while getting total review: ' + error)
        res.status(500).send({ message: "Failed to count total review." })
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate({ path: 'productId', select: 'name image', strictPopulate: false })
            .populate({ path: 'userId', select: 'username profileImage', strictPopulate: false });

        res.status(200).send(reviews);
    } catch (error) {
        console.error(`Error while getting all reviews: ${error.message}`, error);
        res.status(500).send({
            success: false,
            message: "Failed to fetch reviews.",
            error: error.message,
        });
    }
};


export const deleteReview = async(req,res)=>{
    const id = req.params.id
    try {
        const deleteReview = await Review.findByIdAndDelete(id);
        res.status(201).send({message:"Review deleted successfully." , review: deleteReview})
        
    } catch (error) {
        console.error("Error while deleting review: " + error);
        res.status(500).send({ message: "Failed to delete review." });
    }
}