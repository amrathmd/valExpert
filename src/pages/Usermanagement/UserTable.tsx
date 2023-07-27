import React, { useState } from 'react';
import DashboardContext from '../../contexts/dashboardContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip } from '@mui/material';
import './UserTable.css';

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
    const [editedUserData, setEditedUserData] = React.useState<Partial<Users>>(
        {}
    );

    const handleUser = () => {
        setDashboardState(1);
    };
    const handleEditUser = (userId: string) => {
        setEditingUserId(userId);
    };

    const handleSaveUser = () => {
        const editedUserIndex = users.findIndex(
            (user) => user._id === editingUserId
        );
        if (editedUserIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers[editedUserIndex] = {
                ...updatedUsers[editedUserIndex],
                ...editedUserData,
            };

            setEditingUserId('');
            setEditedUserData({});
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId('');
        setEditedUserData({});
    };

    const isEditing = (userId: string) => {
        return editingUserId === userId;
    };
    const handleInputChange = (field: keyof Users, value: string) => {
        setEditedUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
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
                                    <a onClick={() => handleEditUser(user._id)}>
                                        <Tooltip
                                            title="Edit User"
                                            placement="top-end"
                                        >
                                            <EditIcon></EditIcon>
                                        </Tooltip>
                                    </a>
                                    <a onClick={() => handleEditUser(user._id)}>
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
    );
};

export default UserTable;
