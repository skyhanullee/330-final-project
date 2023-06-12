import { Icon } from '@iconify/react';
import { useState, useEffect, useContext } from "react"
import UserContext from '../context/UserContext';

function JobCard({ job }) {
  const { title, location, company, salary_min, created, id, description, latitude, longitude, redirect_url } = job;
  const dateCreated = new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salary = salary_min.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // const [user, setUser] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { isBookmarked, setIsBookmarked } = useState(false);

  // const addToFavorites = (job) => {
  //   // const jobPostsRef = collection(db, 'users', user.uid, 'saved-job-posts');
  //   const jobPostsRef = collection(db, 'users', user.uid, 'saved-job-posts');
  //   // addDoc(jobPostsRef, job)
  //   addDoc(jobPostsRef, JSON.parse(JSON.stringify(job)))
  //     .then(docRef => {
  //       console.log("Job has been added successfully");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   console.log(job);
  // }

  // console.log(job);

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

    const response = await fetch('http://127.0.0.1:4000/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    // .then(res => res.json())
    // .then(data => console.log(data));

    const resJson = await response.json();
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
    console.log(job);
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
        <p>{location.display_name}</p>
        <h3>Company:</h3>
        <p>{company.display_name}</p>
        <h3>Salary:</h3>
        <p>{salary}</p>
        <h3>Date Created: </h3>
        <p>{dateCreated}</p>
      </div>
    </div>
  )
}

export default JobCard
