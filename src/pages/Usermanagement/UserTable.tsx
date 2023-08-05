import React, { useState } from 'react';
import DashboardContext from '../../contexts/dashboardContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert, Button, Tooltip } from '@mui/material';
import './UserTable.css';
import axios from 'axios';
import { react_backend_url } from '../..//config';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { User } from '@/components/Models/adminUsersModel';
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
                `http://localhost:3000/v1/adminUsers/${userid}`
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
                            <td>{user.fullname}</td>
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
                                        <a>
                                            <button
                                                onClick={() =>
                                                    handleViewUser(user._id)
                                                }
                                            >
                                                View details
                                            </button>
                                        </a>
                                    </div>
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {userDetails && (
                <Dialog
                    open={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        style: {
                            borderRadius: 20,
                        },
                    }}
                >
                    <DialogTitle className="field">
                        {'  '}
                        <strong>User Details</strong>
                    </DialogTitle>
                    <DialogContent
                        style={{
                            minHeight: '300px',
                            padding: '30px',
                        }}
                    >
                        <div className="field">
                            <strong>Full Name:</strong>
                            {userDetails.fullname}
                        </div>

                        <div className="field">
                            <strong>User Name:</strong>
                            {userDetails.username}
                        </div>
                        <div className="field">
                            <strong>Mobile:</strong> {userDetails.mobile}
                        </div>
                        <div className="field">
                            <strong>Email:</strong> {userDetails.email}
                        </div>
                        <div className="field">
                            <strong>Status:</strong> {userDetails.status}
                        </div>
                        <div className="field">
                            <strong>Group:</strong>{' '}
                            {userDetails.group.join(', ')}
                        </div>
                        <div className="field">
                            <strong>Country:</strong> {userDetails.country}
                        </div>
                        <div className="field">
                            <strong>Status:</strong> {userDetails.status}
                        </div>
                        <div className="field">
                            <strong>Office:</strong> {userDetails.office}
                        </div>
                        <div className="field">
                            <strong>Department:</strong>{' '}
                            {userDetails.department}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDetailsModal(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default UserTable;
