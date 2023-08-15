import React from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { NavLink } from 'react-router-dom';
import UserTable from './UserTable';
import './UserTable.css';
import StickyHeader from '../../components/ProjectHeader/StickyHeader';
import { react_backend_url } from '../../config';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import './UserManagement.css';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
const UserManagement = () => {
    const [users, setUsers] = React.useState([]);
    const [userPrompt, setUserPrompt] = React.useState<boolean>();
    const [activeUsers, setActiveUsers] = React.useState<number>(0);
    const [inactiveUsers, setInactiveUsers] = React.useState<number>(0);
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
        // When the users state changes, check if there are any users
        setUserPrompt(users.length === 0);
        setActiveUsers(users.filter((user) => user.status === 'Active').length);
        setInactiveUsers(
            users.filter((user) => user.status === 'Inactive').length
        );
    }, [users]);

    return (
        <div>
            <StickyHeader />
            <div>
                {userPrompt ? ( // Display the welcome message if there are no users
                    <div className="message">
                        <div>
                            <p className="para">Welcome to our platform!</p>
                            <ul className="dot-list">
                                <li>
                                    You have the power to add users from your
                                    company enabling
                                    <br /> effective collaboration Enhanced
                                    Project Management,Customized User
                                    Permissions.
                                </li>
                                <li>
                                    We believe that by adding users from your
                                    company,
                                    <br />
                                    you'll unlock the full potential of our
                                    platform .
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
                        <div className="usermanagementconsole">
                            <SupervisedUserCircleIcon
                                sx={{ color: '#003059' }}
                            />{' '}
                            User Management Console
                        </div>
                        <div className="cardsContainer">
                            <div>
                                <Card
                                    sx={{
                                        width: 200,
                                        backgroundColor: '#13bb24',
                                        height: 100,
                                    }}
                                >
                                    <CardContent>
                                        <div className="iconPlusData">
                                            <h4 className="card-data">
                                                {inactiveUsers}
                                            </h4>
                                            <PersonAddIcon
                                                sx={{ color: 'white' }}
                                            />
                                        </div>
                                        <h6 className="card-heading">
                                            Number of Active users
                                        </h6>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <Card
                                    sx={{
                                        width: 200,
                                        height: 100,
                                        backgroundColor: '#F53A3A',
                                    }}
                                >
                                    <CardContent>
                                        <div className="iconPlusData">
                                            <h4 className="card-data">
                                                {activeUsers}
                                            </h4>
                                            <PersonAddDisabledIcon
                                                sx={{ color: 'white' }}
                                            />
                                        </div>
                                        <h6 className="card-heading">
                                            Number of Inactive users
                                        </h6>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="table-container">
                            <UserTable users={users} />{' '}
                        </div>
                        <div className="add-users-button-container">
                            <NavLink to="/manageaccounts/creatnewuser">
                                <span className="create-button">Add Users</span>
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserManagement;
