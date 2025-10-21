import React from 'react'
import data from '../utils/data.json'

export default function Skills() {
    return (
        <>
            <div className='abc Skills' id="skills">
                <h2 className='skills-header'>{data.about.skills}</h2>
            </div>
        </>
    )
}