import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

interface UserComponentProps {
    toggleNavbar: () => void;
    handleLogOut: () => void;
    userName: string;
}

const UserComponent = (props: UserComponentProps) => {
    const { toggleNavbar, handleLogOut, userName } = props;
    const [showOptions, setShowOptions] = useState(false);
    const [avatar, setAvatar] = useState(false);

    const updateOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleAvatar = () => {
        setAvatar(!avatar);
    };

    return (
        <li className="nav-item">
            <div
                className={`avatar-container ${avatar ? 'active' : ''}`}
                onClick={updateOptions}
            >
                <img
                    src={'../../../public/usericon.png'}
                    className="avatar"
                    alt="User Avatar"
                    onClick={handleAvatar}
                />
                <span>{showOptions}</span>

                {showOptions && (
                    <div className={`avatar-options ${avatar ? 'active' : ''}`}>
                        <NavLink
                            to="/mydashboard"
                            className="avatar-option field"
                            onClick={toggleNavbar}
                        >
                            My Dashboard
                        </NavLink>

                        <hr className="avatar-option-divider" />
                        <div className="avatar-option btn">
                            <img
                                src="../../../public/userprofile.png"
                                className="subho-img"
                            />
                            <b>{userName}</b>
                        </div>

                        <div
                            className="avatar-option btn"
                            onClick={handleLogOut}
                        >
                            <img
                                className="signout-img"
                                src="../../../public/logout.png"
                            />
                            signout
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
};

export default UserComponent;
