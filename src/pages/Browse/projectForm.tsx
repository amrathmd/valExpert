import { Project } from '@/components/Models/projerctModel';
import { react_frontend_url } from '../../config';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface FormProps {
    prompt: boolean;
    handlePrompt: () => void;
    refresh: () => void;
}
const defaultForm: Project = {
    _id: '',
    name: '',
    department: '',
    category: '',
    description: '',
    implementationDate: null,
};

const Form: React.FC<FormProps> = (props) => {
    const { prompt, handlePrompt, refresh } = props;

    const [project, setProject] = useState(defaultForm);
    const updateProject = (field: string, value: any) => {
        setProject((updatedProject) => {
            return {
                ...updatedProject,
                [field]: value,
            };
        });
    };
    const handleChangePrompt = () => {
        handlePrompt();
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await axios.post(`${react_frontend_url}/v1/projects`, {
            project,
        });
        console.log('creaTed', res);
        setProject(defaultForm);
        await refresh();
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
            />
            <label>Department</label>
            <input
                type="text"
                value={project.department}
                placeholder="Department"
                onChange={(e) => updateProject('department', e.target.value)}
            />
            <label>Category</label>
            <input
                type="text"
                placeholder="Category"
                value={project.category}
                onChange={(e) => updateProject('category', e.target.value)}
            />
            <label>Project Description</label>
            <input
                type="text"
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => updateProject('description', e.target.value)}
            />
            <label>Estimated Implementation Date </label>
            <input
                type="date"
                onChange={(e) =>
                    updateProject('implementationDate', e.target.value)
                }
            />

            <button
                className="cancel"
                type="button"
                onClick={handleChangePrompt}
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
