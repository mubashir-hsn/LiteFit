import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetAllProducts from '../../../contextApi/GetAllProducts.jsx';
import GetAllReviews from '../../../contextApi/GetAllReviews.jsx';
import ReviewCart from '../review/ReviewCart.jsx';
import Carousal from '../../Home/Carousal.jsx';
import axios from 'axios';
import DetailCard from '../../../components/DetailCard.jsx';

const SingleProduct = () => {
  const { id } = useParams();
  const [products, loading] = GetAllProducts();
  const data = products.find(product => product._id === id);
  const [reviews] = GetAllReviews();
  const [relatedProducts, setRelatedProducts] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/product/related/${id}`, {
          withCredentials: true
        });
        setRelatedProducts(response.data);
      } catch (error) {
        console.log('Error while getting related products:', error);
      }
    };

    getRelatedProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  if (loading) return <div>Loading....</div>;

  return (
    <>
      <section className='section__container bg-primary-light' data-aos='fade-up'>
        <h1 className='section__header capitalize'>Product Details</h1>
      </section>

      <section className='section__container'>
        <DetailCard data={data}/>
      </section>

      {/* Display Reviews */}
      <section data-aos='fade-up'>
        <ReviewCart reviews={reviews} />
      </section>

      {/* Show Related Products */}
      {relatedProducts.length > 0 && (
        <section className='section__container' data-aos='fade-up'>
          <h2 className='text-[2rem] px-2 font-extrabold font-[Lora] text-black capitalize border-b-2 border-b-gray-300'>You may also like</h2>
          <div className='mt-5'>
            <Carousal products={relatedProducts} />
          </div>
        </section>
      )}
    </>
  );
};

export default SingleProduct;
