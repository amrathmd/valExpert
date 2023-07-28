import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import AuthContext from '../../contexts/AuthContext';
import useCookie from 'react-cookie';
import axios from 'axios';
import UserComponent from '../UserComponent/UserComponent';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpRoundedIcon from '@mui/icons-material/Help';
import { Tooltip } from '@mui/material';
const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const getColor = (curr: string) => {
        if (location.pathname === curr) {
            return '#d3d3d3';
        }
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

    const { loggedIn, getLoggedIn, userType, userName } =
        React.useContext(AuthContext);

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
                            <Tooltip title="Home" placement="left">
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
                                </NavLink>
                            </Tooltip>
                        </li>

                        {!loggedIn && userType == null && (
                            <li className="nav-item">
                                <Tooltip title="Login" placement="left">
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
                                    </NavLink>
                                </Tooltip>
                            </li>
                        )}
                        {loggedIn && userType === 'valexpertadmin' && (
                            <li className="nav-item">
                                <Tooltip title="Register" placement="left">
                                    <NavLink
                                        to="/register"
                                        style={{
                                            backgroundColor:
                                                getColor('/register'),
                                        }}
                                        className="navlink"
                                    >
                                        <img
                                            src={'../../../public/login.png'}
                                            className="logo"
                                            onClick={toggleNavbar}
                                        ></img>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        )}
                        <li className="nav-item">
                            <Tooltip title="Dashboard" placement="left">
                                <NavLink
                                    to="/dashboard"
                                    style={{
                                        backgroundColor: getColor('/dashboard'),
                                    }}
                                    className="navlink"
                                >
                                    <img
                                        src={'../../../public/folder.png'}
                                        className="logo"
                                        onClick={toggleNavbar}
                                    ></img>
                                </NavLink>
                            </Tooltip>
                        </li>
                        {loggedIn && userType !== null && (
                            <div>
                                <UserComponent
                                    userName={userName}
                                    handleLogOut={handleLogOut}
                                />
                            </div>
                        )}
                        <li>
                            {
                                /*loggedIn && userType === 'admin' &&*/
                                <div>
                                    <Tooltip
                                        title="Manage Users"
                                        placement="left"
                                    >
                                        <NavLink
                                            to="/manageaccounts"
                                            style={{
                                                backgroundColor:
                                                    getColor('/manageaccounts'),
                                            }}
                                            className="navlink"
                                        >
                                            <ManageAccountsIcon
                                                sx={{ color: 'white' }}
                                            ></ManageAccountsIcon>
                                        </NavLink>
                                    </Tooltip>
                                </div>
                            }
                            <div>
                                <Tooltip title="Help" placement="left">
                                    <NavLink
                                        to="/help"
                                        style={{
                                            backgroundColor: getColor('/help'),
                                        }}
                                        className="navlink"
                                    >
                                        <HelpRoundedIcon
                                            sx={{ color: 'white' }}
                                        ></HelpRoundedIcon>
                                    </NavLink>
                                </Tooltip>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Navbar;
