import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllProducts = () => {
    const [products, setProducts] = useState([]);  // State to store products
    const [loading, setLoading] = useState(false); // State to handle loading

    useEffect(() => {
        const getAllProducts = async () => {
            setLoading(true); // Start loading before fetching
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/product`, {
                    withCredentials: true // Ensure credentials are sent
                });
                setProducts(response.data); // Set fetched products
            } catch (error) {
                console.log('Error while getting products:', error);
            } finally {
                setLoading(false); // End loading after fetching
            }
        };

        getAllProducts();
    }, []);

    // Return products, loading state, and setProducts function for external use
    return [products, loading, setProducts];
}

export default GetAllProducts;
