// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllBlogs = () => {
    const [blogs, setBlogs] = useState([]);  
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const getBlogs = async () => {
             setLoading(true);
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blog/`, {
              withCredentials: true,
            }); 
            setBlogs(response.data);
          } catch (error) {
            console.error('Error while fetching categories:', error);
          } finally {
            setLoading(false);
          }
        };
        getBlogs();
      }, []);
    

    return [blogs, loading];
}

export default GetAllBlogs;
