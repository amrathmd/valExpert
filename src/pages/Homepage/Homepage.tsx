import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { ErrorBoundary, Navbar } from '../../components';
import {
    Home,
    Login,
    Contact,
    RegistrationPage,
    Browse,
    Dashboard,
} from '../index';
import './Homepage.css';
import AuthContext from '../../contexts/AuthContext';
import { DashboardContextProvider } from '../..//contexts/dashboardContext';
import PrivateRoute from '../..//components/PrivateRoute/PrivateRoute';
import UserManagement from '../Usermanagement/UserManagement';

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
                                <Route
                                    path="/register"
                                    element={
                                        <PrivateRoute
                                            allowedRoles={['valexpertadmin']}
                                        />
                                    }
                                >
                                    <Route
                                        path="/register"
                                        element={<RegistrationPage />}
                                    ></Route>
                                </Route>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                ></Route>
                                <Route
                                    path="/manageaccounts"
                                    element={<UserManagement />}
                                ></Route>
                            </Routes>
                        </div>
                    </div>
                </Router>
            </DashboardContextProvider>
        </ErrorBoundary>
    );
};
export default Homepage;
