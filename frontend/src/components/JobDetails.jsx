function JobDetails({ jobObject }) {
  const { location, company, created, createdAt, salary_min, salary } = jobObject.job
  const dateCreated = new Date((created || createdAt)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salaryListing = (salary_min || salary)?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className='job-page-details'>
      <h2 id='job-location'>Location: {location}</h2>
      <h2 id='job-company'>Company: {company}</h2>
      <h2 id='job-date'>Date Created: {dateCreated}</h2>
      <h2 id='job-salary'>Salary: {salaryListing}</h2>
    </div>
  )
}
export default JobDetails
