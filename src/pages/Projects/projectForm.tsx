import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';
import { react_backend_url } from '../../config';
import {
    TextField,
    Autocomplete,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    OutlinedInput,
    Stack,
    Chip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
import { start } from 'repl';
import { NoEncryption } from '@mui/icons-material';

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

const facility = [
    {
        id: 1,
        name: 'face',
    },
    {
        id: 1,
        name: 'face',
    },
    {
        id: 1,
        name: 'face',
    },
    {
        id: 1,
        name: 'face',
    },
    {
        id: 1,
        name: 'face',
    },
];

const dept = [
    {
        id: 1,
        name: 'CSE',
    },
    {
        id: 1,
        name: 'ECE',
    },
    {
        id: 1,
        name: 'EEE',
    },
    {
        id: 1,
        name: 'MME',
    },
];

const countrydata = [
    {
        id: 1,
        name: 'India',
    },
    {
        id: 1,
        name: 'England',
    },
    {
        id: 1,
        name: 'US',
    },
    {
        id: 1,
        name: 'America',
    },
];
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
    const [status, setStatus] = useState(null);
    const [selectedDept, setSelectedDept] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState([]);

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
            `${react_backend_url}/v1/projects`,
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

    // const handleSubmit = async (event: any) => {
    //     event.preventDefault();
    //     console.log(project);
    //     const res = await axios.post(
    //         'http://localhost:3000/v1/projects',
    //         project
    //     );
    //     if (!res) {
    //         console.log(res);
    //         window.alert('error');
    //         return;
    //     }
    //     window.alert('success');
    //     navigate('/');

    //     /*const { error } = Joi.validate(user, schema);
    //     if (error) {
    //         setvalidationError(error.details[0].message);
    //         alert(error.details[0].message);
    //         return;
    //     } else {
    //         const res = await axios.post(
    //             'http://localhost:3000/v1/adminusers',
    //             user
    //         );
    //         if (!res) {
    //             console.log(res);
    //             window.alert('error');
    //             return;
    //         }
    //         window.alert('success');*/
    // };

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
    return (
        <>
            <div className="title" style={{}}>
                Create Project
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div
                        className="userForm"
                        style={{ gap: 30, justifyContent: 'center' }}
                    >
                        <div className="formleft">
                            <TextField
                                label="Project Name"
                                fullWidth
                                variant="outlined"
                                focused
                                name="projectName"
                                className="formfeild"
                                // size="small"
                                required
                                sx={{ marginBottom: 4 }}
                                value={project.projectName}
                                onChange={handleTextChange}
                            />
                            <TextField
                                label="Purpose"
                                fullWidth
                                focused
                                variant="outlined"
                                name="scope"
                                className="formfeild"
                                // size="small"
                                value={project.scope}
                                onChange={handleTextChange}
                                required
                                sx={{ marginBottom: 4 }}
                            />
                            <FormControl
                                className="formfeild"
                                fullWidth
                                // size="small"
                                sx={{ marginBottom: 4 }}
                                required
                                focused
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Status
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                >
                                    <MenuItem value={10}>Active</MenuItem>
                                    <MenuItem value={20}>Inactive</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={['DatePicker']}
                                    sx={{ marginBottom: 4 }}
                                >
                                    <DatePicker
                                        className="formfeild"
                                        label="Activation Date"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="formfeild"
                                        label="In Activation Date"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="formright">
                            <FormControl
                                sx={{ marginBottom: 4 }}
                                // className="formfeild"
                                required
                                focused
                            >
                                <InputLabel>Country</InputLabel>
                                <Select
                                    className="formfeild"
                                    multiple
                                    value={selectedCountry}
                                    onChange={(e: any) =>
                                        setSelectedCountry(e.target.value)
                                    }
                                    input={<OutlinedInput label="Country" />}
                                    renderValue={(selected) => (
                                        <Stack
                                            gap={1}
                                            direction="row"
                                            flexWrap="wrap"
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    style={{
                                                        backgroundColor:
                                                            '#3575BA',
                                                        color: 'white',
                                                    }}
                                                    key={value}
                                                    label={value}
                                                    onDelete={() =>
                                                        setSelectedCountry(
                                                            selectedCountry.filter(
                                                                (item) =>
                                                                    item !==
                                                                    value
                                                            )
                                                        )
                                                    }
                                                    deleteIcon={
                                                        <CancelIcon
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                            onMouseDown={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        />
                                                    }
                                                />
                                            ))}
                                        </Stack>
                                    )}
                                >
                                    {countrydata.map((value) => (
                                        <MenuItem
                                            key={value.id}
                                            value={value.name}
                                            sx={{
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            {value.name}
                                            {selectedCountry.includes(value) ? (
                                                <CheckIcon color="info" />
                                            ) : null}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                required
                                sx={{ marginBottom: 4 }}
                                // className="formfeild"
                                focused
                            >
                                <InputLabel>Department</InputLabel>
                                <Select
                                    className="formfeild"
                                    multiple
                                    value={selectedDept}
                                    onChange={(e: any) =>
                                        setSelectedDept(e.target.value)
                                    }
                                    input={
                                        <OutlinedInput label="Multiple Select" />
                                    }
                                    renderValue={(selected) => (
                                        <Stack
                                            gap={1}
                                            direction="row"
                                            flexWrap="wrap"
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    style={{
                                                        backgroundColor:
                                                            '#3575BA',
                                                        color: 'white',
                                                    }}
                                                    key={value}
                                                    label={value}
                                                    onDelete={() =>
                                                        setSelectedDept(
                                                            selectedDept.filter(
                                                                (item) =>
                                                                    item !==
                                                                    value
                                                            )
                                                        )
                                                    }
                                                    deleteIcon={
                                                        <CancelIcon
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                            onMouseDown={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        />
                                                    }
                                                />
                                            ))}
                                        </Stack>
                                    )}
                                >
                                    {dept.map((value) => (
                                        <MenuItem
                                            key={value.id}
                                            value={value.name}
                                            sx={{
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            {value.name}
                                            {selectedDept.includes(value) ? (
                                                <CheckIcon color="info" />
                                            ) : null}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl
                                sx={{ marginBottom: 4 }}
                                // className="formfeild"
                                focused
                                required
                            >
                                <InputLabel>Facility</InputLabel>
                                <Select
                                    className="formfeild"
                                    multiple
                                    value={selectedFacility}
                                    onChange={(e: any) =>
                                        setSelectedFacility(e.target.value)
                                    }
                                    input={
                                        <OutlinedInput label="Multiple Select" />
                                    }
                                    renderValue={(selected) => (
                                        <Stack
                                            gap={1}
                                            direction="row"
                                            flexWrap="wrap"
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    style={{
                                                        backgroundColor:
                                                            '#3575BA',
                                                        color: 'white',
                                                    }}
                                                    key={value}
                                                    label={value}
                                                    onDelete={() =>
                                                        setSelectedFacility(
                                                            selectedFacility.filter(
                                                                (item) =>
                                                                    item !==
                                                                    value
                                                            )
                                                        )
                                                    }
                                                    deleteIcon={
                                                        <CancelIcon
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                            onMouseDown={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        />
                                                    }
                                                />
                                            ))}
                                        </Stack>
                                    )}
                                >
                                    {facility.map((value) => (
                                        <MenuItem
                                            key={value.id}
                                            value={value.name}
                                            sx={{
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            {value.name}
                                            {selectedFacility.includes(
                                                value
                                            ) ? (
                                                <CheckIcon color="info" />
                                            ) : null}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Category"
                                focused
                                fullWidth
                                variant="outlined"
                                name="category"
                                className="formfeild"
                                value={project.category}
                                onChange={handleTextChange}
                                // size="small"
                                required
                                sx={{ marginBottom: 4 }}
                            />
                            <TextField
                                label="Project Description"
                                fullWidth
                                multiline
                                focused
                                rows={3}
                                variant="outlined"
                                name="description"
                                className="formfeild"
                                value={project.description}
                                onChange={handleTextChange}
                                // size="small"
                                required
                                sx={{ marginBottom: 4 }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="userFormButton"
                    style={{ gap: 60, justifyContent: 'center' }}
                >
                    <Button
                        className="form-button"
                        type="submit"
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                    >
                        Save
                    </Button>
                    <Button
                        className="form-button"
                        type="submit"
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    );
};

export default ProjectForm;
