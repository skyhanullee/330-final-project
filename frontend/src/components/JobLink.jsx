function JobLink({ jobId }) {
  return (
    <a href={`https://adzuna.com/details/${jobId}`} id='job-link' target='_blank' rel='noreferrer'>
      <button>Link to Adzuna Page</button>
    </a>
  )
}
export default JobLink
