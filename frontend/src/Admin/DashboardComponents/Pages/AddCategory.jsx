import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('men');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        if (!name || !type) {
            return toast.error("All fields are required.")
          }
        const data = {
                          name : name.toLowerCase(),
                          type
                    };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/category/`,data,{withCredentials: true});
            if(response.status === 201){
                toast.success('Category added successfully');
                setName('');
                setType('men');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add category.');
            console.log('Error while adding category.' , error);
        }    
    }
  return (
    <div className='w-full p-5'>
        <div>
          <h3 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100 mb-5">Add New Category</h3>
        </div>
       
        <form onSubmit={handleSubmit} className='w-full mt-4 lg:w-10/12 mx-auto'>
            <div className='space-y-3'>
               {/* category name */}
               <label className="block text-gray-800 mb-2">Category Name:</label>
               <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-100 rounded outline-none"
                required
               />

               {/* Choose category type */}
               <label className="block text-gray-800 mb-2">Category For:</label>
               
               <div className='flex gap-3 ml-3'>
                 {/* for men */}
                 <label className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={type === "men"}
                    onChange={() => setType("men")}
                    className="form-radio text-red-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-700">Men</span>
                </label>

                {/* for women */}
                <label className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={type === "women"}
                    onChange={() => setType("women")}
                    className="form-radio text-red-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-700">Women</span>
                </label>
            
                {/* for both */}
                <label className="flex items-center mb-4">
                  <input
                    type="radio"
                    name={type}
                    value="both"
                    checked={type === "both"}
                    onChange={() => setType("both")}
                    className="form-radio text-red-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-700">Both</span>
                </label>
               </div>
            </div>
            <button className="w-full bg-red-500 text-white py-2 px-6 mt-4 uppercase font-medium rounded hover:bg-red-600">
               Add Category
            </button>
        </form>
    </div>
  )
}

export default AddCategory