import React, { useState } from 'react';
import BlogCard from './BlogCard';


const Blogs = () => {
 
  return (
    <section id='blogs' className='section__container blog__container'>
      <h2 className='section__header'>Latest From Blogs</h2>
      <p className='section__subheader'>Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.</p>
       <div>
        <BlogCard/>
       </div>
    </section>
  );
};

export default Blogs;
