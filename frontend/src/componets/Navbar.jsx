import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  '../styles/Navbar.css';
import { useSelector } from 'react-redux';


function ColorSchemesExample() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className='userNavbar'>
      <div className='userContainer'>
        <div className='userBrand'>
          <a>
            <h3>Auth</h3>
          </a>
        </div>
        <div className='userMenu'>
          <ul>
            <li>
              <Link to="/" className='userLink'>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className='userLink'>
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ColorSchemesExample;
