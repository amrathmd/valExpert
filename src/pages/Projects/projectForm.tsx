import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';
import { react_backend_url } from '../../config';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
    FormLabel,
    Paper,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
import { start } from 'repl';
import { NoEncryption } from '@mui/icons-material';
import { Box, style } from '@mui/system';
import StickyHeader from '../../components/ProjectHeader/StickyHeader';
import './Projects.css';

interface Project {
    projectName: string;
    facility: string[];
    department: string[];
    status: string;
    country: string[];
    scope: string;
    category: string;
    description: string;
    estimationDate: Date;
    activationDate: Date;
    inactivationDate: Date;
    applicationName: string;
    purpose: string;
    owner: string;
    applicationVersion: string;
    changeControl: string;
}

const defaultProject: Project = {
    projectName: '',
    facility: [],
    department: [],
    status: '',
    country: [],
    scope: '',
    category: '',
    description: '',
    estimationDate: new Date(),
    activationDate: new Date(),
    inactivationDate: new Date(),
    applicationName: '',
    purpose: '',
    owner: '',
    applicationVersion: '',
    changeControl: '',
};

const facility = [
    {
        id: 1,
        name: 'face1',
    },
    {
        id: 2,
        name: 'face2',
    },
    {
        id: 3,
        name: 'face3',
    },
    {
        id: 4,
        name: 'face4',
    },
    {
        id: 5,
        name: 'face5',
    },
];

const dept = [
    {
        id: 1,
        name: 'CSE',
    },
    {
        id: 2,
        name: 'ECE',
    },
    {
        id: 3,
        name: 'EEE',
    },
    {
        id: 4,
        name: 'MME',
    },
];

