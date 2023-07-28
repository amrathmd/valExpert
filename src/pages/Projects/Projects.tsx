import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { react_frontend_url } from '../../config';
import { NavLink } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        const res = await axios.get(`${react_frontend_url}/v1/projects`);
        console.log(res);
        setProjects(res.data);
    };
    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            <div className="project-title">
                <b>valExpert</b>
            </div>
            <div className="project-tagline">
                <p>Tag line of valExpert</p>
            </div>
            <div className="projects-header">
                <p>Projects</p>
            </div>
            <section className="projects-section">
                <div className="create-card">
                    <NavLink to="/createProject">
                        <div className="image-pic">
                            <img src={'../../../public/create.png'} alt="" />
                        </div>
                        <button className="createProject-btn">
                            Create New
                        </button>
                    </NavLink>
                </div>
                {projects.length !== 0 &&
                    projects.map((item) => (
                        <div className="projects-card" key={item._id}>
                            <div className="image-pic"></div>
                            <div className="project-description">
                                <b>{item.name}</b>
                                {item.description}
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    );
};

export default Projects;
