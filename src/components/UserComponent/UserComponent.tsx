import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

interface UserComponentProps {
    toggleNavbar: () => void;
    handleLogOut: () => void;
    userName: string;
    userType: string;
}

const UserComponent = (props: UserComponentProps) => {
    const { toggleNavbar, handleLogOut, userName, userType } = props;
    const [showOptions, setShowOptions] = useState(false);

    const updateOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <li className="nav-item">
            <div
                className="avatar-container"
                // onMouseEnter={handleAvatarHover}
                // onMouseLeave={handleOptionsMouseLeave}
                onClick={updateOptions}
            >
                <img
                    src={'../../../public/profile.png'}
                    className="avatar"
                    alt="User Avatar"
                    onClick={toggleNavbar}
                />
                <span>{showOptions}</span>

                {showOptions && (
                    <div className="avatar-options">
                        <NavLink
                            to="/mytests"
                            className="avatar-option field"
                            onClick={toggleNavbar}
                        >
                            My Tests
                        </NavLink>
                        <NavLink
                            to="/mydashboard"
                            className="avatar-option field"
                            onClick={toggleNavbar}
                        >
                            My Dashboard
                        </NavLink>

                        <hr className="avatar-option-divider" />
                        <div className="avatar-option btn">{userName}</div>
                        <div className="avatar-option btn">{userType}</div>
                        <button
                            className="avatar-option btn"
                            onClick={handleLogOut}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default UserComponent;
