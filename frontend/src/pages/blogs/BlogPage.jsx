import { useEffect } from 'react'
import BlogCard from './BlogCard';
import GetAllBlogs from '../../contextApi/GetAllBlogs.jsx';

const BlogPage = () => {

  const [blogs] = GetAllBlogs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <section className='section__container bg-primary-light' >
        <div data-aos='fade-left'>
          <h1 className='section__header capitalize'>Latest From Blogs</h1>
          <p className='section__subheader'>Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.</p>
        </div>
      </section>

      <section className='p-5 bg-gray-50 overflow-hidden'>
        <BlogCard blogs={blogs} />
      </section>

    </>
  )
}

export default BlogPage