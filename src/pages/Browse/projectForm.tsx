import { Project } from '@/components/Models/projerctModel';
import { react_backend_url } from '../../config';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultForm: Project = {
    name: '',
    department: '',
    category: '',
    description: '',
    implementationDate: null,
};

const Form = () => {
    const [project, setProject] = useState(defaultForm);
    const navigate = useNavigate();
    const updateProject = (field: string, value: any) => {
        setProject((updatedProject) => {
            return {
                ...updatedProject,
                [field]: value,
            };
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await axios.post(`${react_backend_url}/v1/projects`, {
            project,
        });
        console.log('creaTed', res);
        setProject(defaultForm);
        navigate('/');
    };

    return (
        <form
            className={`forms ${prompt ? 'active' : ''}`}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Name Your Project</label>
            <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject('name', e.target.value)}
                name="name"
                placeholder="New Project"
                required
            />
            <label>Department</label>
            <input
                type="text"
                value={project.department}
                placeholder="Department"
                onChange={(e) => updateProject('department', e.target.value)}
                required
            />
            <label>Category</label>
            <input
                type="text"
                placeholder="Category"
                value={project.category}
                onChange={(e) => updateProject('category', e.target.value)}
                required
            />
            <label>Project Description</label>
            <input
                type="text"
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => updateProject('description', e.target.value)}
                required
            />
            <label>Estimated Implementation Date </label>
            <input
                type="date"
                onChange={(e) =>
                    updateProject('implementationDate', e.target.value)
                }
                required
            />

            <button
                className="cancel"
                type="button"
                onClick={() => navigate('/')}
            >
                Cancel
            </button>
            <button className="ok" type="submit">
                Ok
            </button>
        </form>
    );
};

export default Form;
