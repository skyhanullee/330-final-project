import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import JobListing from "../components/JobListing";

export default function SavedJobsPage() {
  const [job, setJob] = useState();
  const [jobPosts, setJobPosts] = useState([]);
  const token = `Bearer ${localStorage.getItem('token')}`;

  const getAllJobPosts = () => {
    fetch('http://127.0.0.1:4000/bookmarklist', {
      method: 'GET',
      headers: new Headers({
        'Authorization': token,
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status === 409) {
          alert(response.message);
        }
        // console.log(response.json());
        return response.json();
      })
      .then(data => {
        console.log(data);
        setJobPosts(data);
      });

  };

  // const getAllJobs = () => {
  //   for (let jobId of jobIds) {
  //     fetch(`http://127.0.0.1:4000/jobs/${jobId}`, {
  //       method: 'GET',
  //       headers: new Headers({
  //         'Authorization': token,
  //         'Content-Type': 'application/json'
  //       })
  //     })
  //       .then(response => {
  //         const res = response.json();
  //         console.log(res);
  //       })
  //       .then(data => {
  //         console.log(data);
  //         setJobPosts([...jobPosts, data]);
  //       });
  //   }
  // }
  useEffect(() => {
    getAllJobPosts();
    // fetch('http://127.0.0.1:4000/bookmarklist', {
    //   method: 'GET',
    //   headers: new Headers({
    //     'Authorization': token,
    //     'Content-Type': 'application/json'
    //   })
    // })
    //   .then(response => {
    //     if (response.status === 409) {
    //       alert(response.message);
    //     }
    //     response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     setJobPosts(data);
    //   });

  }, [token]);




  // // const token = `Bearer ${localStorage.getItem('token')}`
  // fetch(`http://127.0.0.1:4000/job/${job.jobId}`, {
  //   method: 'GET',
  //   body: JSON.stringify(job),
  //   headers: new Headers({
  //     'Content-Type': 'application/json',
  //     "Authorization": token
  //   })
  // })

  let jobPostsList;
  // const [jobPostsList, setJobPostsList] = useState([]);
  // let updatedJobPostsList = [];
  console.log(jobPosts)

  if (!jobPosts) {
    return (
      <li>
        <div className='job-listing' >
          <div className="job-listing-header">
            <p>
              Something went wrong with saved list.
            </p>
          </div>
        </div>
      </li>
    )
  }

  if (jobPosts?.jobs?.length === 0) {
    jobPostsList = jobPosts?.jobs.map((jobPost) => {
      return (
        // <li>{jobPost.title}</li>
        <li key={jobPost?._id}>
          <div className='job-listing' >
            <div className="job-listing-header">
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
    jobPostsList = jobPosts.filter(j => j !== null).map((jobPost) => {
      jobPost = { ...jobPost, isBookmarked: true };
      return (
        // <li>{jobPost.title}</li>
        <li key={jobPost?._id}>
          {/* <Link to={`/job/${jobPost._id}`} state={{ data: { job: jobPost } }}> */}
          <JobListing job={jobPost} />
          {/* </Link> */}
        </li>
      )
    })
  }

  return (
    <div className='page' id='saved-jobs-page'>
      <section className="page-header-container">
        <h1 className="page-title">Saved Jobs</h1>
      </section>
      <section className="job-listing-container">
        <ul>{jobPostsList}</ul>
      </section>
    </div>
  )
}
