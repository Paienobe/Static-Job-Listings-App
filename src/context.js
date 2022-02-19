import React, { useState, useContext, useEffect } from 'react'
import data from './data.json'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(data)
  const [hasFilters, setHasFilters] = useState(false)
  const [currentFilters, setCurrentFilters] = useState([])

  const addFilter = (e) => {
    const filter = e.target.innerText

    if (!currentFilters.includes(filter)) {
      setCurrentFilters([...currentFilters, filter])
    }
    setHasFilters(true)

    const filteredJobs = jobs.filter((job) => {
      return (
        job.languages.includes(filter) ||
        job.tools.includes(filter) ||
        job.role === filter ||
        job.level === filter
      )
    })
    setJobs(filteredJobs)
  }

  const removeFilter = (e) => {
    const deleteButton = e.target
    const containerOfFilterToBeDeleted = deleteButton.previousSibling

    if (containerOfFilterToBeDeleted) {
      const filterToBeRemoved = containerOfFilterToBeDeleted.innerText
      const reducedFilters = currentFilters.filter((item) => {
        return item !== filterToBeRemoved
      })
      setCurrentFilters(reducedFilters)

      let jobsToBeAddedBackToState = []

      for (let i = 0; i < reducedFilters.length; i++) {
        if (jobsToBeAddedBackToState.length < 1) {
          const jobsWithInitialFilter = data.filter((job) => {
            return (
              job.languages.includes(reducedFilters[i]) ||
              job.tools.includes(reducedFilters[i]) ||
              job.role === reducedFilters[i] ||
              job.level === reducedFilters[i]
            )
          })
          jobsToBeAddedBackToState.push(...jobsWithInitialFilter)
        } else {
          jobsToBeAddedBackToState = jobsToBeAddedBackToState.filter((job) => {
            return (
              job.languages.includes(reducedFilters[i]) ||
              job.tools.includes(reducedFilters[i]) ||
              job.role === reducedFilters[i] ||
              job.level === reducedFilters[i]
            )
          })
        }
        setJobs(jobsToBeAddedBackToState)
      }
    }
  }

  const clearAllFilters = () => {
    setCurrentFilters([])
    setHasFilters(false)
    setJobs(data)
  }

  useEffect(() => {
    if (currentFilters.length < 1) {
      setHasFilters(false)
      setJobs(data)
    }
  }, [currentFilters])

  return (
    <AppContext.Provider
      value={{
        jobs,
        hasFilters,
        currentFilters,
        addFilter,
        removeFilter,
        clearAllFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
