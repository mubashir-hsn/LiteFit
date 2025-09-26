import card1 from '../../../assets/card-1.png'
import card2 from '../../../assets/card-2.png'
import card3 from '../../../assets/card-3.png'

const HeroSection = () => {
    const cards = [
        {
            id:1,
            title:"Womens Shirts",
            trend:"2024 trend",
            image: card1
        },
        {
            id:2,
            title:"Womens Dresses",
            trend:"2024 trend",
            image: card2
        },
        {
            id:3,
            title:"Womens Casuals",
            trend:"2024 trend",
            image: card3
        },
    ]
  return (
    <section className='section__container hero__container'>
        {
            cards.map((card)=>(
                <div key={card.id} className='hero__card' data-aos='zoom-in-up'>
                    <img src={card.image} alt={card.title} />
                  <div className='hero__content'>
                  <p>{card.trend}</p>
                   <h4>{card.title}</h4>
                   <a href="#">Discover More +</a>
                  </div>
                </div>
            ))
        }
    </section>
  )
}

export default HeroSection