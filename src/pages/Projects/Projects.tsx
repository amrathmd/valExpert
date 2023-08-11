import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { react_backend_url } from '../../config';
import { NavLink, useNavigate } from 'react-router-dom';
import './Projects.css';
import Button from '@mui/material/Button';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import IconButton from '@mui/material/IconButton';
import { CircularProgress } from '@mui/material';
import DashboardContext from '../../contexts/dashboardContext';
import StickyHeader from '../StickyHeader';

const defaultProject = [
    { key: 'projectName', label: 'Project Name' },
    { key: 'facility', label: 'Facility' },
    { key: 'department', label: 'Department' },
    { key: 'country', label: 'Country' },
    { key: 'scope', label: 'Scope' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Project Description' },
    { key: 'estimationDate', label: 'Estimation Date' },
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [cursorCoordinates, setCursorCoordinates] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const cursorCoordinatesRef = useRef<{ x: number; y: number } | null>(null);
    const projectCardRef = useRef<HTMLDivElement>(null);
    const projectTableRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const { projectId, setProjectId } = React.useContext(DashboardContext);

    const [loadingProjects, setLoadingProjects] = useState(true);
    const [error, setError] = useState(null);

    const getProjects = async () => {
        try {
            const res = await axios.get(`${react_backend_url}/v1/projects`);
            setProjects(res.data);
            setError(null); // Clear any previous errors if successful
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError(
                'An error occurred while fetching projects. Please try again later.'
            );
        }
    };

    // const getProjects = async () => {
    //     const res = await axios.get(`${react_backend_url}/v1/projects`);
    //     console.log(res);
    //     setProjects(res.data);
    // };
    const History = useNavigate();

    useEffect(() => {
        getProjects();
    }, []);

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement>,
        id: string
    ) => {
        event.preventDefault();
        const x = event.clientX;
        const y = event.clientY;
        setProjectId(id);
        setCursorCoordinates({ x, y });
        cursorCoordinatesRef.current = { x, y };

        const selectedProject = projects.find((item) => item._id === id);
        setSelectedProject(selectedProject);
        console.log(selectedProject);
        setIsVisible(false);
        event.stopPropagation();
    };
    const handleTableClose = () => {
        setSelectedProject(null);
    };

    useEffect(() => {
        setIsVisible(!isVisible);
        console.log(isVisible);
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                projectCardRef.current &&
                !projectCardRef.current.contains(event.target as Node)
            ) {
                setCursorCoordinates(null);
                cursorCoordinatesRef.current = null;
                setIsVisible(!isVisible);
                if (
                    projectTableRef.current &&
                    !projectTableRef.current.contains(event.target as Node)
                ) {
                    setSelectedProject(null);
                }
            }
        };
        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, [selectedProject]);
    const handleManageProject = (id: string) => {
        setProjectId(id);
        History(`/dashboard/${projectId}`);
    };

    return (
        <div>
            <StickyHeader />
            <div className="projects-header">
                <p>Projects</p>
            </div>
            <section
                className={`projects-section ${isVisible ? 'visible' : ''}`}
            >
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
                        <div
                            ref={projectCardRef}
                            className="projects-card"
                            key={item._id}
                            onClick={(event) => handleClick(event, item._id)}
                        >
                            <div className="image-pic"></div>
                            <div className="project-description">
                                <b>{item.projectName}</b>
                                {item.description}
                            </div>
                        </div>
                    ))}
            </section>

            {selectedProject && (
                <div
                    className={`project-table-container ${
                        isVisible ? 'visible' : ''
                    }`}
                    ref={projectTableRef}
                >
                    <IconButton
                        aria-label="cross"
                        size="small"
                        onClick={handleTableClose}
                    >
                        <CancelSharpIcon className="project-table-cancel" />
                    </IconButton>

                    <div className="project-table-header">
                        <h1>Project Details</h1>
                    </div>
                    <table className="project-table">
                        <tbody>
                            {defaultProject.map((item) => (
                                <tr key={item.key}>
                                    <td>
                                        <b>{item.label}</b>
                                    </td>
                                    <td>{selectedProject[item.key]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="project-table-button">
                        <Button
                            variant="contained"
                            onClick={() =>
                                handleManageProject(selectedProject._id)
                            }
                        >
                            Manage Project
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
