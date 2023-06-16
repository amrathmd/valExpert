import React, { useState } from 'react';
import './Users.css';

interface TableRow {
    id: number;
    name: string;
    password: string;
    email: string;
}
const Users: React.FC = () => {
    const [tableRows, setTableRows] = useState<TableRow[]>([]);
    const [newRow, setNewRow] = useState<TableRow>({
        id: 0,
        name: '',
        password: '',
        email: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const handleDeleteRow = (id: number) => {
        const updatedRows = tableRows.filter((row) => row.id !== id);
        setTableRows(updatedRows);
    };

    const handleEditRow = (id: number) => {
        const rowToEdit = tableRows.find((row) => row.id === id);
        if (rowToEdit) {
            setNewRow(rowToEdit);
            handleDeleteRow(id);
            setIsEditMode(true);
        }
    };

    const handleSave = () => {
        if (isEditMode) {
            const updatedRows = [...tableRows, newRow];
            setTableRows(updatedRows);
        }
        setNewRow({ id: 0, name: '', password: '', email: '' });
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
        setNewRow({ id: 0, name: '', password: '', email: '' });
        setIsEditMode(false);
    };
    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.password}</td>
                                <td>{row.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditRow(row.id)}
                                    >
                                        Edit
                                    </button>{' '}
                                    <button
                                        onClick={() => handleDeleteRow(row.id)}
                                    >
                                        Delete
                                    </button>
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
                                        type="password"
                                        placeholder="Password"
                                        value={newRow.password}
                                        onChange={(e) =>
                                            setNewRow({
                                                ...newRow,
                                                password: e.target.value,
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
                                    <button
                                        onClick={() => setIsEditMode(false)}
                                    >
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
