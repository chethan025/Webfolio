import React from 'react'
import Carousel from './animations/carousel.jsx';
import useScrollReveal from './scrollReveal';
export const Certificatess = () => {
  const { ref, visible } = useScrollReveal(0.5);
  return (
    <div style={{ height: '600px', position: 'relative' }} ref={ref} 
      className={"abc0 " + (visible ? "abc1 animate__animated animate__bounceIn" : "")}
      >
        <Carousel
        className="certificates-carousel"
        baseWidth={window.innerWidth * 0.8}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
           
        />
    </div>
  )
}




