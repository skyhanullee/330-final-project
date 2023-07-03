import { useState } from "react";
import { useNavigate } from "react-router";

function CreateJobPage() {
  // const [jobId, setJobId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState(0);
  // const [createdAt, setCreatedAt] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const [url, setUrl] = useState('');
  // const [author, setAuthor] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJobPost = {
      title: title,
      description: description,
      location: location,
      company: company,
      salary: salary,
      latitude: latitude,
      longitude: longitude,
      isAdzuna: false,
    };

    const token = `Bearer ${localStorage.getItem('token')}`

    // console.log(JSON.stringify(newJobPost));

    fetch('http://127.0.0.1:4000/jobs', {
      method: 'POST',
      body: JSON.stringify(newJobPost),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        console.log('POST: did not create job to mongo db');
      }
      if (response.status === 409) {
        alert('Job already exists.');
      }
      if (response.ok) {
        alert('Job post submitted.')
      }
    });

  };

  return (
    <div className='page' id='create-job-page'>
      <section className="page-header-container">
        <h1 className="page-title">CreateJobPage</h1>
      </section>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />

        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <br />

        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <br />
        {/* 
        <label htmlFor="latitude">Latitude</label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br />

        <label htmlFor="longitude">Longitude</label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br /> */}

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}
export default CreateJobPage
