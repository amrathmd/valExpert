import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const getColor = (curr: string) => {
        if (location.pathname === curr) {
            return '#d3d3d3';
        }
    };

    return (
        <ErrorBoundary>
            <div>
                <div className="Navbar-left">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                style={{ backgroundColor: getColor('/') }}
                                className="navlink"
                            >
                                <img
                                    src={'../../../public/house.png'}
                                    className="logo"
                                ></img>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                style={{ backgroundColor: getColor('/login') }}
                                className="navlink"
                            >
                                <img
                                    src={'../../../public/login.png'}
                                    className="logo"
                                ></img>
                            </NavLink>
                        </li>
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
                                ></img>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </ErrorBoundary>
    );
};
export default Navbar;
