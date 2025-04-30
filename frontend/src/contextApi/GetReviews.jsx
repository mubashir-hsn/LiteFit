import React, { useEffect, useState , useMemo} from 'react';
import axios from 'axios';
import { useAuth } from '../contextApi/AuthProvider.jsx';

const GetReviews = () => {
    const [reviews, setReviews] = useState([]);  
    const [loading, setLoading] = useState(false); 
    const { authUser } = useAuth()

    useEffect(() => {
        const getAllReviews = async () => {
            setLoading(true); // Start loading before fetching
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reviews/api/get-all-reviews`, {
                    withCredentials: true,
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                toast.error("Failed to fetch reviews.");
            } finally {
                setLoading(false);
            }
        };

        getAllReviews();
    }, []);

    // Filter reviews based on user role
    const filteredReviews = useMemo(() => {
        if (authUser?.user?.role === 'user') {
            return reviews.filter((review) => review?.userId?._id === authUser?.user?._id);
        }
        return reviews;
    }, [reviews, authUser, authUser?.user?._id]);

    // Return reviews, loading state, and setReviews function for external use
    return [filteredReviews, setReviews, loading];
}

export default GetReviews;
