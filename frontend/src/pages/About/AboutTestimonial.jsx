import React from 'react'
import testimonialAuthor from '../../assets/about/testimonial-author.jpg'
import testimonialPic from '../../assets/about/testimonial-pic.jpg'

const AboutTestimonial = () => {
  return (
    <div>
         <section>
                <div className='h-fit lg:h-[550px] grid gap-5 grid-cols-1 md:grid-cols-2 bg-gray-200'>
                    <div className=' flex items-center justify-center'>
                        <div className='lg:w-1/2 p-6 text-center' data-aos='fade-left'>
                            <span className='text-5xl text-primary'><i className="ri-double-quotes-r"></i></span>
                            <p className='my-5 text-lg tracking-wide text-center italic'>“Going out after work? Take your butane curling iron with you to the office, heat it up, style your hair before you leave the office and you won’t have to make a trip back home.”</p>
                            <div className='flex items-center justify-center md:items-start md:justify-start gap-5'>
                                <img className='w-16 h-16 rounded-full' src={testimonialAuthor} alt="" />
                                <div className='flex flex-col items-start justify-start'>
                                    <h4 className='text-lg font-semibold font-[Lora]'>Augusta Schultz</h4>
                                    <p className='text-[15px] text-gray-400'>Fashion Design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-aos='fade-right'>
                        <img className='w-full h-full md:h-[520px]' src={testimonialPic} alt="" />
                    </div>
                </div>

                <div className='section__container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
                    <div className='flex justify-center items-center gap-5' data-aos='fade-up'>
                        <h3 className='text-[30px] md:text-[50px] lg:text-[60px] text-black font-[Lora] font-semibold'>102</h3>
                        <p className='text-[12px] sm:text-[15px] md:text-lg font-medium'>Our <br /> Clients</p>
                    </div>
                    <div className='flex justify-center items-center gap-5' data-aos='fade-up'>
                        <h3 className='text-[30px] md:text-[50px] lg:text-[60px] font-[Lora] text-black font-semibold'>20</h3>
                        <p className='text-[12px] sm:text-[15px] md:text-lg font-medium'>Total<br /> Categories</p>
                    </div>
                    <div className='flex justify-center items-center gap-5' data-aos='fade-up'>
                        <h3 className='text-[30px] md:text-[50px] lg:text-[60px] font-[Lora] text-black font-semibold'>102</h3>
                        <p className='text-[12px] sm:text-[15px] md:text-lg font-medium'>In <br /> Country</p>
                    </div>
                    <div className='flex justify-center items-center gap-5' data-aos='fade-up'>
                        <h3 className='text-[30px] md:text-[50px] lg:text-[60px] font-[Lora] text-black font-semibold'>98%</h3>
                        <p className='text-[12px] sm:text-[15px] md:text-lg font-medium'>Happy <br /> Customers</p>
                    </div>
                </div>
                <div className='w-[90%] border-b mx-auto'></div>
            </section>
    </div>
  )
}

export default AboutTestimonial