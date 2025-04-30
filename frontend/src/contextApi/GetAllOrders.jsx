import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllOrders = () => {
    const [orders, setOrders] = useState([]);  // State to store orders
    const [loading, setLoading] = useState(false); // State to handle loading

    useEffect(() => {
        const getAllOrders = async () => {
            setLoading(true); // Start loading before fetching
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/orders/all-orders`, {
                    withCredentials: true // Ensure credentials are sent
                });
                setOrders(response.data); // Set fetched orders
            } catch (error) {
                console.log('Error while getting orders:', error);
            } finally {
                setLoading(false); // End loading after fetching
            }
        };

        getAllOrders();
    }, []);

    // Return orders, loading state, and setOrders function for external use
    return [orders, loading, setOrders];
}

export default GetAllOrders;
