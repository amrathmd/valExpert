import React, { useState } from 'react';
import DashboardContext from '../../contexts/dashboardContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert, Button, Tooltip } from '@mui/material';
import './UserTable.css';
import axios from 'axios';
import { react_backend_url } from '../..//config';

interface Users {
    _id: string;
    name: string;
    mobile: string;
    email: string;
    status: string;
}

interface TableProps {
    users: Users[];
}

const UserTable: React.FC<TableProps> = (props) => {
    const { users } = props;
    const { dashboardState, setDashboardState } =
        React.useContext(DashboardContext);
    const [isBlinking, setIsBlinking] = useState(false);
    const [editingUserId, setEditingUserId] = React.useState<string>('');
    const [alert, setalert] = React.useState<boolean>(false);

    const handleEditUser = (userId: string) => {
        setEditingUserId(userId);
    };
    const refresh = () => {
        window.location.reload();
    };
    const handleDeleteUser = async (userid: string) => {
        try {
            const result = await axios.delete(
                `${react_backend_url}/v1/adminUsers/${userid}`
            );
            console.log(result);
            setalert(true);
        } catch {
            console.log('error occurred');
        }
    };

    return (
        <div>
            {alert && (
                <div>
                    <Alert severity="success">User Deleted Successfully!</Alert>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={refresh}
                    >
                        Refresh
                    </Button>
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
                            <td>{user.name}</td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
                                <>
                                    <div className="action-icon">
                                        <a
                                            onClick={() =>
                                                handleEditUser(user._id)
                                            }
                                        >
                                            <Tooltip
                                                title="Edit User"
                                                placement="top-end"
                                            >
                                                <EditIcon></EditIcon>
                                            </Tooltip>
                                        </a>
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
        </div>
    );
};

export default UserTable;
