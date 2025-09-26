import React from 'react'
import { Link } from 'react-router-dom'
import aboutUs from '../../assets/about/about-us.jpg'

const AboutBanner = () => {
  return (
    <div>
        <section className='section__container bg-primary-light'>
                <h1 className='section__header capitalize'>About Us</h1>
                <div className='section__subheader' data-aos='fade-left'>
                    <span className='hover:text-primary text-gray-600'><Link to='/'>Home</Link></span>
                    <span><i className="ri-arrow-right-s-line"></i></span>
                    <span className='text-gray-400 text-sm'>About</span>
                </div>
        </section>

        <section>
                <div className='section__container'>
                    <div className='w-[90%] mx-auto' data-aos='fade-right'>
                        <img src={aboutUs} alt="About" />
                    </div>
                    <div className='w-[90%] mx-auto mt-7 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center'>
                        <div className='p-2' data-aos='zoom-in-up'>
                            <h2 className='my-3 text-2xl font-medium text-black'>Who We Are ?</h2>
                            <p className='text-sm text-gray-700 text-justify'>Contextual advertising programs sometimes have strict policies that need to be adhered too. Let’s take Google as an example.</p>
                        </div>
                        <div className='p-2' data-aos='zoom-in-up'>
                            <h2 className='my-3 text-2xl font-medium text-black'>Who We Do ?</h2>
                            <p className='text-sm text-gray-700 text-justify'>In this digital generation where information can be easily obtained within seconds, business cards still have retained their importance.</p>
                        </div>
                        <div className='p-2' data-aos='zoom-in-up'>
                            <h2 className='my-3 text-2xl font-medium text-black'>Why Choose Us ?</h2>
                            <p className='text-sm text-gray-700 text-justify'>A two or three storey house is the ideal way to maximise the piece of earth on which our home sits, but for older or infirm people.</p>
                        </div>
                    </div>
                </div>
            </section>


    </div>
  )
}

export default AboutBanner