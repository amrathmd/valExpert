import React, { useState } from 'react';
import DashboardContext from '../../contexts/dashboardContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert, Button, Tooltip } from '@mui/material';
import './UserTable.css';
import axios from 'axios';
import { react_backend_url } from '../..//config';
import { NavLink } from 'react-router-dom';
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
    password: string;
}

interface TableProps {
    users: Users[];
}

const UserTable: React.FC<TableProps> = (props) => {
    const [users, setUsers] = useState<Users[]>(props.users);
    const { dashboardState, setDashboardState } =
        React.useContext(DashboardContext);
    const [isBlinking, setIsBlinking] = useState(false);
    const [editingUserId, setEditingUserId] = React.useState<string>('');
    const [alert, setalert] = React.useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<Users | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const handleEditUser = (userId: string) => {
        setEditingUserId(userId);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${react_backend_url}/v1/adminUsers`
            );
            const userData = response.data;
            setUserDetails(userData.user);
        } catch (error) {
            console.log('Error occurred while fetching users:', error);
        }
    };
    const handleDeleteUser = async (userid: string) => {
        try {
            const result = await axios.delete(
                `${react_backend_url}/v1/adminUsers/${userid}`
            );
            console.log(result);
            setalert(true);
            setTimeout(() => {
                setalert(false);
            }, 3000);
            fetchUsers();
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== userid)
            );
        } catch {
            console.log('error occurred');
        }
    };
    const handleViewUser = async (userid: string) => {
        try {
            const response = await axios.get(
                `http://${react_backend_url}/v1/adminUsers/${userid}`
            );
            const userDetailsData = response.data;
            setUserDetails(userDetailsData.user);
            setShowDetailsModal(true);
        } catch (error) {
            console.log('Error occurred while fetching user details:', error);
        }
    };

    return (
        <div className="user-table-wrapper">
            {alert && (
                <div>
                    <Alert severity="success">User Deleted Successfully!</Alert>
                </div>
            )}
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Manage user</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <NavLink
                                    to={`/manageaccounts/user/${user._id}`}
                                    className="user-link"
                                    title="Click to View User Details"
                                >
                                    <a>{user.fullname}</a>
                                </NavLink>
                            </td>
                            <td>{user.office}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
                                <>
                                    <div className="action-icon">
                                        <a
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                        >
                                            <Tooltip
                                                title="Delete User"
                                                placement="top-end"
                                            >
                                                <DeleteOutlineIcon></DeleteOutlineIcon>
                                            </Tooltip>
                                        </a>
                                    </div>
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {userDetails && (
            <NavLink to=`/${userDetails}`>
                <UserDetails userDetails={userDetails} />
            </NavLink>
        )} */}
        </div>
    );
};

export default UserTable;
