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
    const History = useNavigate();
    const handleLogOut = async () => {
        await axios.get('http://localhost:3000/v1/auth/logout');
        await getLoggedIn();
        History('/');
    };

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    const { loggedIn, getLoggedIn } = React.useContext(AuthContext);
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
                            </NavLink>
                        </li>

                        {!loggedIn && (
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
                            </NavLink>
                        </li>
                        {loggedIn && (
                            <button onClick={handleLogOut}>logout</button>
                        )}
                    </ul>
                </div>
            </div>
        </ErrorBoundary>
    );
};
export default Navbar;
