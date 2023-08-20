import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { react_backend_url } from '../../config';
import { NavLink, useNavigate } from 'react-router-dom';
import './Projects.css';
import Button from '@mui/material/Button';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import IconButton from '@mui/material/IconButton';
import {
    CircularProgress,
    InputAdornment,
    ListItemButton,
    TextField,
    Typography,
} from '@mui/material';
import DashboardContext from '../../contexts/dashboardContext';
import StickyHeader from '../../components/ProjectHeader/StickyHeader';
import SearchIcon from '@mui/icons-material/Search';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const cursorCoordinatesRef = useRef<{ x: number; y: number } | null>(null);
    const { projectId, setProjectId } = React.useContext(DashboardContext);

    const [error, setError] = useState(null);

    const History = useNavigate();
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
    const formatDate = (dateString: string) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        } as Intl.DateTimeFormatOptions;
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
    };

    useEffect(() => {
        getProjects();
    }, []);

    const handleManageProject = (id: string) => {
        setProjectId(id);
        History(`/dashboard/${id}`);
    };

    return (
        <div>
            <StickyHeader />
            <div className="searchbar">
                <NavLink to="/createProject">
                    <button className="create-project">
                        <p>Create New</p>
                    </button>
                </NavLink>
                <TextField
                    placeholder="Search"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="projects-header">
                <p>Projects</p>
            </div>
            <section className={`projects-section`}>
                {projects.length !== 0 &&
                    projects.map((item) => (
                        <div key={item._id}>
                            <div
                                className="projects-card"
                                key={item._id}
                                onClick={() => handleManageProject(item._id)}
                            >
                                <div className="image-pic">
                                    <img
                                        src={'../../../public/icon.png'}
                                        alt=""
                                        className="iconimg"
                                    />
                                </div>
                                <b>{item.projectName}</b>
                            </div>
                            <div className="project-description">
                                <p className="para">
                                    Completion Date{': '}
                                    {formatDate(item.estimationDate)}
                                </p>
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    );
};

export default Projects;
