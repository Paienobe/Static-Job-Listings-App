import React from 'react'
import { useGlobalContext } from '../context'

const FilterContainer = () => {
  const { currentFilters, removeFilter, clearAllFilters } = useGlobalContext()
  return (
    <section className='applied-filter-container'>
      <div className='selected-filter-container'>
        {currentFilters.map((filter) => {
          return (
            <button className='applied-filter' onClick={removeFilter}>
              <p className='applied-filter-name'>{filter}</p>
              <button className='delete-btn'>X</button>
            </button>
          )
        })}
      </div>
      <button className='clear-btn' onClick={clearAllFilters}>
        Clear
      </button>
    </section>
  )
}

export default FilterContainer
