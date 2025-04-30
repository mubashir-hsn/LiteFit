import React, { useEffect } from 'react'
import BlogCard from './BlogCard';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h1 className='section__header capitalize'>Latest From Blogs</h1>
        <p className='section__subheader'>Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.</p>
      </section>
     
     <section className='p-5 bg-gray-50 overflow-hidden'>
        <BlogCard/>
     </section>

    </>
  )
}

export default BlogPage