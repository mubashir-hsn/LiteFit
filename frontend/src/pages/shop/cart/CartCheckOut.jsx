import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../../contextApi/CartContext.jsx'
import toast from 'react-hot-toast'
import { useAuth } from '../../../contextApi/AuthProvider.jsx';
import axios from 'axios'
import { useOrderSummary } from '../../../contextApi/OrderSummaryContext.jsx'

const CartCheckOut = () => {

  const { authUser } = useAuth();
  const { subtotal, tax, discountAmount, total, discountCode, setDiscountCode, handleDiscount, discountApplied, setDiscountApplied } = useOrderSummary();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
      fullName: authUser ? authUser?.user?.username : "",
      email: authUser ? authUser?.user?.email : "",
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      ordernote: ''
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }


  const handleCoupenCode = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (discountApplied) {
      setIsOpen(false)
    }
  }, [discountApplied])
  // handle Order Place Submit
  const handleOrderPlace = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!authUser) {
      toast.error("Login first or create an account.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Ensure all required fields are filled
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.country ||
      !formData.postalCode
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (formData.phone < 0 || formData.phone.length !== 11) {
      toast.error("Enter a valid 11 digit phone number.")
      return;
    }



    const orderData = {
      userId: authUser?.user?._id,
      products: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        sizes: item.size
      })),
      totalAmount: total,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        ordernote: formData.ordernote,
      },
      paymentStatus: paymentMethod === "cash" ? "Pending" : "Completed",
      orderStatus: "Pending",
    };

    try {
      setIsProcessing(true);

      if (paymentMethod == 'cash') {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/orders/create-order`, orderData, { withCredentials: true });
        if (response.status === 201) {
          setTimeout(() => { window.location.reload() }, 500);
          // clear the cart
          sessionStorage.removeItem('cart');
          // move to succcess page
          navigate(`/shop/cart-checkout/${response?.data?._id}`);
          setFormData({
            fullName: authUser?.user?.username || "",
            email: authUser?.user?.email || "",
            phone: "",
            address: "",
            city: "",
            country: "",
            postalCode: "",
            ordernote: "",
          });
          setDiscountApplied(false);

        } else {
          toast.error("Failed to place order. Please try again.");
        }
      }
      else {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/orders/create-checkout-session`, orderData);
        window.location.href = data.url; // Redirect to Stripe checkout

      }

    } catch (error) {
      setIsProcessing(false);
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };



  return (
    <>
      <section className='section__container bg-primary-light'>
        <h1 className='section__header capitalize'>Check Out</h1>
        <div className='section__subheader' data-aos='fade-left'>
          <span className='hover:text-primary text-gray-600'><Link to='/'>Home</Link></span>
          <span><i className="ri-arrow-right-s-line"></i></span>
          <Link to={'/shop/cart'} className='hover:text-primary text-gray-600'>Cart</Link>
          <span><i className="ri-arrow-right-s-line"></i></span>
          <span className='text-gray-400 text-sm'>Check Out</span>
        </div>
      </section>

      <section className='section__container flex flex-col lg:flex-row gap-5 justify-around items-start'>
        <div className='w-full lg:w-[60%] space-y-10 flex flex-col justify-center items-center'>
          {
            !discountApplied && <div data-aos='fade-up' className='w-full bg-primary-light border-t-2 border-primary text-sm p-4 flex justify-start items-center'>
              <i className="mr-4 ri-price-tag-3-line text-lg"></i>
              <Link onClick={handleCoupenCode}> Have a coupon? Click here to enter your code</Link>
            </div>
          }

          <div className='w-full flex flex-col items-start justify-center gap-5'>
            <div className='w-full border-b-2 border-slate-200 ' data-aos='fade-left'>
              <h1 className='font-[Lora] text-xl uppercase text-left py-2'>Billing Details</h1>
            </div>
            <form className='w-full flex flex-col items-start justify-center gap-5' data-aos='fade-up'>
              <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-5 font-light' data-aos='fade-up'>
                <div className='w-full'>
                  <label htmlFor="fullName">Full Name<sup className='text-primary text-xs'>*</sup></label>
                  <input type="text" disabled name='fullName' value={formData.fullName} onChange={handleChange} id='fullName' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
                </div>
              </div>
              <div data-aos='fade-up' className='w-full flex flex-col lg:flex-row items-center justify-center gap-5 font-light'>
                <div className='w-full'>
                  <label htmlFor="phone">Phone<sup className='text-primary text-xs'>*</sup></label>
                  <input type="number" name='phone' value={formData.phone} onChange={handleChange} id='phone' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
                </div>
                <div data-aos='fade-up' className='w-full'>
                  <label htmlFor="email">Email<sup className='text-primary text-xs'>*</sup></label>
                  <input type="email" disabled value={formData.email} onChange={handleChange} name='email' id='email' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
                </div>
              </div>

              <div className='w-full' data-aos='fade-up'>
                <label htmlFor="address">Address<sup className='text-primary text-xs'>*</sup></label>
                <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder='Street Address' id='address' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
                <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder='Apartment,suite,unite etc(optional)' id='address1' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
              </div>
              <div className='w-full' data-aos='fade-up'>
                <label htmlFor="city">Town/City<sup className='text-primary text-xs'>*</sup></label>
                <input type="text" name='city' value={formData.city} onChange={handleChange} id='city' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
              </div>
              <div className='w-full' data-aos='fade-up'>
                <label htmlFor="country">Country<sup className='text-primary text-xs'>*</sup></label>
                <input type="text" name='country' value={formData.country} onChange={handleChange} id='country' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
              </div>
              <div className='w-full' data-aos='fade-up'>
                <label htmlFor="postalCode">Post Code/ZIP<sup className='text-primary text-xs'>*</sup></label>
                <input type="text" name='postalCode' value={formData.postalCode} onChange={handleChange} id='postalCode' placeholder='eg 4001' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
              </div>

              <div className='w-full' data-aos='fade-up'>
                <input type="checkbox" checked name="order" id="order" className='p-2 text-xl mr-3' />
                <label htmlFor="order">Notes about your order, e.g. special notes for delivery.</label>
              </div>
              <div className='w-full' data-aos='fade-up'>
                <label htmlFor="ordernote">Order notes<sup className='text-primary text-xs'>*</sup></label>
                <input type="text" name='ordernote' value={formData.ordernote} onChange={handleChange} id='ordernote' placeholder='Notes about your order, e.g. special notes for delivery.' className='my-2 w-full py-3 px-4 text-sm border border-slate-300 outline-none' />
              </div>
            </form>
          </div>
        </div>

        <div data-aos='fade-up' className='w-full md:w-[40%] lg:w-[30%] space-y-4  mt-5 rounded-md flex flex-col items-start justify-center'>

          {/* Discount Code Section */}

          <div className='w-full space-y-4 bg-primary-light rounded-md p-7 flex flex-col items-start justify-center'>
            <div className='w-full border-b border-slate-800'>
              <h1 className='text-2xl pb-2 uppercase font-semibold font-[Lora]'>Your Order</h1><hr />
            </div>
            <div className='w-full'>
              <div className='flex items-center justify-between font-medium py-3 text-lg'>
                <p>Products</p>
                <p>Total</p>
              </div>

              <ol className='flex flex-col'>
                {cartItems.map((item, index) => (
                  <li key={index} className='flex items-center justify-between font-light'>
                    <p><span className='mr-1 font-medium'>{index + 1}.</span><span>{item?.name}</span></p>
                    <span>${(item?.price * item?.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ol>

              <div className='flex items-center justify-between py-2 mt-3 border-t border-slate-400'>
                <p>Sub Total</p>
                <p className='text-primary'>${subtotal.toFixed(2)}</p>
              </div>

              <div className='flex items-center justify-between'>
                <p>Tax ({(0.02 * 100)}%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>

              {
                discountApplied && (
                  <div className='flex justify-between items-center'>
                    <p>Discount</p>
                    <p>${discountAmount.toFixed(2)}</p>
                  </div>
                )}

              <div className='uppercase flex items-center justify-between text-lg py-2 font-medium border-t border-gray-500 mt-3'>
                <p>Total</p>
                <p className='text-primary'>${total.toFixed(2)}</p>
              </div>
            </div>
            <div className='mt-8'>
              <h2 className="text-lg font-medium mb-4">Select Payment Method:</h2>
              <form className='flex gap-5'>
                {/* Cash on Delivery */}
                <label className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="form-radio text-red-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-700">Cash on Delivery</span>
                </label>

                {/* Credit Card */}
                <label className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={() => setPaymentMethod("credit")}
                    className="form-radio text-red-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-700">Credit Card</span>
                </label>
              </form>
            </div>
            {
              paymentMethod == 'cash' ? (
                <div className='w-full'>
                  <button onClick={handleOrderPlace} className='w-full px-4 py-3 bg-slate-900 hover:bg-slate-950 text-white uppercase tracking-widest'>Place Order</button>
                </div>
              ) : (
                <div className="w-full">
                  <button
                    onClick={handleOrderPlace}
                    disabled={isProcessing}
                    className={`w-full px-4 py-3 text-white uppercase tracking-widest ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-950"
                      }`}
                  >
                    {isProcessing ? "Processing Payment..." : "Place Order"}
                  </button>
                </div>
              )

            }
          </div>
        </div>
      </section>

      <section className={`w-full h-full bg-black/80 fixed left-0 z-50 flex items-center justify-center top-0 transition-all duration-500 ${isOpen ? 'block' : 'hidden'}`}>

        <div className={`p-7 w-96 h-64 flex flex-col items-start justify-center bg-white space-y-5 rounded-xl`}>
          <h2 className='text-xl font-[Lora] uppercase text-left'>Discount codes</h2>
          <div className='w-full flex flex-col gap-6 justify-center items-center'>
            <input
              onChange={(e) => setDiscountCode(e.target.value)}
              value={discountCode}
              className='w-full py-3 px-4 h-[50px] text-sm outline-none border border-slate-400'
              required
              type="text"
              placeholder='Coupon code'
            />
            <div className=' w-full flex justify-around items-center'>
              <button
                onClick={handleDiscount}
                className='text-sm font-medium h-[50px] uppercase py-3.5 px-5 rounded tracking-widest bg-gray-900 text-white'>
                Apply
              </button>
              <button onClick={handleCoupenCode} className='text-sm font-medium h-[50px] uppercase py-3.5 px-5 rounded tracking-widest bg-primary text-white'>Cancel</button>
            </div>
          </div>
        </div>


      </section>
    </>
  )
}

export default CartCheckOut