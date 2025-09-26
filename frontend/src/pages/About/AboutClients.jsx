import React from 'react'
import client1 from '../../assets/clients/client-1.png'
import client2 from '../../assets/clients/client-2.png'
import client3 from '../../assets/clients/client-3.png'
import client4 from '../../assets/clients/client-4.png'
import client5 from '../../assets/clients/client-5.png'
import client6 from '../../assets/clients/client-6.png'
import client7 from '../../assets/clients/client-7.png'
import client8 from '../../assets/clients/client-8.png'

const AboutClients = () => {
  return (
    <div>
         <section className='mb-20'>
               <div className='space-y-5 text-center' data-aos='fade-up'>
                    <p className='text-primary uppercase font-medium text-[16px]'>Partner</p>
                    <h3 className='text-3xl font-semibold font-[Lora]'>Happy Clients</h3>
                </div>
                <div className='section__container flex items-center justify-around flex-wrap'>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client1} alt="" />
                    </div>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client2} alt="" />
                    </div>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client3} alt="" />
                    </div>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client4} alt="" />
                    </div>
                </div>
                <div className='flex items-center justify-around flex-wrap'>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client5} alt="" />
                    </div>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client6} alt="" />
                    </div>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client7} alt="" />
                    </div>
                    <div className='text-center' data-aos='fade-up'>
                        <img className='w-12 md:w-16' src={client8} alt="" />
                    </div>
                </div>
            </section>
    </div>
  )
}

export default AboutClients