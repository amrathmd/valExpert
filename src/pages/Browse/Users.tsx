import React, { useState } from 'react';
import './Users.css';

interface TableRow {
    id: number;
    name: string;
    mobile: string;
    email: string;
    active: boolean;
}
const Users: React.FC = () => {
    const [tableRows, setTableRows] = useState<TableRow[]>([]);
    const [newRow, setNewRow] = useState<TableRow>({
        id: 0,
        name: '',
        mobile: '',
        email: '',
        active: false,
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    const handleDeleteRow = (id: number) => {
        setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleEditRow = (id: number) => {
        if (isEditMode && newRow.id !== 0) {
            handleSave();
        }

        const rowToEdit = tableRows.find((row) => row.id === id);

        if (rowToEdit) {
            setNewRow(rowToEdit);
            setIsEditMode(true);
            setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }
    };
    const handleSave = () => {
        if (isEditMode) {
            const updatedRows = [...tableRows, newRow];
            setTableRows(updatedRows);
        }
        setNewRow({ id: 0, name: '', mobile: '', email: '', active: false });
        setIsEditMode(false);
    };

    const handleAddRow = () => {
        if (isEditMode) {
            handleSave();
        } else {
            const newRowWithId = {
                ...newRow,
                id: Math.floor(Math.random() * 1000000),
            };
            setTableRows([...tableRows, newRowWithId]);
        }
        setNewRow({ id: 0, name: '', mobile: '', email: '', active: false });
        setIsEditMode(false);
    };
    const handleEditIconClick = (id: number) => {
        handleEditRow(id);
        setIsBlinking(true);
        setTimeout(() => {
            setIsBlinking(false);
        }, 1000);
    };
    const handleToggleSwitch = (id: number) => {
        const updatedRows = tableRows.map((row) => {
            if (row.id === id) {
                return { ...row, active: !row.active };
            }
            return row;
        });
        setTableRows(updatedRows);
    };
    const handleCancelEdit = () => {
        setIsEditMode(false);
        setTableRows((prevRows) => [...prevRows, newRow]);
        setNewRow({
            id: 0,
            name: '',
            mobile: '',
            email: '',
            active: false,
        });
    };

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.mobile}</td>
                                <td>{row.email}</td>
                                <td>
                                    <div className="action-icons">
                                        <button
                                            className={`edit-button${
                                                isBlinking ? ' blink' : ''
                                            }`}
                                            onClick={() =>
                                                handleEditIconClick(row.id)
                                            }
                                        >
                                            <img
                                                src="../../../public/edit.png"
                                                alt="Edit"
                                            />
                                            <span className="tooltip">
                                                Edit
                                            </span>
                                        </button>{' '}
                                        <label
                                            className={`switch ${
                                                row.active ? 'active' : ''
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={row.active}
                                                onChange={() =>
                                                    handleToggleSwitch(row.id)
                                                }
                                            />
                                            <span className="slider round"></span>
                                            <span
                                                className={`label ${
                                                    row.active
                                                        ? 'deactivate'
                                                        : 'activate'
                                                }`}
                                            >
                                                {row.active
                                                    ? 'Deactivate'
                                                    : 'Activate'}
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {isEditMode && (
                            <tr>
                                <td>{newRow.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newRow.name}
                                        onChange={(e) =>
                                            setNewRow({
                                                ...newRow,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Mobile"
                                        value={newRow.mobile}
                                        onChange={(e) =>
                                            setNewRow({
                                                ...newRow,
                                                mobile: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newRow.email}
                                        onChange={(e) =>
                                            setNewRow({
                                                ...newRow,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <button onClick={handleSave}>Save</button>{' '}
                                    <button onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button onClick={handleAddRow}>Add User</button>
        </div>
    );
};
export default Users;
