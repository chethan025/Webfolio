import React from 'react'
import '../styles/main-about.scss'

export default function GD() {
    return (
        <>
            <div className='grid grd'>
                <img className='grdimg' alt='github error' src="https://github-stats-extended.vercel.app/api?username=chethan025&rank_icon=github&show_icons=true&include_all_commits=true&theme=dark" />
                <img className='grdimg' alt='github error' src="https://github-readme-streak-stats.herokuapp.com/?user=chethan025&theme=dark" />
                <img className='grdimg' alt='github error' src="https://github-readme-stats-blue-theta-15.vercel.app/api/top-langs/?username=chethan025&layout=compact&theme=dark" />
                        
            </div>
        </>
    )
}