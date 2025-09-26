import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link} from 'react-router-dom';
import GetReviews from '../../../contextApi/GetReviews';

const AllReviews = () => {

    const [filteredReviews, setReviews , loading] = GetReviews();

    // Handle review deletion
    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/reviews/delete/${reviewId}`, { withCredentials: true });
            toast.success("Review deleted successfully.");
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error("Error occurred while deleting the review.");
        }
    };

    return (
        <div className="container p-6 bg-white shadow-sm rounded-3">
            <h3 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100">
                All Reviews ({filteredReviews.length})
            </h3>

            {loading ? (
                // Skeleton Loader
                <div className="flex flex-wrap gap-5 mt-5">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-full md:1/2 lg:w-[30%] p-4 bg-gray-200 rounded-md animate-pulse h-52"></div>
                    ))}
                </div>
            ) : filteredReviews.length === 0 ? (
                <div className="text-center text-gray-500 mt-5">No reviews available.</div>
            ) : (
                <div className="flex flex-wrap gap-5 mt-6">
                    {filteredReviews.map((review) => (
                        <div key={review._id} className="bg-slate-50 shrink-0 p-5 w-full md:w-1/2 lg:w-[30%] rounded-md" data-aos='zoom-in-up'>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium font-[Lora]">Product: 
                                    <Link to={`/shop/c/${review?.productId?._id}`} className="hover:text-blue-500 ml-2">
                                        {review?.productId?.name}
                                    </Link>
                                </p>
                                <p className="text-slate-500">User: {review?.userId?.username}</p>
                                <p className="text-slate-500">Rating: {review?.rating || 1}</p>
                                <p className="text-slate-500">Comment: {review?.comment}</p>
                                <p className="text-slate-500 text-sm">Created At: { new Date(review?.createdAt).toLocaleDateString()}</p>
                            </div>

                            <button
                                onClick={() => handleDelete(review._id)}
                                className="mt-3 text-sm font-medium p-2 rounded bg-red-400 hover:bg-red-500 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllReviews;
