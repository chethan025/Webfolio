import React, { useState, useEffect } from 'react';
import Carousel from './animations/carousel.jsx';
import useScrollReveal from './scrollReveal';

function useBaseWidth() {
  const [bw, setBw] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setBw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // breakpoint 768px = typical tablet/mobile threshold
  return bw < 768 ? bw * 0.9 : bw * 0.6;
}

export const Certificatess = () => {
  const { ref, visible } = useScrollReveal(0.5);

  const baseWidth = useBaseWidth();  // ← YOU FORGOT THIS LINE

  return (
    <div
      style={{ position: 'relative' }}
      ref={ref}
      className={
        "abc0 " +
        (visible ? "abc1 animate__animated animate__bounceIn" : "")
      }
    >
      <Carousel
        className="certificates-carousel"
        baseWidth={baseWidth}  // now this works
        autoplay={true}
        autoplayDelay={3000}
        pauseOnHover={true}
        loop={true}
        round={false}
      />
    </div>
  );
};
