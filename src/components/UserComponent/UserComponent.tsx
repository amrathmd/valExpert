import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

interface UserComponentProps {
  toggleNavbar: () => void;
  handleLogOut: () => void; 
}

const UserComponent: React.FC<UserComponentProps> = ({ toggleNavbar, handleLogOut }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { getLoggedIn, userName } = useContext(AuthContext);

  const handleAvatarHover = () => {
    setShowOptions(true);
  };

  const handleOptionsMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOptionsMouseLeave = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleLogoutClick = () => {
    handleLogOut(); 
    toggleNavbar();
  };

  return (
    <li className="nav-item">
      <div
        className="avatar-container"
        onMouseEnter={handleAvatarHover}
        onMouseLeave={handleOptionsMouseLeave}
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
            ref={optionsRef}
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
            <div className="avatar-option username">{userName}</div>
            <hr className="avatar-option-divider" />
            <button className="avatar-option" onClick={handleLogoutClick}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default UserComponent;
