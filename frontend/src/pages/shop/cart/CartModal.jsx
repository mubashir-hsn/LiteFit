import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../../contextApi/CartContext.jsx'
import OrderSummary from '../orderPages/OrderSummary.jsx';
import { Link } from 'react-router-dom';
const CartModal = () => {


    useEffect(()=>{
        window.scrollTo(0,0)
      },[])

    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
    return (
        <>
            <section className='section__container bg-primary-light'>
                <h1 className='section__header capitalize'>Shopping Cart</h1>
                <div className='section__subheader'>
                    <span className='hover:text-primary text-gray-600'><Link to='/'>Home</Link></span>
                    <span><i className="ri-arrow-right-s-line"></i></span>
                    <span className='text-gray-500'>Shop</span>
                    <span><i className="ri-arrow-right-s-line"></i></span>
                    <span className='text-gray-400 text-sm'>Shopping Cart</span>
                </div>
            </section>

            <section className='w-[90%] pt-10 mx-auto pb-0'>
                <div className='flex justify-between items-center '>
                    <h4 className='text-xl md:text-2xl uppercase font-medium font-[Lora] '>Your Cart Items</h4>
                </div>
                <div className='border-b-2 mt-3 mb-5'></div>
            </section>

            <div className='flex flex-col justify-center md:flex-row gap-5 px-2 mb-5'>

                <div className=" w-full md:w-[60%] lg:[70%] bg-white">
                    <div className='p-4 mt-4'>
                        {/* Cart Details */}
                        {
                             cartItems.length > 0 ? (
                               <div>
                                   {
                                    cartItems.map((item, index) => (
                                        <div key={index} className='flex flex-col border-b md:flex-row md:items-center md:justify-between md:shadow-md md:p-5 p-2 mb-4'>
                                            <div className='w-full min-w-full place-content-between place-items-start grid grid-cols-2 lg:grid-cols-3 py-2'>
                                                {/* Product image & item number */}
                                                <div className='flex justify-center items-center'>
                                                    <div className='flex items-center justify-center px-1'>
                                                        <span className='mr-2 md:mr-3 font-semibold'>{index + 1}.</span>
                                                        <img src={item.image} className='w-[40px] h-[33px] md:w-[55px] md:h-[48px] object-cover mr-4' alt="img" />
                                                    </div>
                                                    {/* Product name & price */}
                                                    <div>
                                                        <h5 className='text-[12px] sm:text-sm md:text-[16px] font-medium'>{item.name}</h5>
                                                        <p className='text-gray-700 text-[10px] sm:text-[12px] md:text-sm'>${Number(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className='hidden lg:block'></div>
                                                {/* Product quantity & delete */}
                                                <div className='flex justify-end items-center mt-2'>
                                                    <button
                                                        onClick={() => decreaseQuantity(item._id)}
                                                        className='flex justify-center items-center size-6 px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-6'
                                                    >-</button>
                                                    <span className='px-2 text-center mx-1'>{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQuantity(item._id)}
                                                        className='flex justify-center items-center size-6 px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                                                    >+</button>
                                                    <div className='ml-5'>
                                                        <button onClick={() => removeFromCart(item._id)} className='bg-primary hover:bg-primary-dark px-1 rounded text-white mr-2'><i className="ri-delete-bin-6-fill"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                   }
                                
                               </div>


                            ) : (
                                <div className='flex flex-col gap-5 items-center justify-center'>
                                    <p className='font-medium'>Your cart is empty.</p>
                                    <Link to={'/'} className='py-3 px-4 text-lg rounded-sm bg-slate-700 text-white'>Shop Now</Link>
                                </div>
                            )

                        }





                    </div>
                    {
                        cartItems.length > 0 && <div className='flex justify-between items-center px-5'>

                            <div className='flex items-center justify-center'>
                                <Link onClick={() => clearCart()}
                                    className='px-4 py-3 text-sm font-medium border border-primary bg-white text-red-500 hover:bg-red-500 h hover:text-white transition-all duration-300'
                                >
                                    <span className='text-sm uppercase tracking-wider'>Clear Cart</span>
                                    {/* <i className="ri-delete-bin-fill"></i> */}
                                </Link>
                            </div>
                            <div className='flex items-center justify-center'>
                                <Link to='/'
                                    className='px-3 py-3 text-sm uppercase tracking-wider font-medium hover:bg-slate-800 border border-slate-600 hover:text-white transition-all duration-300'
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    }

                </div>

                <div className='w-full md:w-[40%] lg:w-[30%]'>
                    {/* Product Calculation */}
                    <div>
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartModal