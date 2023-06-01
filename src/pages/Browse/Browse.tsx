import React, { useState } from 'react';
import './Browse.css';
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

    const browseItems: BrowseItem[] = [
        {
            id: 1,
            image: '../../../public/stack-of-sheets.png',
            label: 'Sheets',
            content: 'Content for Sheets',
        },
        {
            id: 2,
            image: '../../../public/coworking.png',
            label: 'Workspaces',
            content: 'Content for Workspaces',
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
                        <p>{selectedItem.content}</p>
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
