import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";

function UserJobPosts() {
  const [jobPosts, setJobPosts] = useState([]);
  const getAllJobPosts = () => {
    fetch('http://127.0.0.1:4000/jobs', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setJobPosts(data);
      });

  };
  useEffect(() => {
    getAllJobPosts();
  }, []);

  const jobPostsList = jobPosts.map((jobPost) => {
    return (
      // <li>{jobPost.title}</li>
      <li key={jobPost._id}>

        <JobCard job={jobPost} />
      </li>
    )
  })

  return (
    <div className="page">
      <h1>User Job Posts</h1>
      <button><Link to='/createJob'>Add a Job Post</Link></button>
      <ul>{jobPostsList}</ul>
    </div>
  )
}
export default UserJobPosts
