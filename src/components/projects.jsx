import React from 'react'
import ProjectGrid from './projectGrid'
import data from '../utils/data.json'


export const projects = () => {
    const items = data.projects;
  return (
    <>
        <ProjectGrid 
            items={items}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
        />
    </>
  )
}



export default projects;