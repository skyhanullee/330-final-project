import { useLocation, useParams } from 'react-router-dom';
import JobDescription from '../components/JobDescription';
import JobDetails from '../components/JobDetails';
import JobLink from '../components/JobLink';

function JobPage() {
  const { jobId } = useParams();
  const dataLocation = useLocation();
  const jobObject = dataLocation.state?.data;
  // console.log(jobObject);
  const { title } = jobObject.job;

  return (
    <div className='page'>
      <h1 className='job-title'>{title}</h1>
      <JobDetails jobObject={jobObject} />
      <JobDescription jobObject={jobObject} />
    </div>
  )
}
export default JobPage
