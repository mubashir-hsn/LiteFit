import React, { useContext, useState } from 'react'
import RatingStar from '../../components/RatingStar'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contextApi/CartContext'
import DetailCard from '../../components/DetailCard'


const ProductCard = ({ products }) => {
    const { addToCart } = useContext(CartContext);
    const [selectProduct, setSelectProduct] = useState(null)
    return (
        <>
            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    products.map((product, index) => (
                        <div key={index} className='product__card' data-aos='zoom-in-up'>
                            <div className='relative product__content h-72 overflow-hidden transition-all duration-1000'>
                                <Link to={`/shop/c/${product._id}`}>
                                    <img src={product.image} alt="Card" className='h-72 w-full object-cover transition-all duration-1000' />
                                </Link>

                                <div className='cart__btn flex flex-col gap-6 items-end justify-center hover:pr-4'>
                                    <div class="tooltip tooltip-left tooltip-error" data-tip="Add To Cart">
                                    <button>
                                        <i className="ri-shopping-cart-2-line rounded bg-primary p-3 text-white"
                                            onClick={() =>  addToCart({ ...product, size: product?.sizes[0] })}
                                        ></i>
                                    </button>
                                    </div>
                                    <div class="tooltip tooltip-left" data-tip="View Product">
                                    <button>
                                        <i className="ri-eye-fill rounded bg-white p-3 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setSelectProduct(product)}
                                        ></i>
                                    </button>
                                    </div>
                                </div>

                            </div>

                            <div className='product__card__content'>
                                <Link to={`/shop/c/${product?._id}`} className=' cursor-pointer hover:text-blue-500 hover:underline font-[Lora] font-semibold text-lg'>{product.name}</Link>
                                <p>${product.price} {product.oldPrice ? <s>${product.oldPrice}</s> : null}</p>
                                <RatingStar rating={product.rating} />
                            </div>
                        </div>
                    ))
                }


            </div>

            <div>
                {
                    selectProduct && (
                        <div className="popup-overlay" onClick={() => setSelectProduct(null)}>
                            <button
                                className="popup-close"
                                onClick={() => setSelectProduct(null)}
                            >
                                &times;
                            </button>
                            <div data-aos='zoom-in-up' className='max-w-[85%] max-h-[85%] overflow-y-auto rounded-md bg-white p-6 flex justify-center items-center' onClick={(e) => e.stopPropagation()}>
                                <DetailCard data={selectProduct} />
                            </div>

                        </div>
                    )
                }
            </div>

        </>
    )
}

export default ProductCard