import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { ErrorBoundary, Navbar } from '../../components';
import { Home, Login, Contact, Register } from '../index';
import './Homepage.css';
const Homepage = () => {
    return (
        <ErrorBoundary>
            <Router>
                <div className="homeContainer">
                    <div className="navbar">
                        <Navbar />
                    </div>

                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/contactus"
                                element={<Contact />}
                            ></Route>
                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </ErrorBoundary>
    );
};
export default Homepage;
