import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import './banner.css'; 

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on smaller screens
          dots: true,
        },
      },
    ],
  };
   

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="section__container header__container  slider-item hero-1">
          <div className="text-left header__content relative md:pl-20 bg-opacity-75 p-4" data-aos='fade-left'>
            <h4 className="uppercase">Up to 20% Discount On</h4>
            <h1 className="py-3">Men's Fashion</h1>
            <p>Discover the latest trends and express your unique style with our Men & Women Fashion website.</p>
            <Link to={'/shop/men'} className='mt-1 md:mt-4'>
              <button className="animated-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                <span className="text">SHOP NOW</span>
                <span className="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className=" section__container header__container slider-item hero-2">
          <div className="text-left header__content relative md:pl-20 bg-opacity-75 p-4" data-aos='fade-left'>
            <h4 className="uppercase">Limited Time Offer</h4>
            <h1 className="py-3">Women's Collection</h1>
            <p>Explore our curated collection of clothing, accessories, and footwear for every occasion.</p>
            <Link to={'/shop/women'} className='mt-1 md:mt-4'>
              <button className="animated-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                <span className="text">SHOP NOW</span>
                <span className="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className=" section__container md:block hidden header__container slider-item hero-3" data-aos='fade-left'>
        <div className="flex items-center justify-center relative md:pl-20 bg-opacity-75 p-4">
              <Link to={'/shop/women'} className='mt-24 md:mt-44 md:ml-24'>
              <button className="animated-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                <span className="text text-white">SHOP NOW</span>
                <span className="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
