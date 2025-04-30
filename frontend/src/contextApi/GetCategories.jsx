import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetCategories = () => {
    const [categories, setCategories] = useState([]);  
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const getAllCategories = async () => {
             setLoading(true);
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/`, {
              withCredentials: true,
            });
            setCategories(response.data);
          } catch (error) {
            console.error('Error while fetching categories:', error);
          } finally {
            setLoading(false);
          }
        };
        getAllCategories();
      }, []);
    

    return [categories, loading];
}

export default GetCategories;
