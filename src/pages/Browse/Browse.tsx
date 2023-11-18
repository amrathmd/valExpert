import React, { useEffect, useState } from 'react';
import './Browse.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Table from './projectTable';
import Form from './projectForm';
import UserTable from './userTable';
import UserForm from './userForm';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { react_backend_url } from '../../config';

interface BrowseItem {
    id: number;
    image: string;
    label: string;
    content: string;
}
interface Users {
    _id: string;
    name: string;
    mobile: string;
    email: string;
    status: string;
}
const Browse: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<BrowseItem | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState<number>(200);
    const [isDragging, setIsDragging] = useState<boolean>(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [userprompt, setuserprompt] = useState(false);
    const [prompt, setPrompt] = useState(false);

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleItemClick = (item: BrowseItem) => {
        setSelectedItem(item);
        setSelectedItemId(item.id);
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

    useEffect(() => {
        getUsers();
    }, []);

    const handleCreateProject = () => {
        const obj = {
            _id: '1',
            name: 'Naveen',
            Department: 'CSE',
            Category: 'None',
            ProjectDescription: 'Nothing',
            EstimatedDate: '12-09-2025',
        };
        setProjects([...projects, obj]);
        handlePrompt();
        console.log(projects);
    };

    const handlePrompt = () => {
        setPrompt(!prompt);
    };
    const getUsers = async () => {
        const res = await axios.get('http://localhost:3000/v1/adminusers');
        console.log(res);
        setUsers(res.data);
        console.log(users);
    };
    const handleUserPrompt = () => {
        setuserprompt(!userprompt);
    };
    const handleUpdateUsers = (updatedUsers: Users[]) => {
        setUsers(updatedUsers);
    };
    const handleDeleteUser = (userId: string) => {
        const updatedUsers = users.filter((user: Users) => user._id !== userId);
        setUsers(updatedUsers);
    };
    const browseItems: BrowseItem[] = [
        {
            id: 1,
            image: '../../../public/users.png',
            label: 'Users',
            content: 'Content for Users',
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
    const getProjects = async () => {
        const res = await axios.get(`${react_backend_url}/v1/projects`);
        console.log(res);
        setProjects(res.data);
    };
    const refresh = async () => {
        handlePrompt();
        await getProjects();
    };
    useEffect(() => {
        getProjects();
    }, []);
    return (
        <div className="browse">
            <div className="browse-sidebar" style={{ width: sidebarWidth }}>
                <ul>
                    {browseItems.map((item) => (
                        <li
                            key={item.id}
                            className={`${
                                selectedItemId === item.id ? 'selected' : ''
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
                        {selectedItem.label === 'Users' &&
                        users.length === 0 ? (
                            <div>
                                <div className="projects-empty">
                                    <div>
                                        <p className="para">
                                            Welcome to our platform!
                                        </p>
                                        <ul className="dot-list">
                                            <li>
                                                You have the power to add users
                                                from your company enabling
                                                <br /> effective collaboration
                                                Enhanced Project
                                                Management,Customized User
                                                Permissions dear .
                                            </li>
                                            <li>
                                                We believe that by adding users
                                                from your company,
                                                <br />
                                                you'll unlock the full potential
                                                of our platform .
                                            </li>
                                        </ul>
                                        <i
                                            className="fa fa-start-o"
                                            aria-hidden="true"
                                        ></i>
                                        <img
                                            className="projects-img"
                                            src={selectedItem.image}
                                            alt={selectedItem.label}
                                        />

                                        <span
                                            className="create-button"
                                            onClick={handleUserPrompt}
                                        >
                                            Add Users
                                        </span>
                                        <UserForm
                                            userprompt={userprompt}
                                            handleUserPrompt={handleUserPrompt}
                                            getUsers={getUsers}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            selectedItem.label == 'Users' && (
                                <div>
                                    <UserTable
                                        users={users}
                                        onUpdateUsers={handleUpdateUsers}
                                        onDeleteUser={handleDeleteUser}
                                    />
                                    <UserForm
                                        userprompt={userprompt}
                                        handleUserPrompt={handleUserPrompt}
                                        getUsers={getUsers}
                                    />
                                    <div
                                        onClick={handleUserPrompt}
                                        className="create-project"
                                    >
                                        Add User
                                    </div>
                                </div>
                            )
                        )}
                        {selectedItem.label === 'Projects' &&
                        projects.length === 0 ? (
                            <div>
                                <div className="projects-empty">
                                    <div>
                                        <p className="para">
                                            Have Yout tried our Projects?
                                        </p>
                                        <ul className="dot-list">
                                            <li>
                                                share multiple sheets and
                                                folders to workspace members
                                            </li>
                                            <li>
                                                create client workspaces with
                                                custom colors & logo
                                            </li>
                                        </ul>
                                        <i
                                            className="fa fa-start-o"
                                            aria-hidden="true"
                                        ></i>
                                        <img
                                            className="projects-img"
                                            src={selectedItem.image}
                                            alt={selectedItem.label}
                                        />

                                        <span
                                            className="create-button"
                                            onClick={handlePrompt}
                                        >
                                            Create new Project
                                        </span>
                                        <Form />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            selectedItem.label == 'Projects' && (
                                <div>
                                    <Table projects={projects} />
                                    <Form />
                                    <div
                                        onClick={handlePrompt}
                                        className="create-project"
                                    >
                                        Create Project
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="dropdown" onMouseLeave={closeDropdown}>
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
                        <div>No item selected</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
