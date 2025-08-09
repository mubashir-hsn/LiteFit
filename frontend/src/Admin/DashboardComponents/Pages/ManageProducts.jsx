import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import GetAllProducts from '../../../contextApi/GetAllProducts.jsx';
import axios from 'axios';

const ManageProducts = () => {
    const [products, loading] = GetAllProducts(); // Fetch products
    const [activeTab, setActiveTab] = useState('male');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleDelete = async (id) => {
        try {
            // Add delete logic here
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/product/delete/${id}`, { withCredentials: true })
            if (res.status === 200) {
                toast.success('Product deleted successfully.');
                setFilteredProducts((prevProduct) => prevProduct.filter((product) => product._id !== id));
            }
        } catch (error) {
            toast.error("Failed to delete product. Please try again");
            console.log('Failed to delete product: ', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'male') {
            const menProducts = products.filter(product => product.gent?.toLowerCase() === 'men');
            setFilteredProducts(menProducts);
        } else if (activeTab === 'female') {
            const womenProducts = products.filter(product => product.gent?.toLowerCase() === 'women');
            setFilteredProducts(womenProducts);
        }
    }, [activeTab, products]);



    return (
        <div>
            <div className="w-full p-6 bg-white">
                <h3 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100 mb-5">Manage Products ({filteredProducts?.length})</h3>

                {
                    loading ? (
                        // Skeleton Loader
                        <div className="flex flex-wrap gap-5 mt-5">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="w-full p-4 bg-gray-200 rounded-md animate-pulse h-20"></div>
                            ))}
                        </div>
                    ) : (

                        <div>
                            <div className="flex border-b mb-4">
                                <button
                                    onClick={() => setActiveTab('male')}
                                    className={`px-4 py-2 font-medium ${activeTab === 'male' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
                                >
                                    Male
                                </button>
                                <button
                                    onClick={() => setActiveTab('female')}
                                    className={`px-4 py-2 font-medium ${activeTab === 'female' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
                                >
                                    Female
                                </button>
                            </div>

                            <div className='mt-5'>
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border rounded-lg mb-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium">{index + 1}.</span>
                                            <img
                                                src={product?.image}
                                                alt="Product"
                                                className="w-12 h-12 md:h-16 md:w-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <Link to={`/shop/c/${product?._id}`} className="text-[15px] text-black no-underline hover:text-red-600 md:text-lg font-semibold">{product?.name}</Link>
                                                <p className="text-sm text-gray-500">${product?.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/admin/dashboard/update-product/${product?._id}`}
                                                className="px-3 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                            >
                                                <i className="ri-edit-2-line"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product?._id)}
                                                className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                            >
                                                <i className="ri-delete-bin-6-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredProducts.length === 0 && (
                                    <p className="text-center text-gray-500">No products found for {activeTab}.</p>
                                )}
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default ManageProducts;
