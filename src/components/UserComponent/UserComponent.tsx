import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface UserComponentProps {
  toggleNavbar: () => void;
  handleLogOut: () => void;
}

const UserComponent: React.FC<UserComponentProps> = ({ toggleNavbar, handleLogOut }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleAvatarHover = () => {
    setShowOptions(true);
  };

  const handleAvatarLeave = () => {
    setShowOptions(false);
  };

  const handleOptionsMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOptionsMouseLeave = () => {
    setShowOptions(false);
  };

  return (
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
          onClick={toggleNavbar}
        />
        {showOptions && (
          <div
            className="avatar-options"
            onMouseEnter={handleOptionsMouseEnter}
            onMouseLeave={handleOptionsMouseLeave}
          >
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
            <button className="avatar-option" onClick={handleLogOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default UserComponent;
