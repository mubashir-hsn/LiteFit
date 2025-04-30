import React from 'react'
import { Carousel } from 'primereact/carousel';
import SliderCards from './SliderCards.jsx';

const Carousal = ({products}) => {

    // Carousel responsive options
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: '900px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

  return (
    <div>
        <section className="section__container bg-slate-100 overflow-x-hidden">
                <div className="card">
                    <Carousel
                        value={products}
                        numVisible={4}
                        numScroll={2}
                        responsiveOptions={responsiveOptions}
                        circular
                        autoplayInterval={3000}
                        itemTemplate={(product) => <SliderCards products={product} />}
                        className="custom-carousel"
                    />
                </div>
            </section>
    </div>
  )
}

export default Carousal