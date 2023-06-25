import React, { useState } from 'react';
import './Users.css';

interface TableRow {
    id: number;
    name: string;
    mobile: string;
    email: string;
    active: boolean;
}

interface UsersProps {
    userDetails: TableRow[];
}

const UsersTable: React.FC<UsersProps> = ({ userDetails }) => {
    const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
    const [editedUserDetails, setEditedUserDetails] = useState<TableRow[]>([]);
    const [isBlinking, setIsBlinking] = useState(false);

    const handleEdit = (index: number) => {
        setEditRowIndex(index);
        setEditedUserDetails([...userDetails]);
    };

    const handleSave = (index: number) => {
        if (editedUserDetails[index]) {
            const updatedUserDetails = [...editedUserDetails];
            updatedUserDetails[index].active =
                !updatedUserDetails[index].active;
            setEditedUserDetails(updatedUserDetails);
            setEditRowIndex(null);
        }
    };

    const handleCancel = () => {
        setEditRowIndex(null);
        setEditedUserDetails([]);
    };

    const handleChange = (
        index: number,
        field: keyof TableRow,
        value: string | boolean
    ) => {
        const updatedUserDetails = [...editedUserDetails];
        if (updatedUserDetails[index]) {
            updatedUserDetails[index][field] = value as never;
            setEditedUserDetails(updatedUserDetails);
        }
    };

    const handleEditIconClick = (index: number) => {
        setIsBlinking(true);
        setEditRowIndex(index);
        setEditedUserDetails([...userDetails]);
        setTimeout(() => {
            setIsBlinking(false);
        }, 1000);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {userDetails.map((user, index) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            {editRowIndex === index ? (
                                <input
                                    value={editedUserDetails[index]?.name}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            'name',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td>
                            {editRowIndex === index ? (
                                <input
                                    value={editedUserDetails[index]?.mobile}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            'mobile',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                user.mobile
                            )}
                        </td>
                        <td>
                            {editRowIndex === index ? (
                                <input
                                    value={editedUserDetails[index]?.email}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            'email',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td>
                            <div className="action-icons">
                                {editRowIndex === index ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(index)}
                                        >
                                            Save
                                        </button>
                                        <button onClick={handleCancel}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={user.active}
                                                onChange={() =>
                                                    handleSave(index)
                                                }
                                                readOnly
                                            />
                                            <span
                                                className={`slider round ${
                                                    user.active
                                                        ? 'Active'
                                                        : 'Inactive'
                                                }`}
                                            >
                                                {user.active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </label>

                                        <button
                                            className={`edit-button${
                                                isBlinking ? ' blink' : ''
                                            }`}
                                            onClick={() =>
                                                handleEditIconClick(index)
                                            }
                                        >
                                            <img src="/edit.png" alt="Edit" />
                                            <span className="tooltip">
                                                Edit
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
