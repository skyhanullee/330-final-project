function JobDetails({ jobObject }) {
  const { location, company, created, salary_min } = jobObject.job
  const dateCreated = new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salary = salary_min.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className='job-details'>
      <h2 id='job-location'>Location: {location.display_name}</h2>
      <h2 id='job-company'>Company: {company.display_name}</h2>
      <h2 id='job-date'>Date Created: {dateCreated}</h2>
      <h2 id='job-salary'>Salary: {salary}</h2>
    </div>
  )
}
export default JobDetails
