import React, { useState } from 'react';
import './Homenav.css';
import { NavLink } from 'react-router-dom';

const Homenav: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isSearchButtonActive, setIsSearchButtonActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
        setIsSearchActive(false);
    };

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        setIsActive(false);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        setIsSearchButtonActive(event.target.value.length > 0);
    };

    const clearSearchInput = () => {
        setSearchInput('');
        setIsSearchButtonActive(false);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <nav>
            <div className="logo">VALEXPERT</div>
            <ul className={`nav-items ${isActive ? 'active' : ''}`}>
                <li>
                    <NavLink to=".../pages/Login/Login.tsx" className="navlink">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to=".../pages/Contact.tsx" className="navlink">
                        Contact
                    </NavLink>
                </li>
            </ul>
            <div
                className={`search-icon ${isSearchActive ? 'hide' : ''}`}
                onClick={toggleSearch}
            >
                <span className="fas fa-search"></span>
            </div>

            <div
                className={`cancel-icon ${
                    searchInput.length > 0 ? 'show' : ''
                }`}
                onClick={clearSearchInput}
            >
                <span className="fas fa-times" />
            </div>

            <form action="#" className={isSearchActive ? 'active' : ''}>
                <div className="search-icon">
                    <span className="fas fa-search"></span>
                </div>
                <input
                    type="search"
                    className="search-data"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleInputChange}
                    required
                />

                <div
                    className={`cancel-icon ${
                        searchInput.length > 0 ? 'show' : ''
                    }`}
                    onClick={clearSearchInput}
                >
                    <span className="fas fa-times" />
                </div>

                <button
                    type="submit"
                    className={`search-button ${
                        isSearchButtonActive ? 'active' : ''
                    }`}
                >
                    <span className="fas fa-search" />
                </button>
            </form>
            <div
                className={`menu-icon ${isActive ? 'hide' : ''}`}
                onClick={toggleMenu}
            >
                <span className="fas fa-bars"></span>
            </div>
        </nav>
    );
};

export default Homenav;
