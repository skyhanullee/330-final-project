import { Icon } from '@iconify/react';

function JobForm({ onFormSubmit, searchTerms, searchLocation, resultsPerPage }) {
  return (
    <div className='job-form'>
      <form onSubmit={onFormSubmit}>
        <div id='form-search-terms'>
          <label htmlFor='job-search'>Search: </label>
          <input type='text' id='job-search-input' placeholder='Job, Company, Title' value={searchTerms} />
        </div>
        <div id='form-location'>
          <label htmlFor='job-search'>Location: </label>
          <input type='text' id='location-input' placeholder='City, State, Zip Code' value={searchLocation} />
        </div>
        {/* <div id='form-results-per-page'>
          <label htmlFor='job-search'>Results per page: </label>
          <input type='number' id='results_per_page-input' min='1' defaultValue='4' value={resultsPerPage} />
        </div> */}
        <button type='submit'>
          <Icon icon='material-symbols:search-rounded' className='search-icon' />
          Search
        </button>
      </form>
    </div>
  )
}

export default JobForm
