import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <>
      <section className='section__container bg-primary-light'>
        <h1 className='section__header capitalize'>Contact Us</h1>
        <div className='section__subheader' data-aos='fade-left'>
          <span className='hover:text-primary text-gray-600'><Link to='/'>Home</Link></span>
          <span><i className="ri-arrow-right-s-line"></i></span>
          <span className='text-gray-400 text-sm'>Contact</span>
        </div>
      </section>
      <section className='section__container grid grid-cols-1 md:grid-cols-2 gap-5 place-content-center'>
        <div className='p-5 space-y-4' data-aos='fade-left'>
          <p className='text-primary font-medium text-lg uppercase'>Information</p>
          <div className='pl-2 flex flex-col gap-16'>
            <div className='space-y-4'>
              <h2 className='font-medium text-2xl font-[Lora]'>Get In Touch With Us</h2>
              <p className='text-sm text-justify text-gray-500'>As you might expect of a company that began as a high-end interiors contractor, we pay strict attention.</p>
            </div>
            <div className='space-y-4' data-aos='fade-up'>
              <h2 className='text-2xl font-semibold uppercase mb-4 font-[Lora]'>Pakistan</h2>
              <p>
                <span><i className="text-primary mr-3 ri-map-pin-2-fill"></i></span>123, Bridge Street, ABC
              </p>
              <p>
                <span><i className="text-primary mr-3 ri-mail-fill"></i></span>Online@litefit.com
              </p>
              <p>
                <span><i className="text-primary mr-3 ri-phone-fill"></i></span>(+012) 3456 789
              </p>
            </div>
          </div>
        </div>
        <div className='' data-aos='fade-right'>
          <form>
            <div className='flex flex-col md:flex-row gap-5'>
              <input type="text" placeholder='Name' name='name' className='py-3 px-5 text-slate-600 bg-slate-100 outline-none rounded  placeholder:text-slate-500' required />
              <input type="email" name="email" placeholder='Email' className='py-3 px-5 text-slate-600 bg-slate-100 outline-none rounded  placeholder:text-slate-500' required />
            </div>
            <div className='mt-5 space-y-5 w-full flex flex-col'>
              <input type='number' min={0} max={11} placeholder='Phone Number' name='phone' className='w-full md:w-[80%] py-3 px-5 text-slate-600 bg-slate-100 outline-none rounded  placeholder:text-slate-500' required />
              <textarea rows={6} name="comment" placeholder='Message' className='resize-none w-full md:w-[80%] py-3 px-5 text-slate-600 bg-slate-100 outline-none rounded  placeholder:text-slate-500' required></textarea>
            </div>
            <button className='w-full uppercase md:w-[80%] btn mt-5'>Send Message</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default ContactPage