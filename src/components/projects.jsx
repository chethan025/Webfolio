import React from 'react'
import ProjectGrid from './projectGrid'


export const projects = () => {
    const items = [
  {
    image: "https://chethan025.github.io/Webfolio/src/assets/images/cards/Portfolio.jpg?img1",
    title: "Portfolio",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#ffffffff",
    gradient: "linear-gradient(145deg, #484848ff, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://chethan025.github.io/Webfolio/src/assets/images/cards/Deepockets.jpg?img2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#A43BA3",
    gradient: "linear-gradient(180deg, #a43ba2ba, #000)",
    url: "https://linkedin.com/in/mikechen"
  },
  {
    image: "https://chethan025.github.io/Webfolio/src/assets/images/cards/Xagon (1).jpg?img2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#ffffffba",
    gradient: "linear-gradient(180deg, #ffffffba, #000)",
    url: "https://linkedin.com/in/mikechen"
  }
];
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