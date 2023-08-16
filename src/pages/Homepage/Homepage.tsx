import React, { ReactNode } from 'react';
import { useEffect, useState } from 'react';
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
    Projects,
} from '../index';
import './Homepage.css';
import AuthContext from '../../contexts/AuthContext';
import { DashboardContextProvider } from '../..//contexts/dashboardContext';
import PrivateRoute from '../..//components/PrivateRoute/PrivateRoute';
import UserManagement from '../Usermanagement/UserManagement';
import UserForm from '../Usermanagement/UserForm';
import Form from '../Browse/projectForm';
import ProjectForm from '../Projects/projectForm';
import UserDetails from '../Usermanagement/userDetails';
import configureAppStore, {
    getPreloadedState,
} from '../../store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import LaptopIcon from '@mui/icons-material/Laptop';

const Homepage = () => {
    const { loggedIn, getLoggedIn, userType } = React.useContext(AuthContext);
    const [userprompt, setUserPrompt] = React.useState<boolean>(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const preloadedState = getPreloadedState();

    const handleUserPrompt = () => {
        setUserPrompt(!userprompt);
    };
    return (
        <ErrorBoundary>
            <DashboardContextProvider>
                <Router>
                    <div className="homeContainer">
                        <div className="navbar">
                            <Navbar />
                        </div>
                        {isDesktop ? (
                            <div className="routes">
                                <ReduxProvider
                                    store={configureAppStore(preloadedState)}
                                >
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<Projects />}
                                        ></Route>
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
                                                    allowedRoles={[
                                                        'valexpertadmin',
                                                    ]}
                                                />
                                            }
                                        >
                                            <Route
                                                path="/register"
                                                element={<RegistrationPage />}
                                            ></Route>
                                        </Route>
                                        <Route
                                            path="/dashboard/:id"
                                            element={<Dashboard />}
                                        ></Route>
                                        <Route
                                            path="/manageaccounts"
                                            element={<UserManagement />}
                                        ></Route>
                                        <Route
                                            path="/manageaccounts/creatnewuser"
                                            element={
                                                <UserForm
                                                    userDetails={null}
                                                    isEditMode={false}
                                                />
                                            }
                                        />
                                        <Route
                                            path="/createProject"
                                            element={<ProjectForm />}
                                        ></Route>
                                        <Route
                                            path="/manageaccounts/user/:id"
                                            element={<UserDetails />}
                                        ></Route>
                                    </Routes>
                                </ReduxProvider>
                            </div>
                        ) : (
                            <div className="mobileMessageContainer">
                                <div className="iconContainer">
                                    <LaptopIcon />
                                </div>
                                <p className="mobileMessage">
                                    This website is only accessible on desktop
                                    devices.
                                </p>
                            </div>
                        )}
                    </div>
                </Router>
            </DashboardContextProvider>
        </ErrorBoundary>
    );
};
export default Homepage;
