import React from 'react'
import data from '../utils/data.json'
import AboutMe from '../components/AboutMe'
import Skills from '../components/Skills'
import GithubC from '../components/GithubContributions'
import '../styles/main-about.scss'

export default function About() {
  return (
    <div className='section'>
      <div className='about-container grid'>
        <AboutMe />
        <Skills />
        <GithubC />
      </div>
    </div>
  )
}
