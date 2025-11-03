import React from 'react'
import Carousel from './animations/carousel.jsx';

export const Certificatess = () => {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
        <Carousel
            baseWidth={960}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
        />
    </div>
  )
}




