import React from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { NavLink } from 'react-router-dom';
import UserTable from './UserTable';
import './UserTable.css';

const UserManagement = () => {
    const [users, setUsers] = React.useState([]);
    const [userPrompt, setUserPrompt] = React.useState<boolean>();
    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3000/v1/adminusers');
            console.log(res);
            setUsers(res.data); // Store the fetched users in the state
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    React.useEffect(() => {
        getUsers();
    }, []);

    React.useEffect(() => {
        // When the users state changes, check if there are any users
        setUserPrompt(users.length === 0);
    }, [users]);

    return (
        <div>
            {userPrompt ? ( // Display the welcome message if there are no users
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
                    <NavLink to="/manageaccounts/creatnewuser">
                        <span className="create-button">Add Users</span>
                    </NavLink>
                </div>
            ) : (
                // If there are users, display the table
                <div>
                    <div className="table-container">
                        <UserTable users={users} />{' '}
                        {/* Pass the users array to the UserTable component */}
                    </div>
                    <div className="add-users-button-container">
                        <NavLink to="/manageaccounts/creatnewuser">
                            <span className="create-button">Add Users</span>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserManagement;