const countrydata = [
    {
        id: 1,
        name: 'India',
    },
    {
        id: 2,
        name: 'England',
    },
    {
        id: 3,
        name: 'US',
    },
    {
        id: 4,
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
    const [validationError, setvalidationError] = useState<string>('');
    const navigate = useNavigate();
    const [group, setGroup] = React.useState<string[]>([]);
    const [selectedDept, setSelectedDept] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState([]);
    const [estimationDate, setEstimationDate] = useState<Date | null>();
    const [activationDate, setActivationDate] = useState<Date | null>();
    const [inActivationDate, setInActivationDate] = useState<Date | null>();
    const [errorKey, setErrorKey] = useState<string>('');
    const schema = {
        projectName: Joi.string().required(),
        purpose: Joi.string().required(),
        status: Joi.string().required(),
        activationDate: Joi.date().required(),
        inactivationDate: Joi.date().required(),
        facility: Joi.array().min(1).required(),
        department: Joi.array().min(1).required(),
        country: Joi.array().min(1).required(),
        description: Joi.string().required(),
        // applicationVersion: Joi.number().required,
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        project.facility = selectedFacility;
        project.department = selectedDept;
        project.country = selectedCountry;
        project.estimationDate = estimationDate;
        project.activationDate = activationDate;
        project.inactivationDate = inActivationDate;
        console.log(project);
        const { error } = Joi.validate(project, schema, { allowUnknown: true });
        if (error) {
            console.log(error.details[0].context.key);
            setErrorKey(error.details[0].context.key);
            setvalidationError(error.details[0].message);
            console.log(validationError);
            return;
        }

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
    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedProject = { ...project, status: e.target.value };
        setProject(updatedProject);
    };

    return (
        <>
            <div className="formwrap-container">
                <StickyHeader />
                <form onSubmit={handleSubmit}>
                    <div className="title">Create Project</div>
                    <div className="title-line"></div>
                    <div className="form-container">
                        <div
                            className="userForm"
                            style={{ gap: 30, justifyContent: 'center' }}
                        >
                            <div className="formleft">
                                <div>
                                    <InputLabel
                                        className="userform-label-name"
                                        required
                                    >
                                        <b>Project Name</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="projectName"
                                        className="formfeild"
                                        required
                                        sx={{
                                            marginBottom: 4,
                                            borderRadius: '4px',
                                        }}
                                        value={project.projectName}
                                        onChange={handleTextChange}
                                        error={errorKey === 'projectName'}
                                        helperText={
                                            errorKey === 'projectName'
                                                ? validationError
                                                : ''
                                        }
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        className="userform-label-name"
                                        required
                                    >
                                        <b>Purpose</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        name="purpose"
                                        className="formfeild"
                                        value={project.purpose}
                                        onChange={handleTextChange}
                                        required
                                        sx={{
                                            marginBottom: 4,
                                            borderRadius: '4px',
                                        }}
                                        error={errorKey === 'purpose'}
                                        helperText={
                                            errorKey === 'purpose'
                                                ? validationError
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="dateDiv">
                                    <InputLabel className="userform-label-name">
                                        <b>Status</b>
                                    </InputLabel>
                                    <FormControl
                                        className="formfeild"
                                        fullWidth
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                        placeholder="Select"
                                    >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={project.status}
                                            onChange={handleStatusChange}
                                            error={errorKey === 'status'}
                                        >
                                            <MenuItem value="Active">
                                                Active
                                            </MenuItem>
                                            <MenuItem value="Inactive">
                                                Inactive
                                            </MenuItem>
                                            <div className="errorMessage">
                                                {errorKey === 'status' &&
                                                    validationError}
                                            </div>
                                        </Select>
                                    </FormControl>
                                    <div className="errorMessage">
                                        {errorKey === 'status' &&
                                            validationError}
                                    </div>
                                </div>
                                <div className="dateDiv">
                                    <InputLabel className="userform-label-name">
                                        <b>Activation Date</b>
                                    </InputLabel>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <div
                                            className={`${
                                                errorKey === 'activationDate'
                                                    ? 'errorDiv'
                                                    : ''
                                            }`}
                                        >
                                            <DatePicker
                                                className={`formfeild`}
                                                sx={{
                                                    borderRadius: '4px',
                                                }}
                                                onChange={(newValue: Date) => {
                                                    setActivationDate(newValue);
                                                }}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                    <div className="errorMessage">
                                        {errorKey === 'activationDate' &&
                                            validationError}
                                    </div>
                                </div>
                                <div className="dateDiv">
                                    <InputLabel className="userform-label-name">
                                        <b>In Activation Date</b>
                                    </InputLabel>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <div
                                            className={`${
                                                errorKey === 'inactivationDate'
                                                    ? 'errorDiv'
                                                    : ''
                                            }`}
                                        >
                                            <DatePicker
                                                className="formfeild"
                                                sx={{
                                                    borderRadius: '4px',
                                                }}
                                                onChange={(newValue: Date) => {
                                                    setInActivationDate(
                                                        newValue
                                                    );
                                                }}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                    <div className="errorMessage">
                                        {errorKey === 'inactivationDate' &&
                                            validationError}
                                    </div>
                                </div>
                                <div>
                                    <InputLabel className="userform-label-name">
                                        <b>Application Name</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="applicationName"
                                        className="formfeild"
                                        value={project.applicationName}
                                        onChange={handleTextChange}
                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                    />
                                </div>

                                <div className="dateDiv">
                                    <InputLabel className="userform-label-name">
                                        <b>Estimated Implememtation Date</b>
                                    </InputLabel>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            className="formfeild"
                                            sx={{
                                                borderRadius: '4px',
                                            }}
                                            onChange={(newValue: Date) => {
                                                setEstimationDate(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div>
                                    <InputLabel className="userform-label-name">
                                        <b>Application Version</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="applicationVersion"
                                        className="formfeild"
                                        value={project.applicationVersion}
                                        onChange={handleTextChange}
                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                        error={
                                            errorKey === 'applicationVersion'
                                        }
                                        helperText={
                                            errorKey === 'applicationVersion'
                                                ? validationError
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="formright">
                                <div className="dateDiv">
                                    <InputLabel
                                        required
                                        className="userform-label-name"
                                    >
                                        <b>Facility</b>
                                    </InputLabel>
                                    <FormControl
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                        // className="formfeild"
                                        required
                                    >
                                        <Select
                                            className="formfeild"
                                            multiple
                                            value={selectedFacility}
                                            onChange={(e: any) =>
                                                setSelectedFacility(
                                                    e.target.value
                                                )
                                            }
                                            error={errorKey === 'facility'}
                                            input={<OutlinedInput />}
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
                                                                borderRadius: 0,
                                                            }}
                                                            key={value}
                                                            label={value}
                                                            onDelete={() =>
                                                                setSelectedFacility(
                                                                    selectedFacility.filter(
                                                                        (
                                                                            item
                                                                        ) =>
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
                                            {facility.map((facility) => (
                                                <MenuItem
                                                    key={facility.id}
                                                    value={facility.name}
                                                    sx={{
                                                        justifyContent:
                                                            'space-between',
                                                        borderRadius: '4px',
                                                    }}
                                                >
                                                    {facility.name}
                                                    {selectedFacility.includes(
                                                        facility
                                                    ) ? (
                                                        <CheckIcon color="info" />
                                                    ) : null}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div className="errorMessage">
                                        {errorKey === 'facility' &&
                                            validationError}
                                    </div>
                                </div>
                                <div className="dateDiv">
                                    <InputLabel
                                        className="userform-label-name"
                                        required
                                    >
                                        <b>Department</b>
                                    </InputLabel>
                                    <FormControl
                                        required
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                        // className="formfeild"
                                    >
                                        <Select
                                            className="formfeild"
                                            multiple
                                            value={selectedDept}
                                            onChange={(e: any) =>
                                                setSelectedDept(e.target.value)
                                            }
                                            error={errorKey === 'department'}
                                            input={<OutlinedInput />}
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
                                                                borderRadius: 0,
                                                            }}
                                                            key={value}
                                                            label={value}
                                                            onDelete={() =>
                                                                setSelectedDept(
                                                                    selectedDept.filter(
                                                                        (
                                                                            item
                                                                        ) =>
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
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    {value.name}
                                                    {selectedDept.includes(
                                                        value
                                                    ) ? (
                                                        <CheckIcon color="info" />
                                                    ) : null}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div className="errorMessage">
                                        {errorKey === 'department' &&
                                            validationError}
                                    </div>
                                </div>
                                <div className="dateDiv">
                                    <InputLabel
                                        className="userform-label-name"
                                        required
                                    >
                                        <b>Country</b>
                                    </InputLabel>
                                    <FormControl
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                        // className="formfeild"
                                        required
                                    >
                                        <Select
                                            className="formfeild"
                                            multiple
                                            value={selectedCountry}
                                            onChange={(e: any) =>
                                                setSelectedCountry(
                                                    e.target.value
                                                )
                                            }
                                            error={errorKey === 'country'}
                                            input={<OutlinedInput />}
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
                                                                borderRadius: 0,
                                                            }}
                                                            key={value}
                                                            label={value}
                                                            onDelete={() =>
                                                                setSelectedCountry(
                                                                    selectedCountry.filter(
                                                                        (
                                                                            item
                                                                        ) =>
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
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    {value.name}
                                                    {selectedCountry.includes(
                                                        value
                                                    ) ? (
                                                        <CheckIcon color="info" />
                                                    ) : null}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div className="errorMessage">
                                        {errorKey === 'country' &&
                                            validationError}
                                    </div>
                                </div>
                                <div>
                                    <InputLabel className="userform-label-name">
                                        <b>Category</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="category"
                                        className="formfeild"
                                        value={project.category}
                                        onChange={handleTextChange}
                                        // size="small"

                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        className="userform-label-name"
                                        required
                                    >
                                        <b>Project Description</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        name="description"
                                        className="formfeild"
                                        value={project.description}
                                        onChange={handleTextChange}
                                        // size="small"
                                        required
                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                        error={errorKey === 'description'}
                                        helperText={
                                            errorKey === 'description' &&
                                            validationError
                                        }
                                    />
                                </div>
                                <div>
                                    <InputLabel className="userform-label-name">
                                        <b>Owner</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="owner"
                                        className="formfeild"
                                        value={project.owner}
                                        onChange={handleTextChange}
                                        // size="small"

                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <InputLabel className="userform-label-name">
                                        <b>Change Control</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="changeControl"
                                        className="formfeild"
                                        value={project.changeControl}
                                        onChange={handleTextChange}
                                        // size="small"

                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <InputLabel className="userform-label-name">
                                        <b>Scope</b>
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="scope"
                                        className="formfeild"
                                        sx={{
                                            marginBottom: 4,

                                            borderRadius: '4px',
                                        }}
                                        value={project.scope}
                                        onChange={handleTextChange}
                                    />
                                </div>
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
            </div>
        </>
    );
};

export default ProjectForm;
