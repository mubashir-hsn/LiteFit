import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../contextApi/AuthProvider.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';

const PostReview = ({ isModelOpen, handleClose }) => {

    const { id } = useParams();
    const {authUser} = useAuth();
    const userId = authUser?.user?._id;
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       if(comment==='' || rating===''){
        return toast.error('All fields are required')
       }
        const newComment = {
            comment: comment,
            rating: rating,
            userId: userId,
            productId: id,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reviews/post-review`, newComment);
            toast.success('Review Added Successfully');
            setComment('')
            setRating(0)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
        setTimeout(()=>{window.location.reload();},1000)
    };


    return (
        <div className={`fixed inset-0 bg-black/90 flex justify-center items-center z-[51] px-2 ${isModelOpen ? "block" : "hidden"}`}>
            <div className='bg-white p-6 w-96 rounded-md shadow-lg z-50'>
                <h3 className='text-xl font-medium mb-4 text-primary'>Post A Review </h3>
                <div className='flex items-center mb-4'>
                    {
                        [1, 2, 3, 4, 5].map((star) => (
                            <span key={star} onClick={() => handleRating(star)} className='text-lg text-yellow-500'>
                                {
                                    rating >= star ? (<i className='ri-star-fill'></i>) : (<i className='ri-star-line'></i>)
                                }
                            </span>
                        ))
                    }
                </div>
                <textarea name="comment"
                    value={comment}
                    rows="4"
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md mb-4 outline-none resize-none'
                ></textarea>
                <div className='flex justify-end gap-2'>
                    <button onClick={handleClose} className='px-4 py-2 font-medium bg-gray-300 hover:bg-gray-200 transition-all duration-300 rounded'>Cancel</button>
                    <button onClick={handleSubmit} className='btn'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default PostReview