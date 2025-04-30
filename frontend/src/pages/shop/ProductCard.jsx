import React, { useContext } from 'react'
import RatingStar from '../../components/RatingStar'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contextApi/CartContext'


const ProductCard = ({ products }) => {
    const {addToCart} = useContext(CartContext);
    return (
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                products.map((product, index) => (
                    <div key={index} className='product__card'>
                        <div className='relative'>
                            <Link to={`/shop/c/${product._id}`}>
                                <img src={product.image} alt="Card" className='max-h-96 md:h-64 w-full object-cover transition-all duration-300 hover:scale-105' />
                            </Link>

                            <div className='hover:block absolute top-3 right-3'>
                                <button>
                                    <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"
                                    onClick={()=> addToCart(product)}
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <div className='product__card__content'>
                          <h4>{product.name}</h4>
                          <p>${product.price} {product.oldPrice ? <s>${product.oldPrice}</s> : null}</p>
                        <RatingStar rating={product.rating}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductCard