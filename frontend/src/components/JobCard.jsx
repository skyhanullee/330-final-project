import { Icon } from '@iconify/react';
import { useState, useEffect, useContext } from "react"
import UserContext from '../context/UserContext';

function JobCard({ job }) {
  const { title, location, company, salary_min, salary, created, createdAt, id, description, latitude, longitude, redirect_url } = job;
  const dateCreated = new Date((created || createdAt)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salaryListing = (salary_min || salary)?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // const [user, setUser] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { isBookmarked, setIsBookmarked } = useState(false);

  const addToFavorites = async () => {
    // const { title, location, company, salary_min, created, id, description, latitude, longitude, redirect_url } = jobObject;
    const job = {
      isBookmarked: true,
      jobId: id,
      title: title,
      description: description,
      location: location.display_name,
      company: company.display_name,
      salary: salary_min,
      createdAt: created,
      latitude: latitude,
      longitude: longitude,
      url: redirect_url,
      isAdzuna: true,
      author: 'adzuna',
    };

    console.log(job);

    const token = `Bearer ${localStorage.getItem('token')}`

    const response = await fetch('http://127.0.0.1:4000/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
      headers: {
        authorization: token,
      }
    });


    // .then(res => res.json())
    // .then(data => console.log(data));

    const resJson = await response.json();
    console.log('JOB CARD: ')
    console.log(resJson);
    if (!response.ok) {
      console.log('POST: did not send to mongo db');
    }
    if (response.status === 409) {
      alert('Job has already been saved.');
      console.log('job already saved in mongo collection');
    }
    if (response.ok) {
      alert(`${title} has been added to saved list`);
      console.log('new job added', resJson);
      // setIsBookmarked(true);
    }
  };

  const handleOnClick = async (e) => {
    e.stopPropagation();
    addToFavorites();
    // console.log(job);
  }

  return (
    <div className='job-card' id={`job-${id}`}>
      <div className="job-card-header">
        <h1 className='job-card-title'>{title}</h1>
        <Icon
          className='bookmark-icon'
          icon={isBookmarked ? "material-symbols:bookmark" : "material-symbols:bookmark-outline"}
          onClick={handleOnClick}
        />
      </div>
      <hr />
      <div className='job-card-details'>
        <h3>Location:</h3>
        <p>{(location.display_name || location)}</p>
        <h3>Company:</h3>
        <p>{(company.display_name || company)}</p>
        <h3>Salary:</h3>
        <p>{salaryListing}</p>
        <h3>Date Created: </h3>
        <p>{dateCreated}</p>
      </div>
    </div>
  )
}

export default JobCard
