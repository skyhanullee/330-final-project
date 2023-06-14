import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import JobPage from './pages/JobPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import UserJobPostsPage from './pages/UserJobPostsPage';
import CreateJobPage from './pages/CreateJobPage';
import SavedJobsPage from './pages/SavedJobsPage';
import UserContext from './context/UserContext';


function App() {
  const { themeName } = useContext(UserContext);

  return (
    <div className={`App ${themeName}`}>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/job/:jobId' element={<JobPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/userjobposts' element={<UserJobPostsPage />} />
        <Route path='/createjob' element={<CreateJobPage />} />
        <Route path='/savedjobs' element={<SavedJobsPage />} />
      </Routes>
    </div>
  );
}

export default App;
