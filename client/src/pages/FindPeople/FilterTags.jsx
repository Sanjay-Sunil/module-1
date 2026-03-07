import './FilterTags.css'
export default function FilterTags({ INTEREST_FILTERS, activeFilter, setActiveFilter }) {
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
          {INTEREST_FILTERS.map(filter => (
            <button
              key={filter}
              className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>
    </>
  )
}