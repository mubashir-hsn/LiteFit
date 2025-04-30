import React, { useState } from 'react';
import avatar from '../../../assets/avatar.png';
import { formatDate } from '../../../components/FormatDate.js';
import { useAuth } from '../../../contextApi/AuthProvider.jsx';
import RatingStar from '../../../components/RatingStar.jsx';
import PostReview from './PostReview.jsx';
import toast from 'react-hot-toast';

const ReviewCart = ({ reviews }) => {
    const review = reviews || [];
const {authUser} = useAuth(); // Fetching the logged-in user
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleOpenReviewModel = () => {
        if (!authUser) {
            toast.error('You need to be logged in to add a review'); // Toast notification for non-logged-in users
            return;
        }
        setIsModelOpen(true);
    };

    const handleClose = () => {
        setIsModelOpen(false);
    };

    return (
        <div className='bg-white px-5 flex justify-center items-center'>
            <div className='w-full md:w-[90%]'>
                <div className='space-y-14'>
                    <div>
                        <h2 className='text-[2rem] px-2 font-extrabold font-[Lora] text-black capitalize border-b-2 border-b-gray-300'>Reviews</h2>
                    </div>
                    <div className='px-2'>
                        {review.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                                {review.map((review, index) => (
                                    <div key={index} className='border-l-2 shadow-sm border-l-primary py-2 px-4'>
                                        <div className='flex gap-3 items-center'>
                                            <img src={avatar} alt='userImg' className='size-10' />
                                            <div className='space-y-1 w-full md:w-[70%]'>
                                                <div className='flex justify-between items-center'>
                                                    <p className='text-lg text-blue-400 font-[Lora] font-bold underline underline-offset-4 capitalize'>
                                                        {review?.userId?.username}
                                                    </p>
                                                    <p className='text-[10px] italic font-semibold'>
                                                        {formatDate(review?.updatedAt)}
                                                    </p>
                                                </div>
                                                <RatingStar rating={review?.rating} />
                                            </div>
                                        </div>
                                        <div className='px-6 text-gray-600 m-2'>
                                            <p>{review?.comment}</p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews yet!</p>
                        )}
                    </div>
                </div>
                {/* Add review button */}
                <div className='mt-12'>
                    <button
                        onClick={handleOpenReviewModel}
                        className='btn ml-2'>
                        Add A Review
                    </button>
                </div>
                {/* Post Review Model component */}
                <div>
                    <PostReview isModelOpen={isModelOpen} handleClose={handleClose} />
                </div>
            </div>
        </div>
    );
};

export default ReviewCart;
