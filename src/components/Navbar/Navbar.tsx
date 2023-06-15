import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import AuthContext from '../../contexts/AuthContext';
import useCookie from 'react-cookie';
import axios from 'axios';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const getColor = (curr: string) => {
    if (location.pathname === curr) {
      return '#d3d3d3';
    }
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleAvatarHover = () => {
    setShowOptions(true);
  };

  const handleAvatarLeave = () => {
    setShowOptions(false);
  };

  const History = useNavigate();
  const handleLogOut = async () => {
    await axios.get('http://localhost:3000/v1/auth/logout');
    await getLoggedIn();
    History('/');
  };

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const { loggedIn, getLoggedIn, userType, username } = React.useContext(
    AuthContext
  );

  return (
    <ErrorBoundary>
      <div>
        <div className={`Navbar-left ${isActive ? 'active' : ''}`}>
          <div
            className={`bar ${isActive ? 'active' : ''}`}
            onClick={toggleNavbar}
          >
            <i className="fa-sharp fa-solid fa-bars fa-2xl"></i>
          </div>
          <div
            className={`close ${isActive ? 'active' : ''}`}
            onClick={toggleNavbar}
          >
            <i className="fa-solid fa-xmark fa-2xl"></i>
          </div>
          <ul className={`nav ${isActive ? 'active' : ''}`}>
            <li className="nav-item">
              <NavLink
                to="/"
                style={{ backgroundColor: getColor('/') }}
                className="navlink"
              >
                <img
                  src={'../../../public/house.png'}
                  className="logo"
                  onClick={toggleNavbar}
                ></img>
                <span className="icon-name">Home</span>
              </NavLink>
            </li>

            {!loggedIn && userType == null && (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  style={{
                    backgroundColor: getColor('/login'),
                  }}
                  className="navlink"
                >
                  <img
                    src={'../../../public/login.png'}
                    className="logo"
                    onClick={toggleNavbar}
                  ></img>
                  <span className="icon-name">Login</span>
                </NavLink>
              </li>
            )}
            {loggedIn && userType === 'valexpertadmin' && (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  style={{
                    backgroundColor: getColor('/login'),
                  }}
                  className="navlink"
                >
                  <img
                    src={'../../../public/login.png'}
                    className="logo"
                    onClick={toggleNavbar}
                  ></img>
                  <span className="icon-name">Login</span>
                </NavLink>
              </li>
            )}
            {loggedIn && userType === 'valexpertadmin' && (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  style={{
                    backgroundColor: getColor('/login'),
                  }}
                  className="navlink"
                >
                  <img
                    src={'../../../public/login.png'}
                    className="logo"
                  ></img>
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                to="/contactus"
                style={{
                  backgroundColor: getColor('/contactus'),
                }}
                className="navlink"
              >
                <img
                  src={'../../../public/paper-plane.png'}
                  className="logo"
                  onClick={toggleNavbar}
                ></img>
                <span className="icon-name">ContactUs</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/browse"
                style={{
                  backgroundColor: getColor('/browse'),
                }}
                className="navlink"
              >
                <img
                  src={'../../../public/search.png'}
                  className="logo"
                  onClick={toggleNavbar}
                ></img>
                <span className="icon-name">Browse</span>
              </NavLink>
            </li>
            {loggedIn && (
              <>
                <li className="nav-item">
                  <div
                    className="avatar-container"
                    onMouseEnter={handleAvatarHover}
                    onMouseLeave={handleAvatarLeave}
                  >
                    <img
                      src={'../../../public/profile.png'}
                      className="avatar"
                      alt="User Avatar"
                    />
                    {showOptions && (
                      <div className="avatar-options">
                        <NavLink
                          to="/mytests"
                          className="avatar-option"
                          onClick={toggleNavbar}
                        >
                          My Tests
                        </NavLink>
                        <NavLink
                          to="/mydashboard"
                          className="avatar-option"
                          onClick={toggleNavbar}
                        >
                          My Dashboard
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <span className="profile-info">
                    Sign out {username}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Navbar;
