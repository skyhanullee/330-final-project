import { Icon } from '@iconify/react';
import { useState, useEffect, useContext } from "react"
import db from '../db/db';
import UserContext from '../context/UserContext';

function JobCard({ job }) {
  const { title, location, company, salary_min, created, id } = job
  const dateCreated = new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salary = salary_min.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // const [user, setUser] = useState({});
  const { user, setUser } = useContext(UserContext);

  const addToFavorites = (job) => {
    // const jobPostsRef = collection(db, 'users', user.uid, 'saved-job-posts');
    const jobPostsRef = collection(db, 'users', user.uid, 'saved-job-posts');
    // addDoc(jobPostsRef, job)
    addDoc(jobPostsRef, JSON.parse(JSON.stringify(job)))
      .then(docRef => {
        console.log("Job has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    console.log(job);
  }

  const handleOnClick = (e) => {
    e.stopPropagation();
    addToFavorites(job);
    // console.log(job);
  }

  return (
    <div className='job-card' id={`job-${id}`}>
      <div className="job-card-header">
        <h1 className='job-card-title'>{title}</h1>
        <Icon
          className='bookmark-icon'
          icon="material-symbols:bookmark-outline"
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
