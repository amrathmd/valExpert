import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { ErrorBoundary, Navbar } from '../../components';
import { Home, Login, Contact, RegistrationPage, Browse ,Dashboard } from '../index';
import './Homepage.css';
import AuthContext from '../../contexts/AuthContext';
import { DashboardContextProvider } from '../..//contexts/dashboardContext';

const Homepage = () => {
    const { loggedIn, getLoggedIn, userType } = React.useContext(AuthContext);
    return (
        <ErrorBoundary>
            <DashboardContextProvider>
            <Router>
                <div className="homeContainer">
                    <div className="navbar">
                        <Navbar />
                    </div>

                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            {!loggedIn && (
                                <Route
                                    path="/login"
                                    element={<Login />}
                                ></Route>
                            )}
                            <Route
                                path="/contactus"
                                element={<Contact />}
                            ></Route>
                            {loggedIn && userType === 'valexpertadmin' && (
                                <Route
                                    path="/register"
                                    element={<RegistrationPage />}
                                ></Route>
                            )}
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                        </Routes>
                    </div>
                </div>
            </Router>
            </DashboardContextProvider>
        </ErrorBoundary>
    );
};
export default Homepage;
