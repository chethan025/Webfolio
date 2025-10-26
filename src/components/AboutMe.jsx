import React from 'react'
import data from '../utils/data.json'
import SvgRender from './SvgReader'

export default function About() {
    return (
        <>
            <div className='abc about self-intro' id="about">
                <h2 className='about-header'>{data.personal_detailes.name}</h2>
                <p className='about-text'>{data.about.description}</p>
                <div className='about-contact'>
                    <SvgRender path={data.contacts.github.logo} />
                </div>
                
            </div>
            

        </>
    )
}