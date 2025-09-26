import React from 'react'
import cat1 from '../../assets/category-1.jpg'
import cat2 from '../../assets/category-2.jpg'
import cat3 from '../../assets/category-3.jpg'
import cat4 from '../../assets/category-4.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = [
    { name: "Accessories", image: cat1, path: 'accessories' },
    { name: "Men Casual's", image: cat2, path: 'pentshirt' },
    { name: "Women Dresses", image: cat3, path: 'dress' },
    { name: "Cosmetics", image: cat4, path: 'cosmetics' },
  ]
  return (
    <div className='categories__grid'>
      {
        categories.map((category) => (
          <div data-aos="zoom-in-up">
            <Link to={`/categories/${category.path}`} key={category.name} className='categories__card'>
              <img src={category.image} alt={category.name} />
              <h4>{category.name}</h4>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Categories