import GetAllBlogs from '../../contextApi/GetAllBlogs.jsx';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs] = GetAllBlogs();

  const spliceBlog = blogs.slice(0, 4);
  return (
    <section id='blogs' className='section__container blog__container'>
      <div data-aos='fade-right'>
        <h2 className='section__header'>Latest From Blogs</h2>
        <p className='section__subheader'>Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.</p>

      </div>

      <div>
        <BlogCard blogs={spliceBlog} />
      </div>

      <div className='w-full flex justify-center items-center mt-12'>
        <Link className='btn' to={'/blog'}>Explore More</Link>
      </div>
    </section>
  );
};

export default Blogs;
