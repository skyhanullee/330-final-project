import { useState } from "react";

function CreateJobPage() {
  // const [jobId, setJobId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [url, setUrl] = useState('');
  // const [author, setAuthor] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="page">
      <h1>CreateJobPage</h1>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Job ID"
          required
        /> */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
          required
        />
        <input
          type="text"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          placeholder="Created At"
        />
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default CreateJobPage
