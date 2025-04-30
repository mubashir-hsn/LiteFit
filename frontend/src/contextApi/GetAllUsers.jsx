import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);  // State to store orders
    const [loading, setLoading] = useState(false); // State to handle loading

    useEffect(() => {
        const getAllUsers = async () => {
             setLoading(true);
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/get-all-users`, {
              withCredentials: true,
            });
            setUsers(response.data);
          } catch (error) {
            console.error('Error while fetching users:', error);
          } finally {
            setLoading(false);
          }
        };
        getAllUsers();
      }, []);
    

    return [users, loading , setUsers];
}

export default GetAllUsers;
