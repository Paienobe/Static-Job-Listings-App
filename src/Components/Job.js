import React from 'react'
import { useGlobalContext } from '../context'

const Job = ({
  id,
  company,
  logo,
  new: isNew,
  featured,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools,
}) => {
  const { addFilter } = useGlobalContext()
  return (
    <article className={`${featured ? 'job featured-job' : 'job'}`}>
      <div className='info'>
        <img src={logo} alt={company} className='company-logo' />
        <div className='job-info'>
          <div className='company-name'>
            <h4>{company}</h4>
            <div className='tags-container'>
              {isNew ? <button className='tags'>NEW!</button> : ''}
              {featured ? (
                <button className='tags featured-tag'>FEATURED</button>
              ) : (
                ''
              )}
            </div>
          </div>
          <h3 className='position'>{position}</h3>
          <div className='details'>
            <p>{postedAt}</p>
            <p className='dot'>.</p>
            <p>{contract}</p>
            <p className='dot'>.</p>
            <p>{location}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className='filter-btn-container'>
        <button className='filter-btn' onClick={addFilter}>
          {role}
        </button>
        <button className='filter-btn' onClick={addFilter}>
          {level}
        </button>
        {languages.map((language, index) => {
          return (
            <button className='filter-btn' key={index} onClick={addFilter}>
              {language}
            </button>
          )
        })}
        {tools.map((tool, index) => {
          return (
            <button className='filter-btn' key={index} onClick={addFilter}>
              {tool}
            </button>
          )
        })}
      </div>
    </article>
  )
}

export default Job
