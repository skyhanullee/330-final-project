import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import adzunaIcon from '../images/adzunaSearch.svg';
import ThemeButton from './ThemeButton';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
          <li className='nav-link' id='sign-in-out-link'>
            <Link to='/signin'>Signin/Register</Link>
          </li>
          <li className="nav-link" id="theme-toggle"><ThemeButton /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
