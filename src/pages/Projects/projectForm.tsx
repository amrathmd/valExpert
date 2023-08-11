import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { countries } from 'countries-list';
import { useNavigate } from 'react-router-dom';
import { react_backend_url } from '../../config';

interface Project {
    projectName: string;
    facility: string;
    department: string;
    status: string;
    country: string;
    scope: string;
    category: string;
    description: string;
    // estimationDate:string;
}

const defaultProject: Project = {
    projectName: '',
    facility: '',
    department: '',
    status: '',
    country: '',
    scope: '',
    category: '',
    description: '',
    // estimationDate:'',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = ['Reviewer', 'Approver', 'QA', 'Viewer', 'Author'];

function getStyles(name: string, group: string[], theme: Theme) {
    return {
        fontWeight:
            group.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ProjectForm = () => {
    const [project, setProject] = useState(defaultProject);
    const [ValidationError, setvalidationError] = useState<string>('');
    const navigate = useNavigate();
    const [group, setGroup] = React.useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState('Active');
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSelectedCountry(value);
        setProject((prevProject) => {
            return {
                ...prevProject,
                [name]: value,
            };
        });
    };

    const countryOptions = Object.keys(countries).map((countryCode) => ({
        code: countryCode,
        name: countries[countryCode].name,
    }));

    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        status: Joi.string().required(),
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(project);
        const res = await axios.post(
            `http://${react_backend_url}/v1/projects`,
            project
        );
        if (!res) {
            console.log(res);
            window.alert('error');
            return;
        }
        window.alert('success');
        navigate('/');

        /*const { error } = Joi.validate(user, schema);
        if (error) {
            setvalidationError(error.details[0].message);
            alert(error.details[0].message);
            return;
        } else {
            const res = await axios.post(
                'http://localhost:3000/v1/adminusers',
                user
            );
            if (!res) {
                console.log(res);
                window.alert('error');
                return;
            }
            window.alert('success');*/
    };

    const handleChange = (event: SelectChangeEvent<typeof group>) => {
        const { name, value } = event.target;
        setGroup(typeof value === 'string' ? value.split(',') : value);
        setProject((prevProject) => {
            return {
                ...prevProject,
                [name]: typeof value === 'string' ? value.split(',') : value,
            };
        });
    };
    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
        setProject((prevProject) => ({
            ...prevProject,
            status: event.target.value,
        }));
    };
    return (
        <>
            <div className="title">Create Project</div>

            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="userForm">
                        <div className="formleft">
                            <TextField
                                label="Project Name"
                                fullWidth
                                variant="outlined"
                                name="projectName"
                                className="formfeild"
                                size="small"
                                required
                                sx={{ marginBottom: 3 }}
                                value={project.projectName}
                                onChange={handleTextChange}
                            />
                            <TextField
                                label="Facility"
                                fullWidth
                                variant="outlined"
                                name="facility"
                                className="formfeild"
                                size="small"
                                required
                                value={project.facility}
                                onChange={handleTextChange}
                                sx={{ marginBottom: 3 }}
                            />
                            <TextField
                                label="Department"
                                fullWidth
                                variant="outlined"
                                name="department"
                                className="formfeild"
                                size="small"
                                required
                                value={project.department}
                                onChange={handleTextChange}
                                sx={{ marginBottom: 3 }}
                            />

                            <TextField
                                select
                                label="Country"
                                variant="outlined"
                                fullWidth
                                name="country"
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                size="small"
                                className="formfeild"
                                sx={{ marginBottom: 3 }}
                            >
                                {countryOptions.map((option) => (
                                    <MenuItem
                                        key={option.code}
                                        value={option.code}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Scope"
                                fullWidth
                                variant="outlined"
                                name="scope"
                                className="formfeild"
                                size="small"
                                value={project.scope}
                                onChange={handleTextChange}
                                required
                                sx={{ marginBottom: 3 }}
                            />
                        </div>
                        <div className="formright">
                            <TextField
                                label="Category"
                                fullWidth
                                variant="outlined"
                                name="category"
                                className="formfeild"
                                value={project.category}
                                onChange={handleTextChange}
                                size="small"
                                required
                                sx={{ marginBottom: 3 }}
                            />
                            <TextField
                                label="Project Description"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                name="description"
                                className="formfeild"
                                value={project.description}
                                onChange={handleTextChange}
                                size="small"
                                required
                                sx={{ marginBottom: 3 }}
                            />
                            <input type="Date" />
                            <div className="select-group">
                                <div>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Status
                                    </FormLabel>
                                </div>
                                <div>
                                    <RadioGroup
                                        sx={{ marginBottom: 3 }}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={selectedStatus}
                                        onChange={handleStatusChange}
                                    >
                                        <FormControlLabel
                                            value="Active"
                                            control={<Radio />}
                                            label="Active"
                                        />
                                        <FormControlLabel
                                            value="Inactive"
                                            control={<Radio />}
                                            label="inactive"
                                        />
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="userFormButton">
                    <button
                        className="form-button"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Create Project!
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProjectForm;
