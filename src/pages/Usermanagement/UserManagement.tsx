import React from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserTable from './UserTable';
import './UserTable.css';
import { NavLink, Route, useNavigate, useLocation } from 'react-router-dom';
import { react_backend_url } from '../../config';
interface Users {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    mobile: string;
    status: string;
    group: string[];
    country: string;
    office: string;
    department: string;
    // password: string;
}

interface UserFormProps {
    userDetails: Users | null;
    isEditMode: boolean;
}
const UserManagement = () => {
    const [users, setUsers] = React.useState([]);
    const [userPrompt, setUserPrompt] = React.useState<boolean>();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as UserFormProps;
    const getUsers = async () => {
        try {
            const res = await axios.get(`${react_backend_url}/v1/adminusers`);
            setUsers(res.data.allUsers);
            console.log(res.data.allUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    React.useEffect(() => {
        getUsers();
    }, []);

    React.useEffect(() => {
        setUserPrompt(users.length === 0);
    }, [users]);
    const handleAddUsersClick = () => {
        const propsToPass = {
            userDetails: null as Users | null,
            isEditMode: false,
        };
        navigate('/manageaccounts/creatnewuser', { state: propsToPass });
    };

    return (
        <div>
            {userPrompt ? (
                <div className="message">
                    <div>
                        <p className="para">Welcome to our platform!</p>
                        <ul className="dot-list">
                            <li>
                                You have the power to add users from your
                                company enabling
                                <br /> effective collaboration Enhanced Project
                                Management,Customized User Permissions.
                            </li>
                            <li>
                                We believe that by adding users from your
                                company,
                                <br />
                                you'll unlock the full potential of our platform
                                .
                            </li>
                        </ul>
                        <i className="fa fa-start-o" aria-hidden="true"></i>
                    </div>
                    {/* <NavLink to="/manageaccounts/creatnewuser">
                        <span className="create-button">Add Users</span>
                    </NavLink> */}
                    <button
                        className="create-button"
                        onClick={handleAddUsersClick}
                    >
                        Add Users
                    </button>
                </div>
            ) : (
                <div>
                    <div className="table-container">
                        <UserTable users={users} />{' '}
                    </div>
                    <div className="add-users-button-container">
                        <button
                            className="create-button"
                            onClick={handleAddUsersClick}
                        >
                            Add Users
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
const UserFormRoute = () => {
    const location = useLocation();
    const state = location.state as UserFormProps;

    return (
        <Route
            path="/manageaccounts/creatnewuser"
            element={
                <UserForm
                    userDetails={state && state.userDetails}
                    isEditMode={state && state.isEditMode}
                />
            }
        />
    );
};

export default UserManagement;
