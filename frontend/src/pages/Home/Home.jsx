import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import TrendingProducts from '../shop/TrendingProducts'
import DealSection from './DealSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'
import Gallery from './Gallery'

const Home = () => {
  return (
    <>
    <Banner/>
    <Categories/>
    <TrendingProducts/>
    <DealSection/>
    <Gallery/>
    <Blogs/>
    <PromoBanner/>
    </>
  )
}

export default Home