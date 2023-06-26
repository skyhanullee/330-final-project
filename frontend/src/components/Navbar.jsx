import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import adzunaIcon from '../images/adzunaSearch.svg';
import ThemeButton from './ThemeButton';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    }
  }, [setUser, user]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    // setIsLoggedIn(true);
    setUser(false);
    alert('Successfully logged out.')
    navigate('/');
  };

  return (
    <header>
      <nav className='top-nav'>
        <div className="nav-title-container">
          <img src={adzunaIcon} alt='adzuna logo' id='adzuna-icon' />
          <h2 id='nav-title'>Job Search via Adzuna</h2>
        </div>
        <ul className='links-container'>
          <li className="nav-link" id='home-link'>
            <Link to='/'>Home</Link>
          </li>
          <li className="nav-link" id='user-job-posts-link'>
            <Link to='/userjobposts'>User Job Posts</Link>
          </li>
          {
            user &&
            <li className="nav-link" id='saved-posts-link'>
              <Link to='/savedjobs'>Saved Posts</Link>
            </li>
          }
          {
            !user &&
            <li className='nav-link' id='sign-in-out-link'>
              <Link to='/signin'>Sign In</Link>
            </li>
          }
          {
            user &&
            <li className='nav-link' id='sign-out-link' onClick={handleLogout}>
              Log Out
              {/* <Link to='/'>Logout</Link> */}
            </li>
          }
          <li className="nav-link" id="theme-toggle"><ThemeButton /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
