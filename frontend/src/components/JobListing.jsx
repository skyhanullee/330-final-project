import { Icon } from '@iconify/react';
import JobLink from './JobLink';
// import { useState, useEffect, useContext } from "react"
// import UserContext from '../context/UserContext';

function JobListing({ job }) {
  const { title, location, company, salary, createdAt, jobId, description, latitude, longitude, redirect_url, isBookmarked, isAdzuna } = job;
  const dateCreated = new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salaryListing = salary?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // const { user, setUser } = useContext(UserContext);
  // const { isBookmarked, setIsBookmarked } = useState(false);
  // console.log(job);

  const addToFavorites = async () => {
    // const { title, location, company, salary_min, created, id, description, latitude, longitude, redirect_url } = jobObject;
    const job = {
      isBookmarked: true,
      jobId: jobId,
      title: title,
      description: description,
      location: location.display_name,
      company: company.display_name,
      salary: salary,
      createdAt: createdAt,
      latitude: latitude,
      longitude: longitude,
      url: redirect_url,
      // isAdzuna: false,
      author: 'user',
    };

    const token = `Bearer ${localStorage.getItem('token')}`

    await fetch('http://127.0.0.1:4000/bookmarklist/update', {
      method: 'PUT',
      body: JSON.stringify(job),
      headers: new Headers({
        'Content-Type': 'application/json',
        "Authorization": token
      })
    })
      .then(response => {
        if (response.status === 409 || !response.ok) {
          // alert('Something went wrong with adding to the list.');
          return response.json();
        }
        if (response.ok) {
          alert(`${title} has been added to saved list`);
          // console.log('new job added', response.json());
          // setIsBookmarked(true);
        }
      })
      .then(data => {
        // console.log(data);
        if (data !== undefined) {
          alert(data.message);
        }
      })

  };

  const removeFromFavorites = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`

    await fetch('http://127.0.0.1:4000/bookmarklist/delete', {
      method: 'DELETE',
      body: JSON.stringify({ jobId: jobId }),
      headers: new Headers({
        'Content-Type': 'application/json',
        "Authorization": token
      })
    })
      .then(response => {
        if (response.status === 409 || !response.ok) {
          // alert('Something went wrong with adding to the list.');
          return response.json();
        }
        if (response.ok) {
          alert(`${title} has been removed from saved list`);
          // console.log('job removed', response.json());
          // setIsBookmarked(true);
          window.location.reload(); // to refresh the saved list, should change later to re-render state instead
          // return response.json();
        }
      })
      .then(data => {
        if (data !== undefined) {
          alert(data.message);
        }
      })
  };

  const handleOnClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isBookmarked) {
      removeFromFavorites();
    }
    else {
      addToFavorites();
    }
  }

  return (
    <div className='job-listing' id={`job-${jobId}`}>
      <div className="job-listing-header">
        <h1 className='job-listing-title'>{title}</h1>
        <Icon
          className='icon'
          id='bookmark-icon'
          icon={isBookmarked ? "material-symbols:bookmark" : "material-symbols:bookmark-outline"}
          onClick={handleOnClick}
        />
        {/* <Icon
          className='icon'
          id='delete-icon'
          icon="material-symbols:delete-outline"
          onClick={handleOnClick}
        /> */}
      </div>
      <hr />
      <div className='job-listing-details'>
        <h3>Location:</h3>
        <p>{location}</p>
        <h3>Company:</h3>
        <p>{company}</p>
        <h3>Salary:</h3>
        <p>{salaryListing}</p>
        <h3>Date Created: </h3>
        <p>{dateCreated}</p>
        <hr />
      </div>
      <div className="job-listing-description">
        <h3>Description:</h3>
        <p>{description}</p>
      </div>
      <hr />
      {isAdzuna && <JobLink jobId={jobId} />}
    </div>
  )
}

export default JobListing
