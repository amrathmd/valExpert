import React, { useEffect, useState } from 'react';
import './Browse.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Table from './table';
import Form from './Form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface BrowseItem {
    id: number;
    image: string;
    label: string;
    content: string;
}

const Browse: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<BrowseItem | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState<number>(200);
    const [isDragging, setIsDragging] = useState<boolean>(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [prompt, setprompt] = useState(false);

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

    const handleCreateProject = () => {
        const obj = {
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
        setprompt(!prompt);
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
        const res = await axios.get('http://localhost:3000/v1/projects');
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
                                        <Form
                                            prompt={prompt}
                                            handlePrompt={handlePrompt}
                                            handleCreateProject={
                                                handleCreateProject
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            selectedItem.label == 'Projects' && (
                                <div>
                                    <Table projects={projects} />
                                    <Form
                                        prompt={prompt}
                                        handlePrompt={handlePrompt}
                                        handleCreateProject={
                                            handleCreateProject
                                        }
                                    />
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
