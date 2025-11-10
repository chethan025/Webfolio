import React from 'react'
import '../styles/Header.scss'
import ShinyText from './animations/shiny-text'
import data from'../utils/data.json'
import { useRef } from 'react';
import VariableProximity from './animations/shortbio';
import MorphTextLoop from './animations/web-developer';
import useScrollReveal from './scrollReveal';


export default function Header() {
  const containerRef = useRef(null);
  const { ref, visible } = useScrollReveal(0.5);
  return (
    <>
      <div id="header-section" className="section header-section ">
        <h2 ref={ref} className={"webheader " + (visible ? "animate__animated animate__fadeInDown" : "")}>
          <MorphTextLoop
            from="WEB DEVELOPER"
            to="PORTFOLIO"
            speed={160}
            intervalTime={3000}   // loop every 3 seconds
            className="revealed"
            parentClassName="all-letters"
          />

        </h2>

        <div ref={ref} className={"intro " + (visible ? "animate__animated animate__fadeInLeft" : "")} id='intro'>
          <h1>CHETHAN S</h1>
          <div
            ref={containerRef}
            style={{position: 'relative'}}
            className={'shortbio'}
          >
            <VariableProximity
              label={data.about.interests.join(', ').replace(/,/g, ' | ')}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            />
          </div>
        </div>

        <div ref={ref} className={"resume-button " + (visible ? "animate__animated animate__fadeInRight" : "")} id='resume-link'>
          <a
            href={data.about.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
            
          >
            <span className='vw'>Know More about</span>
            <span className='rmn'><ShinyText text="ME" disabled={false} speed={3} /></span>
            <span className='vwd'>
              <svg className="arrow-svgs" xmlns="http://www.w3.org/2000/svg" width="61" height="57" viewBox="0 0 81 77" fill="none">
                <path d="M40.5 0.5C62.5666 0.5 80.5 17.489 80.5 38.5C80.5 59.511 62.5666 76.5 40.5 76.5C18.4334 76.5 0.5 59.511 0.5 38.5C0.5 17.489 18.4334 0.5 40.5 0.5Z" stroke="white"/>
                <path d="M31.0031 30.1475L49.9571 46.6397" stroke="white"/>
                <path d="M48.5925 33.2082L50.0128 47.1366" stroke="white"/>
                <path d="M49.9572 46.6397L36.0218 48.1016" stroke="white"/>
              </svg>
            </span>

          </a>
        </div>







      </div>



        
    </>
  )
}
