import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import JobPage from './pages/JobPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
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
      </Routes>
    </div>
  );
}

export default App;
