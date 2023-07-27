import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [prompt, setPrompt] = useState(false);

    return (
        <section className="projects-section">
            <div className="create-card">
                <NavLink to="/createProject">
                    <div className="image-pic">
                        <img src={'../../../public/create.png'} alt="" />
                    </div>
                    <button className="createProject-btn">Create New</button>
                </NavLink>
            </div>
        </section>
    );
};

export default Projects;
