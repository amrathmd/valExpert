import React, { useState } from 'react';
import './Browse.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { NavLink } from 'react-router-dom';

interface BrowseItem {
    id: number;
    image: string;
    label: string;
    content: string;
}

const Browse: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<BrowseItem | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState<number>(200);
    const [isDragging, setIsDragging] = useState<boolean>(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [projects, setProjects] = useState([]);

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

    const handleCreateProject = () => {
        const obj = {
            name: 'Naveen',
            Department: 'CSE',
            Category: 'Phc',
            ProjectDescription: 'Nothing',
            EstimatedDate: 'We will look into it',
        };
        setProjects([...projects, obj]);
        console.log(projects);
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
                                        <span onClick={handleCreateProject}>
                                            Create new Project
                                        </span>

                                        <div>
                                            <form className="forms">
                                                <label>
                                                    Name Your Project:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="New Project"
                                                />
                                                <button>Cancel</button>
                                                <button
                                                    className="ok"
                                                    type="submit"
                                                >
                                                    Ok
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="example">Hello World</div>
                            </div>
                        ) : (
                            <table className="content-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Category</th>
                                        <th>Project Description</th>
                                        <th>Estimated Implementation Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.name}>
                                            <td>
                                                <input type="checkbox"></input>
                                            </td>
                                            <td></td>
                                            <td>{project.name}</td>
                                            <td>{project.Department}</td>
                                            <td>{project.Category}</td>
                                            <td>
                                                {project.ProjectDescription}
                                            </td>
                                            <td>{project.EstimatedDate}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <input type="checkbox"></input>{' '}
                                        </td>
                                        <td>
                                            <i
                                                className="fa fa-start-o"
                                                aria-hidden="true"
                                            ></i>
                                        </td>
                                        <td>Arbaz</td>
                                        <td>Khan</td>
                                        <td>Hooda</td>
                                        <td>Deepak</td>
                                        <td>Amrath</td>
                                    </tr>
                                </tbody>
                            </table>
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
