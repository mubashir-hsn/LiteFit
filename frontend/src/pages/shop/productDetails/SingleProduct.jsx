import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingStar from '../../../components/RatingStar.jsx';
import { CartContext } from '../../../contextApi/CartContext.jsx';
import GetAllProducts from '../../../contextApi/GetAllProducts.jsx';
import GetAllReviews from '../../../contextApi/GetAllReviews.jsx';
import ReviewCart from '../review/ReviewCart.jsx';
import Carousal from '../../Home/Carousal.jsx';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams();
  const [products, loading] = GetAllProducts();
  const data = products.find(product => product._id === id);
  const [reviews] = GetAllReviews();
  const { addToCart } = useContext(CartContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Allow multiple selected sizes, default to ['XS']
  const [selectedSizes, setSelectedSizes] = useState(['xs']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/product/related/${id}`, {
          withCredentials: true
        });
        setRelatedProducts(response.data);
      } catch (error) {
        console.log('Error while getting related products:', error);
      }
    };

    getRelatedProducts();
  }, []);

  // Toggle size selection
  const toggleSize = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size) // Remove size if already selected
        : [...prevSizes, size] // Add size if not selected
    );
  };

  // zoom effect on product image
  const [zoomStyle, setZoomStyle] = useState({ transform: "scale(1)" });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    
    setZoomStyle({
      transform: "scale(1.9)",
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)" });
  };
  if (loading) return <div>Loading....</div>;

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h1 className='section__header capitalize'>Product Details</h1>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row gap-8 items-center justify-center'>


          {/* Product Image */}
          <div className="w-full md:w-1/2 max-w-[400px] rounded-md overflow-hidden relative">
            <img
              src={data?.image}
              alt="Product"
              className="w-full max-h-[400px] bg-contain rounded-md transition-transform duration-300"
              style={zoomStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Product Details */}
          <div className='w-full md:w-1/2 pl-6'>
            <h3 className='text-3xl font-semibold mb-4 font-[Lora]'>{data?.name}</h3>
           <div className='flex justify-between md:pr-10 items-center'> 
           <p className='text-xl text-primary mb-4'>
              ${data?.price}
              {data?.oldPrice && <s className='text-sm ml-1'>${data?.oldPrice}</s>}
            </p>
            {
              data?.stock>0 ? (<p className='text-lg font-medium text-green-600 bg-green-200 py-2 px-3 rounded-md mb-4'>In stock</p>) 
              : (<p className='text-lg font-medium text-red-600 bg-red-200 py-2 px-3 rounded-md mb-4'>Out of stock</p>)
            }
           </div>
            <p className='text-gray-400 mb-4'>{data?.description}</p>

            {/* Other Info */}
            <div>
              <p className='mb-1 capitalize'><strong>Category : </strong>{data?.category}</p>
              <p className='mb-1 capitalize'><strong>Color : </strong>{data?.color}</p>
              <div className='flex items-center gap-1 mt-1'>
                <strong>Rating : </strong>
                <RatingStar rating={data?.rating} />
              </div>
            </div>

            {/* Beautiful Size Selection Boxes */}
            <div className="mt-6">
              <label className="block font-semibold mb-2 text-lg">Choose Size(s):</label>
              <div className="flex gap-3 flex-wrap">
                {data?.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-5 py-2 border-2 uppercase rounded-md font-medium text-lg transition-all duration-200 
                      ${selectedSizes.includes(size)
                        ? 'bg-primary text-white border-primary scale-105 shadow-lg'
                        : 'border-gray-400 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button  className={`mt-6 btn`}
              disabled={data?.stock <= 0}
              onClick={() => {
                const itemWithSize = { ...data, size: Array.isArray(selectedSizes) ? selectedSizes : [selectedSizes] }; // Ensure array
                addToCart(itemWithSize);
              }}

            >
              Add To Cart
              <span><i className="ri-arrow-right-line"></i></span>
            </button>
          </div>
        </div>
      </section>

      {/* Display Reviews */}
      <section>
        <ReviewCart reviews={reviews} />
      </section>

      {/* Show Related Products */}
      {relatedProducts.length > 0 && (
        <section className='section__container'>
          <h2 className='text-[2rem] px-2 font-extrabold font-[Lora] text-black capitalize border-b-2 border-b-gray-300'>You may also like</h2>
          <div className='mt-5'>
            <Carousal products={relatedProducts} />
          </div>
        </section>
      )}
    </>
  );
};

export default SingleProduct;
