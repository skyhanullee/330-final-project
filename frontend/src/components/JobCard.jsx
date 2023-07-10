import { Icon } from '@iconify/react';
import { useState } from "react"

function JobCard({ job }) {
  const { title, location, company, salary_min, created, id, description, latitude, longitude, redirect_url, isBookmarked } = job;
  const dateCreated = new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salaryListing = salary_min?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // const [user, setUser] = useState({});
  // const { user, setUser } = useContext(UserContext);
  // const { isBookmarked, setIsBookmarked } = useState(false);
  console.log(job);

  const addToFavorites = async () => {

    const jobToSave = {
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

    // console.log(jobToSave.jobId);


    const token = `Bearer ${localStorage.getItem('token')}`

    await fetch('http://127.0.0.1:4000/bookmarklist/update', {
      method: 'PUT',
      body: JSON.stringify(jobToSave),
      headers: new Headers({
        'Content-Type': 'application/json',
        "Authorization": token
      })
    })
      .then(response => {
        if (!response.ok) {
          console.log('POST: did not send to mongo db');
        }
        if (response.status === 409 || !response.ok) {
          // alert('Something went wrong with adding to the list.');
          return response.json()
        }
        if (response.ok) {
          alert(`${title} has been added to saved list`);
          // return response.json();
          // setIsBookmarked(true);
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
    addToFavorites();
  }

  return (
    <div className='job-card' id={`job-${id}`}>
      <div className="job-card-header">
        <h1 className='job-card-title'>{title}</h1>
        <Icon
          className='icon'
          id='bookmark-icon'
          icon={isBookmarked ? "material-symbols:bookmark" : "material-symbols:bookmark-outline"}
          onClick={handleOnClick}
        />
      </div>
      <hr />
      <div className='job-card-details'>
        <h3>Location:</h3>
        <p>{(location?.display_name)}</p>
        <h3>Company:</h3>
        <p>{(company?.display_name)}</p>
        <h3>Salary:</h3>
        <p>{salaryListing}</p>
        <h3>Date Created: </h3>
        <p>{dateCreated}</p>
      </div>
    </div>
  )
}

export default JobCard
