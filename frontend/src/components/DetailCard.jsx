import React from 'react'
import { useContext, useState } from 'react';
import RatingStar from './RatingStar.jsx';
import { CartContext } from '../contextApi/CartContext.jsx';


const DetailCard = ({ data }) => {

  const { addToCart } = useContext(CartContext);

  // Allow multiple selected sizes, default to first size from array
  const [selectedSizes, setSelectedSizes] = useState([data?.sizes[0]]);

  // Toggle size selection
  const toggleSize = (size) => {
    setSelectedSizes([size]); // Set the selected size as a new array containing only one item
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

  return (

    <section className='rounded min-w-[80%] w-full h-full'>
      <div className='flex flex-col md:flex-row gap-8 items-center justify-center'>


        {/* Product Image */}
        <div data-aos='fade-up' className="w-full md:w-1/2 max-w-[300px] rounded-md overflow-hidden relative">
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
        <div className='w-full md:w-1/2 pl-6' data-aos='fade-up'>
          <h3 className='text-3xl font-semibold mb-4 font-[Lora]'>{data?.name}</h3>
          <div className='flex justify-between md:pr-10 items-center' data-aos='fade-right'>
            <p className='text-xl text-primary mb-4'>
              ${data?.price}
              {data?.oldPrice && <s className='text-sm ml-1'>${data?.oldPrice}</s>}
            </p>
            {
              data?.stock > 0 ? (<p className='text-lg font-medium text-green-600 bg-green-200 py-2 px-3 rounded-md mb-4'>In stock</p>)
                : (<p className='text-lg font-medium text-red-600 bg-red-200 py-2 px-3 rounded-md mb-4'>Out of stock</p>)
            }
          </div>
          <p className='text-gray-400 mb-4'>{data?.description}</p>

          {/* Other Info */}
          <div data-aos='fade-right'>
            <p className='mb-1 capitalize'><strong>Category : </strong>{data?.category}</p>
            <p className='mb-1 capitalize'><strong>Color : </strong>{data?.color}</p>
            <div className='flex items-center gap-1 mt-1'>
              <strong>Rating : </strong>
              <RatingStar rating={data?.rating} />
            </div>
          </div>

          {/* Beautiful Size Selection Boxes */}
         {
          data?.sizes.length > 0 && (
            <div className="mt-6" data-aos='zoom-in-up'>
            <label className="block font-semibold mb-2 text-lg">Choose Size(s):</label>
            <div className="flex gap-3 flex-wrap">
              {data?.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border-2 rounded-sm uppercase font-medium text-sm transition-all duration-200 
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
          )
         }

          {/* Add to Cart Button */}
          <button className={`mt-6 mb-3 btn`}
            disabled={data?.stock <= 0}
            onClick={() => {
              addToCart({ ...data, size: selectedSizes[0] });
            }}

          >
            Add To Cart
            <span><i className="ri-arrow-right-line"></i></span>
          </button>
        </div>
      </div>
    </section>

  )
}

export default DetailCard