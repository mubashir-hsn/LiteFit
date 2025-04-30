import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
const GetAllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { id: productId } = useParams(); 

    useEffect(() => {
        const getAllReviews = async () => {
            if (!productId) return; 
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reviews/${productId}`, {
                    withCredentials: true 
                });
                
                setReviews(response.data);
            } catch (error) {
                console.log('Error while fetching reviews:', error);
            }
        };

        getAllReviews();
    }, [productId]); 

    return ([reviews, setReviews]);
};

export default GetAllReviews;

