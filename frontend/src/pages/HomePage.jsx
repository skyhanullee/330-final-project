import { useState, useEffect, useContext } from 'react';
import JobForm from '../components/JobForm';
import JobResultContext from '../context/JobResultContext';
import JobResultList from '../components/JobResultList';
import Map from '../components/Map';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
const DEFAULT_SEARCH_TERMS = '';
const DEFAULT_SEARCH_LOCATION = '';
const DEFAULT_RESULTS_PER_PAGE = 10;

function HomePage() {
  const [searchTerms, setSearchTerms] = useState(DEFAULT_SEARCH_TERMS);
  const [searchLocation, setSearchLocation] = useState(DEFAULT_SEARCH_LOCATION);
  const resultsPerPage = DEFAULT_RESULTS_PER_PAGE;
  // const { jobResult, setJobResult, setJobMarkerList } = useContext(JobResultContext);
  const { setJobResult } = useContext(JobResultContext);

  const [jobMarkerList, setJobMarkerList] = useState([]);


  const onFormSubmit = (event) => {
    event.preventDefault();
    // setJobMarkerList([]);
    setSearchTerms(event.target[0].value);
    setSearchLocation(event.target[1].value);
    // setResultsPerPage(event.target[2].value);
  }
  const ADZUNA_API_ID = process.env.REACT_APP_ADZUNA_APP_ID;
  const ADZUNA_API_KEY = process.env.REACT_APP_ADZUNA_APP_KEY;

  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${searchLocation}`)
      .then(response => response.json())
      .then(
        (data) => {
          setJobResult(data);
          toggleLoading(false);
          // updateJobMarkerList();
        },
        (error) => {
          toggleLoading(false);
          setHasError(true);
        }
      )
  }, [searchTerms, searchLocation])

  if (loading) {
    return <LoadingPage />
  }

  if (hasError) {
    return <ErrorPage />
  }

  return (
    <section className='main-container'>
      <section className='map-container'>
        <Map />
      </section>
      <section className='job-app-container'>
        <JobForm
          onFormSubmit={onFormSubmit}
          setSearchTerms={setSearchTerms}
          setSearchLocation={setSearchLocation}
        />
        <section className='job-card-container'>
          <JobResultList jobMarkerList={jobMarkerList} setJobMarkerList={setJobMarkerList}/>
        </section>
      </section>
    </section>
  );
}

export default HomePage
