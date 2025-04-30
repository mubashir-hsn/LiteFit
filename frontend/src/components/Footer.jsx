import React from 'react'
import insta1 from '../assets/instagram-1.jpg' 
import insta2 from '../assets/instagram-2.jpg' 
import insta3 from '../assets/instagram-3.jpg' 
import insta4 from '../assets/instagram-4.jpg' 
import insta5 from '../assets/instagram-5.jpg' 
import insta6 from '../assets/instagram-6.jpg' 
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span><i className="ri-map-pin-2-fill"></i></span>123, Bridge Street, ABC
          </p>
          <p>
            <span><i className="ri-mail-fill"></i></span>Online@litefit.com
          </p>
          <p>
            <span><i className="ri-phone-fill"></i></span>(+012) 3456 789
          </p>
        </div>
        
        <div className="footer__col">
          <h4>COMPANY</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="#">Work With Us</Link>
          <Link to="/blog">Our Blog</Link>
          <Link to="#">Terms &amp; Conditions</Link>
        </div>
        
        <div className="footer__col">
          <h4>USEFUL LINK</h4>
          <Link to="#">Help</Link>
          <Link to="#">Track My Order</Link>
          <Link to="/shop/men">Men</Link>
          <Link to="/shop/women">Women</Link>
          <Link to="/shop/women">Dresses</Link>
        </div>
        

        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={insta1} alt="instagram" />
            <img src={insta5} alt="instagram" />
            <img src={insta2} alt="instagram" />
            <img src={insta3} alt="instagram" />
            <img src={insta4} alt="instagram" />
            <img src={insta6} alt="instagram"/>
          </div>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2025 by Litefit. All rights reserved.
      </div>
    </>
  )
}

export default Footer