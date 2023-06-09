function JobDescription({ jobObject }) {
  const { description } = jobObject.job

  return (
    <div id='job-description'>
      <h2>Description:</h2>
      <p>{description}</p>
    </div>
  )
}
export default JobDescription
