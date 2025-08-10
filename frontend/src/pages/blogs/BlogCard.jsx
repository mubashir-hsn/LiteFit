/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import pic1 from '../../assets/about/team-1.jpg'
import pic2 from '../../assets/instagram-3.jpg'
import pic3 from '../../assets/about/team-3.jpg'

const BlogCard = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const comments = [
    {
      id: 1,
      name: 'John Doe',
      profilePic: pic1,
      comment: 'Great insights! Loved the details about capsule wardrobes.',
    },
    {
      id: 2,
      name: 'Emilly Lee',
      profilePic: pic2,
      comment: 'This was really helpful, can’t wait to try these fashion tips!',
    },
    {
      id: 3,
      name: 'Michael Smith',
      profilePic: pic3,
      comment: 'Excellent breakdown of trends! Thanks for sharing.',
    },
  ]

  return (
    <div>
      <div className='grid mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className='blog__card cursor-pointer transition-all duration-300 hover:scale-105'
            onClick={() => setSelectedBlog(blog)}
          >
            <img src={blog.imageUrl} alt='BlogImg' className='w-full h-48 object-cover rounded-t-lg' />
            <div className='blog__card__content p-4'>
              <h6 className='text-gray-600'>{blog.subtitle}</h6>
              <h4 className='text-lg font-semibold'>{blog.title}</h4>
              <p className='text-gray-500 text-sm'>
                {
                  new Date(blog?.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                }
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50'>
          <div className='bg-white p-5 space-y-3 rounded-lg max-w-4xl w-full shadow-lg overflow-y-auto max-h-[95vh]'>
            <div className='flex justify-between items-center p-4'>
              <h3 className='text-2xl py-4 font-semibold font-[Lora]'>{selectedBlog.title}</h3>
              <button onClick={() => setSelectedBlog(null)} className='text-gray-500 hover:text-gray-700'>
                <FaTimes size={20} />
              </button>
            </div>
            <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className='w-full md:w-11/12 h-full mx-auto object-cover rounded-lg' />
            <div className='p-5 space-y-4'>
              <div className=' flex justify-between items-center gap-2 md:px-4'>
                <p className='text-gray-600 font-medium'>By: <span className='underline text-sm text-blue-500'>{selectedBlog?.author || 'admin'}</span></p>
                <p className='text-gray-500 text-sm font-medium'>
                  {
                    new Date(selectedBlog?.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  }
                </p>
              </div>
              <h4 className='text-lg font-semibold'>{selectedBlog.subtitle}</h4>
              <p className='text-gray-700 leading-relaxed text-[15px] text-justify'>{selectedBlog.description}</p>
            </div>
            <div className='p-4 border-t'>
              <h4 className='text-lg font-semibold mb-3'>Comments</h4>
              <div className='space-y-4'>
                {comments.map((comment) => (
                  <div key={comment.id} className='flex items-center space-x-3 bg-gray-100 p-3 rounded-lg'>
                    <img src={comment.profilePic} alt={comment.name} className='w-10 h-10 bg-contain rounded-full' />
                    <div>
                      <h5 className='font-semibold text-sm'>{comment.name}</h5>
                      <p className='text-gray-600 text-sm'>{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogCard