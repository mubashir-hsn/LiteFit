import React, { useContext } from 'react';
import { CartContext } from '../../../contextApi/CartContext.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contextApi/AuthProvider.jsx';
import { useOrderSummary } from '../../../contextApi/OrderSummaryContext.jsx';

const OrderSummary = () => {
  const {authUser} = useAuth();
  const { cartItems } = useContext(CartContext);
  const { subtotal, tax, discountAmount, total, discountCode, setDiscountCode, handleDiscount, discountApplied } = useOrderSummary();

  const isCartEmpty = cartItems.length === 0;


  return (
    <>
      {/* Discount Code Section */}
      {cartItems.length > 0 && (
        <div className='py-4 px-6' data-aos='fade-right'>
          <h2 className='text-xl font-[Lora] uppercase'>Discount codes</h2>
          <div className='flex mt-4'>
            <input
              disabled= {discountApplied}
              onChange={(e) => setDiscountCode(e.target.value)}
              value={discountCode}
              className='w-full py-3 px-4 h-[50px] text-sm outline-none border border-slate-400'
              type='text'
              placeholder='Coupon code'
            />
            <button
              disabled={discountApplied}
              onClick={handleDiscount}
              className='text-sm font-medium h-[50px] uppercase py-3.5 px-5 tracking-widest bg-gray-900 text-white'
            >
              Apply
            </button>
          </div>
           { discountApplied && <small className='text-green-500 pl-2 pt-2'>Discount applied.</small>}
        </div>
      )}

      {/* Order Summary Section */}
      <div className='bg-primary-light mt-5 text-base py-6'>
        <h2 className='text-xl font-medium text-center font-[Lora] uppercase text-text-dark mb-4'>Order Summary</h2>
        <div className='px-12 py-4 space-y-2'>
          <div className='flex justify-between items-center font-medium'>
            <p>Items</p>
            <p>{cartItems.length}</p>
          </div>
          <div className='flex justify-between items-center font-medium'>
            <p>Sub Total</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between items-center font-medium'>
            <p>Tax ({(0.02 * 100)}%)</p>
            <p>${tax.toFixed(2)}</p>
          </div>

          {/* Show Discount if Applied */}
          {discountApplied && cartItems.length > 0  && (
            <div className='text-primary flex justify-between items-center font-medium'>
              <p>Discount</p>
              <p>${discountAmount.toFixed(2)}</p>
            </div>
          )}

          <div className='flex justify-between items-center border border-t border-t-black pt-1 font-medium mt-2'>
            <p>Total</p>
            <p>{cartItems.length > 0 ? (<div>${total.toFixed(2)}</div>) : 0}</p>
          </div>

          <div className='py-3 flex items-center justify-center'>
            {isCartEmpty ? (
              <button
                disabled
                className='px-4 py-3 tracking-wider mt-4 text-white bg-gray-500 cursor-not-allowed flex items-center justify-center'
              >
                <span className='uppercase text-[16px]'>Proceed To Checkout</span>
              </button>
            ) : (
              <Link
                to={`${authUser ? "/shop/cart-checkout" : "/login"}`}
                className='px-4 py-3 tracking-wider mt-4 text-white bg-gray-900 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center'
              >
                <span className='uppercase text-[16px]'>Proceed To Checkout</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
