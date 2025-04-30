import React, { useState, useEffect } from 'react';
import dealImg from '../../assets/product-sale.png';
import GetAllProducts from '../../contextApi/GetAllProducts.jsx';
import { Link } from 'react-router-dom';
import Carousal from './Carousal.jsx';

const DealSection = () => {

    const [products] = GetAllProducts()

    // Filter products by trending
    const filterProduct = products.filter((product) => product.deal === 'deal');

    

    // Set initial time (you can adjust these values)
    const [time, setTime] = useState({
        days: 24,
        hours: 10,
        minutes: 20,
        seconds: 44,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    const updateCountdown = () => {
        setTime((prevTime) => {
            const { days, hours, minutes, seconds } = prevTime;

            // Logic to handle countdown
            if (seconds > 0) {
                return { ...prevTime, seconds: seconds - 1 };
            } else if (minutes > 0) {
                return { ...prevTime, minutes: minutes - 1, seconds: 59 };
            } else if (hours > 0) {
                return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
            } else if (days > 0) {
                return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
            } else {
                clearInterval(timer); // Stop the timer when countdown reaches zero
                return prevTime;
            }
        });
    };

    return (
        <>
            {/* Deals Banner Section */}
            <section className="section__container relative bg-primary-light flex justify-around items-center flex-wrap gap-20 lg:gap-0">
                        <div className='hidden lg:block z-[1]'>
                            <div className='relative space-y-8 text-3xl font-medium'>
                                <p className='text-red-300'> Clothings Hot </p>
                                <p>Shoe Collection</p>
                                <p className='text-red-300'>Accessories</p>

                            </div>
                        </div>
                        <div className='w-48 hidden lg:block lg:h-[70%] bg-red-50 absolute top-16 left-0'></div>
                        <div className="relative">
                            <img src={dealImg} alt="Deal Banner" />
                            <div className='absolute w-24 h-24 rounded-full bg-gray-900 text-white -top-6 right-0 flex flex-col items-center justify-center'><p>Sale of</p><p className='text-lg font-medium'>$39.99</p></div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-5">
                            <div className=' space-y-3'>
                                <h5 className='text-lg text-primary font-medium font-[Lora]'>Deal Of The Month</h5>
                                <h2 className='text-3xl text-gray-800 md:text-4xl font-semibold'>Multi-pocket Chest  <br /> Bag Black</h2>
                            </div>
                            {/* Timer */}
                            <div className="flex items-center text-gray-800 justify-center text-lg pt-5 gap-5">
                                {Object.entries(time).map(([unit, value]) => (
                                    <div key={unit} className="flex flex-col gap-1">
                                        <div className="font-semibold text-xl md:text-3xl flex justify-center items-center gap-8">
                                            <h4>{String(value).padStart(2, '0')}</h4>
                                            {unit !== 'seconds' && <span>:</span>}
                                        </div>
                                        <p>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                                    </div>
                                ))}
                            </div>
                            {/* ............................... */}
                            <div className='my-5'>
                                <Link to={'/shop/c/67becf56f8c5abfc221d2ac9'} className='uppercase text-lg px-6 py-3 bg-gray-800 text-white tracking-widest mt-2'>Shop Now</Link>
                            </div>
                        </div>
                    </section>

            {/* Product Carousel Section */}
            <Carousal products={filterProduct}/>
        </>
    );
};

export default DealSection;
