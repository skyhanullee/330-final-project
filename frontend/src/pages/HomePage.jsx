import { useState, useEffect, useContext } from 'react';
import JobForm from '../components/JobForm';
import JobResultContext from '../context/JobResultContext';
import JobResultList from '../components/JobResultList';
import Map from '../components/Map';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import UserContext from '../context/UserContext';
const DEFAULT_SEARCH_TERMS = '';
const DEFAULT_SEARCH_LOCATION = '';
const DEFAULT_RESULTS_PER_PAGE = 10;

function HomePage() {
  const { termsQuery, locationQuery, searchResults } = JSON.parse(window.sessionStorage.getItem("searchDetails") ? window.sessionStorage.getItem("searchDetails") : '{"termsQuery": "", "locationsQuery": "","searchResults": ""}');

  const [searchTerms, setSearchTerms] = useState(termsQuery ? termsQuery : DEFAULT_SEARCH_TERMS);
  const [searchLocation, setSearchLocation] = useState(locationQuery ? locationQuery : DEFAULT_SEARCH_LOCATION);
  const resultsPerPage = DEFAULT_RESULTS_PER_PAGE;
  const { jobResult, setJobResult } = useContext(JobResultContext);
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
    // if (!jobResult) {
    fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${searchLocation}`)
      .then(response => response.json())
      .then(
        (data) => {
          setJobResult(data);
          console.log(data);
          toggleLoading(false);
          console.log('fetched');
          // updateJobMarkerList();
          window.sessionStorage.setItem("searchDetails", JSON.stringify({ searchQuery: searchTerms, searchDetails: data.results }));

        },
        (error) => {
          toggleLoading(false);
          setHasError(true);
        }
      );
    // }
    // else {

    // }
  }, [searchTerms, searchLocation, ADZUNA_API_ID, ADZUNA_API_KEY, resultsPerPage, setJobResult])

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
          searchTerms={searchTerms}
          searchLocation={searchLocation}
        />
        <section className='job-card-container'>
          <JobResultList jobMarkerList={jobMarkerList} setJobMarkerList={setJobMarkerList} />
        </section>
      </section>
    </section>
  );
}

export default HomePage
