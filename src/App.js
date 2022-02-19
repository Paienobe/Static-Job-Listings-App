import { useGlobalContext } from './context'
import Job from './Components/Job'
import FilterContainer from './Components/FilterContainer'

function App() {
  const { jobs, hasFilters } = useGlobalContext()
  return (
    <main className='container'>
      <header className='header'>
        <img
          src='./images/bg-header-mobile.svg'
          alt='header-background'
          className='header-background mobile-bg'
        />
        <img
          src='./images/bg-header-desktop.svg'
          alt='header-background'
          className='header-background desktop-bg'
        />
      </header>

      <section
        className={
          hasFilters ? 'jobs-container active-filters' : 'jobs-container'
        }
      >
        {hasFilters ? <FilterContainer /> : ''}
        {jobs.map((job) => {
          return <Job key={job.id} {...job} />
        })}
      </section>
    </main>
  )
}

export default App
