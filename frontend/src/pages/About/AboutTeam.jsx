import React from 'react'
import team1 from '../../assets/about/team-1.jpg'
import team2 from '../../assets/about/team-2.jpg'
import team3 from '../../assets/about/team-3.jpg'
import team4 from '../../assets/about/team-4.jpg'

const AboutTeam = () => {
  return (
    <div>
         <section className='section__container'>
                <div className='space-y-5 text-center'>
                    <p className='text-primary uppercase font-medium text-[15px]'>Our Team</p>
                    <h3 className='text-4xl font-semibold font-[Lora]'>Meet Our Team</h3>
                </div>
                <div className='mt-16 flex items-center justify-around flex-wrap'>
                    <div className='w-64 p-2 mb-3 hover:border'>
                        <img src={team1} alt="img" />
                        <div className='mt-5'>
                            <h4 className='text-2xl font-medium font-[Lora]'>John Smith</h4>
                            <p className='mt-2 text-sm text-slate-400'>Fashion Design</p>
                        </div>
                    </div>
                    <div className='w-64 p-2 mb-3 hover:border'>
                        <img src={team2} alt="img" />
                        <div className='mt-5'>
                            <h4 className='text-2xl font-medium font-[Lora]'>Christine Wise</h4>
                            <p className='mt-2 text-sm text-slate-400'>C.E.O</p>
                        </div>
                    </div>
                    <div className='w-64 p-2 mb-3 hover:border'>
                        <img src={team3} alt="img" />
                        <div className='mt-5'>
                            <h4 className='text-2xl font-medium font-[Lora]'>Sean Robbins</h4>
                            <p className='mt-2 text-sm text-slate-400'>Manager</p>
                        </div>
                    </div>
                    <div className='w-64 p-2 mb-3 hover:border'>
                        <img src={team4} alt="img" />
                        <div className='mt-5'>
                            <h4 className='text-2xl font-medium font-[Lora]'>Lucy Myers</h4>
                            <p className='mt-2 text-sm text-slate-400'>Delivery</p>
                        </div>
                    </div>
                </div>
                <div className='w-[90%] border-b mx-auto mt-20'></div>
            </section>
    </div>
  )
}

export default AboutTeam