import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

export default function SavedJobsPage() {
  const [jobPosts, setJobPosts] = useState([]);
  const token = `Bearer ${localStorage.getItem('token')}`

  const getAllJobPosts = () => {
    fetch('http://127.0.0.1:4000/bookmarklist', {
      method: 'GET',
      headers: new Headers({
        'Authorization': token,
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setJobPosts(data);
      });

  };
  useEffect(() => {
    getAllJobPosts();
  }, []);


  let jobPostsList;
  // console.log(jobPosts[0]?.jobs)

  if (jobPosts[0] === undefined || jobPosts[0].jobs.length === 0) {
    jobPostsList = jobPosts.map((jobPost) => {
      return (
        // <li>{jobPost.title}</li>
        <li key={jobPost._id}>
          <div className='job-card' >
            <div className="job-card-header">
              <p>
                Nothing saved yet.
              </p>
            </div>
          </div>
        </li>
      )
    })
  }
  else {
    jobPostsList = jobPosts.map((jobPost) => {
      return (
        // <li>{jobPost.title}</li>
        <li key={jobPost._id}>
          <Link to={`/job/${jobPost._id}`} state={{ data: { job: jobPost } }}>
            <JobCard job={jobPost} />
          </Link>
        </li>
      )
    })
  }

  return (
    <div className='page'>
      <h1>Saved Jobs</h1>
      {/* <ul>{jobPostsList}</ul> */}
    </div>
  )
}
