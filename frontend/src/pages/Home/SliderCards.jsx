import React, { useContext } from 'react'
import RatingStar from '../../components/RatingStar.jsx'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contextApi/CartContext.jsx'

const SliderCards = ({ products }) => {
    const { addToCart } = useContext(CartContext);
    return (
        <div>
           <div className="relative mb-5 w-full md:w-[320px] lg:w-[280px] h-[380px] overflow-hidden rounded-lg bg-white shadow-md">
                <Link to={`/shop/c/${products?._id}`} className='w-full h-56 box-border overflow-hidden'>
                    <img className="h-56 w-full rounded-t-lg object-cover transition-all duration-300 hover:scale-105" src={products?.image} alt="product image" />
                </Link>
                <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">Deal</span>
                <div className="mt-4 px-5 pb-5">

                    <h5 className="text-lg font-semibold font-[Lora] overflow-ellipsis tracking-tight text-slate-900">{products?.name}</h5>

                    <div className="mt-2.5 mb-1 flex items-center">
                    <span className="mr-2 rounded bg-yellow-300 px-2.5 py-0.5 text-xs font-semibold">{products?.rating}</span>
                        <RatingStar rating={products?.rating} />
                    </div>

                    <div className="flex items-center justify-between">
                        <p>
                            <span className="text-xl mr-1 font-bold text-slate-900">${products?.price}</span>
                            <span className="text-[12px] text-slate-900">{products?.oldPrice ? <s>${products?.oldPrice}</s> : null}</span>
                        </p>
                        <div onClick={() => addToCart(products)} className='flex items-center justify-center cursor-pointer rounded-md px-3 py-2 bg-primary  text-white hover:bg-indigo-500 transition-all duration-300'>
                            <i className="ri-shopping-cart-2-line mr-1 text-xl"></i>
                            <span className='text-center text-sm font-medium uppercase'>Shop</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderCards