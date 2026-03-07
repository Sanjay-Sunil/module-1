import { useEffect } from 'react'
import './FilterTags.css'
export default function FilterTags({ interests, activeFilters, setActiveFilters }) {

  const toggleFilter = (filterName) => {
    if( activeFilters.includes(filterName)){
      setActiveFilters(activeFilters.filter(item => item !== filterName))
    } else {
      setActiveFilters([...activeFilters, filterName])
    }
    
  }

  useEffect(() => {
    console.log("Active Filters Updated:", activeFilters);
  }, [activeFilters])
  return (
    <>
    <section className="controls-section">
        {/* <div className="search-bar">
          <input type="text" placeholder="Search by keyword or interest..." className="search-input" />
          <button className="search-btn">
            <Search size={20} color="currentColor" />
          </button>
        </div> */}
        <div className="filter-tags">
          {interests.map(filter => (
            <button
              key={filter}
              // Check if the array includes this specific filter to apply the 'active' class
              className={`filter-tag ${activeFilters?.includes(filter) ? 'active' : ''}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>
    </>
  )
}