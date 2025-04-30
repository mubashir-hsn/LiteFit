import React from 'react'

const PromoBanner = () => {
   return (
      <>
         <section className='section__container banner__container'>
            <div className='banner__card'>
               <span><i className="ri-truck-line"></i></span>
               <h4>Free delivery</h4>
               <p>Offers convenience and the ability to shop from anywhere, anytime.</p>
            </div>
            <div className='banner__card'>
               <span><i className="ri-money-dollar-circle-line"></i></span>
               <h4>100% Money Back Guaranty</h4>
               <p>E-commerce have a review system where customers can share feedback.</p>
            </div>
            <div className='banner__card'>
               <span><i className="ri-user-voice-fill"></i></span>
               <h4>Strong Support</h4>
               <p>Offer customer support services to assist customers with queries andissues.</p>
            </div>

         </section>

         <section className='section__container' id='parallexbox'>
            <div className='effect h-full w-full content-center py-10 backdrop-blur-sm'>
               <div className="effect2 py-20 w-[90%] mx-auto flex flex-col items-center justify-center rounded-3xl text-black bg-cover bg-no-repeat bg-center ">
                  <h1 className="text-xl md:text-2xl text-center font-medium py-5">Subscribed And Stay Updated On Our <br /> Latest Collections.</h1>

                  <div className="join mt-5 outline-none">
                     <input className=" md:w-[27rem] p-4 focus:outline-none focus:border-none outline-none join-item" required placeholder="Enter your email" />
                     <button className="uppercase font-medium tracking-wider px-4 py-4 text-center join-item rounded-r-full bg-red-500 border-none hover:bg-indigo-500 text-white">Subscribe</button>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default PromoBanner