import React, { useState } from 'react';
import './Browse.css';

interface BrowseItem {
    id: number;
    image: string;
    label: string;
    content: string;
}

interface TableRow {
    id: number;
    name: string;
    password: string;
    email: string;
}

const Browse: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<BrowseItem | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState<number>(200);
    const [isDragging, setIsDragging] = useState<boolean>(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [tableRows, setTableRows] = useState<TableRow[]>([]);
    const [newRow, setNewRow] = useState<TableRow>({
        id: 0,
        name: '',
        password: '',
        email: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClick = (item: BrowseItem) => {
        setSelectedItem(item);
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
    };

    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        if (isDragging) {
            const newSidebarWidth = event.clientX;
            setSidebarWidth(newSidebarWidth);
        }
    };

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

    const browseItems: BrowseItem[] = [
        {
            id: 1,
            image: '../../../public/users.png',
            label: 'Users',
            content: 'Welcome Admin',
        },
        {
            id: 2,
            image: '../../../public/projects.png',
            label: 'Projects',
            content: 'Content for Projects',
        },
        {
            id: 3,
            image: '../../../public/bin.png',
            label: 'Deleted Items',
            content: 'Content for Deleted Items',
        },
    ];

    return (
        <div className="browse">
            <div className="browse-sidebar" style={{ width: sidebarWidth }}>
                <ul>
                    {browseItems.map((item) => (
                        <li
                            key={item.id}
                            className={`${
                                selectedItem === item ? 'selected' : ''
                            }`}
                            onClick={() => handleItemClick(item)}
                        >
                            <span className="bullet-point" />
                            <img
                                src={item.image}
                                alt={item.label}
                                className="item-image"
                            />
                            <span className="item-label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className={`browse-content ${
                    selectedItem ? '' : 'no-item-selected'
                }`}
                draggable={!selectedItem}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
            >
                {selectedItem ? (
                    <div>
                        <div className="content-item">
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.label}
                                className="content-item-image"
                            />
                            <span className="content-item-label">
                                {selectedItem.label}
                            </span>
                            <div
                                className="dropdown"
                                onMouseLeave={closeDropdown}
                            >
                                <button
                                    className="dropdown-button"
                                    onClick={toggleDropdown}
                                >
                                    Create
                                </button>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <a href="#">Menu Item 1</a>
                                        <a href="#">Menu Item 2</a>
                                        <a href="#">Menu Item 3</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="content-class">{selectedItem.content}</p>
                        {selectedItem.label === 'Users' && (
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
                                                            onClick={() =>
                                                                handleEditRow(
                                                                    row.id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteRow(
                                                                    row.id
                                                                )
                                                            }
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
                                                                    name: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            value={
                                                                newRow.password
                                                            }
                                                            onChange={(e) =>
                                                                setNewRow({
                                                                    ...newRow,
                                                                    password:
                                                                        e.target
                                                                            .value,
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
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={handleSave}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setIsEditMode(
                                                                    false
                                                                )
                                                            }
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
                        )}
                    </div>
                ) : (
                    <div>No item Selected</div>
                )}
            </div>
        </div>
    );
};

export default Browse;
