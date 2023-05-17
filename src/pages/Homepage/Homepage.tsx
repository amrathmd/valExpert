import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { ErrorBoundary, Navbar } from '../../components';
import { Home, Login, Contact } from '../index';
import './Homepage.css';
const Homepage = () => {
    return (
        <ErrorBoundary>
            <Router>
                <div className="container">
                    <div className="flex-container">
                        <Navbar />

                        <div className="routes">
                            <Routes>
                                <Route path="/" element={<Home />}></Route>
                                <Route
                                    path="/login"
                                    element={<Login />}
                                ></Route>
                                <Route
                                    path="/contactus"
                                    element={<Contact />}
                                ></Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </ErrorBoundary>
    );
};
export default Homepage;
