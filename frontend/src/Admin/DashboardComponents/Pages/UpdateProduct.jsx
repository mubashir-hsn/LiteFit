import { useState, useEffect } from 'react';
import GetAllProducts from '../../../contextApi/GetAllProducts.jsx';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import GetCategories from '../../../contextApi/GetCategories.jsx';

// const categories = ['accessories', 'kurta', 'pentshirt', 'pentcoat', 'hoodie', 'footwear', 'cosmetics', 'dress'];
const colors = ['black', 'green', 'gold', 'red', 'yellow', 'pink', 'blue', 'beige', 'brown', 'grey', 'white'];
const gents = ['men', 'women', 'other'];

const sizeOptions = {
    'footwear': [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    'pentshirt': ['s', 'm', 'l', 'xl', 'xxl'],
    'pentcoat': ['s', 'm', 'l', 'xl', 'xxl'],
    'hoodie': ['s', 'm', 'l', 'xl', 'xxl'],
    'kurta': ['s', 'm', 'l', 'xl', 'xxl'],
    'dress': ['s', 'm', 'l', 'xl', 'xxl'],
    'accessories': [],
    'cosmetics': [],
};

const UpdateProduct = () => {
    const { id } = useParams();
    const [products, loading] = GetAllProducts();
    const [categories] = GetCategories();
    const [productData, setProductData] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [availableSizes, setAvailableSizes] = useState([]);

    // This effect runs once when the component mounts and data is ready.
    useEffect(() => {
        if (!loading && products) {
            const product = products.find((product) => product._id === id);
            if (product) {
                setProductData({
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    color: product.color,
                    gent: product.gent,
                    stock: product.stock,
                });
                
                // Set the selected sizes from the product data
                setSelectedSizes(product.sizes || []);
                
                // Set the list of available sizes based on the product's category
                setAvailableSizes(sizeOptions[product.category] || []);

                // If a product image exists, set it as the preview
                if (product.image) {
                    setImagePreview(product.image);
                }
            }
        }
    }, [loading, products, id]);

    // This effect runs whenever the category changes to update the available sizes.
    useEffect(() => {
        if (productData) {
            const category = productData.category;
            setAvailableSizes(sizeOptions[category] || []);
            // Only reset selected sizes if the category is changed manually
            if (productData.category !== products.find(p => p._id === id)?.category) {
                setSelectedSizes([]);
            }
        }
    }, [productData?.category, products, id]);

    const toggleSize = (size) => {
        setSelectedSizes((prevSizes) =>
            prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData({ ...productData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (
            !productData.name ||
            !productData.category ||
            !productData.description ||
            !productData.price ||
            !productData.gent ||
            !productData.stock ||
            (availableSizes.length > 0 && selectedSizes.length === 0)
        ) {
            toast.error('All fields are required, including at least one size for this category.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('category', productData.category);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('color', productData.color);
            formData.append('gent', productData.gent);
            formData.append('stock', productData.stock);
            formData.append('sizes', JSON.stringify(selectedSizes));

            if (productData.image instanceof File) {
                formData.append('image', productData.image);
            }

            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/api/product/update-product/${id}`,
                formData,
                { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
            );
            
            if (response.status === 201) {
                toast.success('Product updated successfully!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update the product.');
        }
    };

    if (loading || !productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-5 bg-white">
            <h1 className='w-full border-b border-slate-500 pb-3 text-lg font-[Lora] uppercase'>Update Your Product</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <div className='flex flex-col mt-10 lg:flex-row w-full gap-6'>
                    {/* Left Section */}
                    <div className="flex-1 space-y-6">
                        {/* Product Name */}
                        <div className="">
                            <label className="block text-gray-800 mb-2">Product Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-slate-100 rounded outline-none"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-800 mb-2">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 outline-none rounded bg-slate-100"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-800 mb-2">Description:</label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                rows={5}
                                className="w-full resize-none px-4 py-2 rounded outline-none bg-slate-100"
                            ></textarea>
                        </div>

                        {/* Size Selection - Conditionally rendered */}
                        {availableSizes.length > 0 && (
                            <div className="mt-6">
                                <label className="block font-semibold mb-2 text-lg">Choose Size(s):</label>
                                <div className="flex gap-3 flex-wrap">
                                    {availableSizes.map((size) => (
                                        <span
                                            key={size}
                                            className={`px-5 py-2 border-2 uppercase rounded-md font-medium text-lg transition-all duration-200 
                                                ${selectedSizes.includes(size)
                                                    ? 'bg-primary text-white border-primary scale-105 shadow-lg'
                                                    : 'border-gray-400 text-gray-600 hover:bg-gray-200 cursor-pointer'}`}
                                            onClick={() => toggleSize(size)}
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 space-y-6">
                        {/* Category */}
                        <div>
                            <label className="block text-gray-800 mb-2">Category:</label>
                            <select
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-slate-100 outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat?._id} value={cat?.name}>{cat?.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Gent */}
                        <div>
                            <label className="block text-gray-800 mb-2">Gent:</label>
                            <select
                                name="gent"
                                value={productData.gent}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-slate-100 outline-none"
                            >
                                {gents.map((gender) => (
                                    <option className='' key={gender} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-gray-800 mb-2">Color:</label>
                            <select
                                name="color"
                                value={productData.color}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-slate-100 outline-none"
                            >
                                {colors.map((col) => (
                                    <option key={col} value={col}>{col}</option>
                                ))}
                            </select>
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-gray-800 mb-2">Add Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2 outline-none rounded bg-slate-100"
                                required
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-gray-800 mb-2">Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-gray-800 py-2"
                            />
                            {(imagePreview || productData.image) && (
                                <img
                                    src={imagePreview || productData.image}
                                    alt="Product Preview"
                                    className="mt-3 w-28 h-24 object-cover border rounded"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 px-6 mt-8 uppercase font-medium rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;