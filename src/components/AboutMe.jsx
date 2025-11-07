import React from 'react'
import data from '../utils/data.json'
import SvgRender from './SvgReader'
import useScrollReveal from './scrollReveal';

export default function About() {
    const contacts = data.contacts;
    const { ref, visible } = useScrollReveal(0.5);
    return (
        <>
            <div ref={ref} className={"abc about self-intro " + (visible ? "animate__animated animate__fadeInDown" : "")} id="about">
                <h2 className='about-header'>{data.personal_detailes.name}</h2>
                <p className='about-text'>{data.about.description}</p>
                <div className='about-contact'>
                    {contacts.map((contact, index) => (
                        <a  key={index} href={contact.url} target="_blank" className='cont-icon icon link'>
                        <SvgRender path={contact.logo} />
                        </a>
                    ))}
                </div>
                
            </div>
            

        </>
    )
}