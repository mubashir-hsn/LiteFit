/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';


const AddBlog = () => {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !subtitle || !imageUrl || !description) {
            toast.error('All fields are required!');
            return;
        }

        try {

            const data = {
                title,
                subtitle,
                imageUrl,
                description,
                author: "admin"
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/blog/create-blog`,
                data,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                toast.success('Blog created successfully!');
                setTitle('');
                setSubtitle('');
                setImageUrl('');
                setDescription('');
            }
        } catch (error) {
            console.error('Error while creating blog:', error);
            toast.error(error.response?.data?.message || 'Failed to create the Blog.');
        }
    };



    return (
        <div className="w-full p-5 bg-white">
            <h1 className="w-full border-b border-slate-500 pb-2 text-lg font-[Lora] uppercase">
                Add New Blog
            </h1>
            <form onSubmit={handleSubmit} className="w-full md:w-[90%] mx-auto pt-10">
                <div className='w-[100%]'>
                     {/* Blog tile & subtitle */}
                    <div className='w-[100%] my-4 flex flex-col lg:flex-row gap-3 items-center justify-center'>
                         {/* Blog title */}
                         <div className='w-full'>
                            <label className="block text-gray-800 mb-2">Blog Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-gray-700 outline-none rounded bg-slate-100"
                                required
                            />
                        </div>

                        {/* Subtitle */}
                        <div className='w-full'>
                            <label className="block text-gray-800 mb-2">Subtitle:</label>
                            <input
                                type="text"
                                name="subtitle"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-gray-700 outline-none rounded bg-slate-100"
                                required
                            />
                        </div>
                       
                    </div>

                    {/* Blog imageUrl & author name */}
                    <div className='w-[100%] my-4 flex flex-col lg:flex-row gap-3 items-center justify-center'>
                         
                         <div className='w-full'>
                            <label className="block text-gray-800 mb-2">Image Url:</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-gray-700 outline-none rounded bg-slate-100"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div className='w-full'>
                            <label className="block text-gray-800 mb-2">Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={'admin'}
                                disabled
                                className="w-full px-4 py-3 text-sm text-gray-700 outline-none rounded bg-slate-100"
                            />
                        </div>
                       
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-800 mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={8}
                            className="w-full resize-none px-4 py-3 text-sm text-gray-700 rounded outline-none bg-slate-100"
                        ></textarea>
                    </div>

                </div>

                <button type="submit" className="w-full bg-red-500 text-white py-3 px-6 mt-4 uppercase font-medium rounded hover:bg-red-600">
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
