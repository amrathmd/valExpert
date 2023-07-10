import { Login } from '../../pages/index';
import AuthContext from '../../contexts/AuthContext';
import React from 'react';
import { Link, Route, Navigate, Outlet } from 'react-router-dom';
interface Props {
    allowedRoles: string[];
}
const PrivateRoute: React.FC<Props> = ({ allowedRoles }) => {
    const { userType, loggedIn } = React.useContext(AuthContext);
    if (!loggedIn || !allowedRoles.includes(userType)) {
        return <Navigate to="/login"></Navigate>;
    }
    return <Outlet />;
};
export default PrivateRoute;
