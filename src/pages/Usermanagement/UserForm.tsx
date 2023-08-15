import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { User } from '@/components/Models/adminUsersModel';
import Joi from 'joi-browser';
import './userForm.css';
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Paper } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import {
    VisibilityOff,
    Visibility,
    AccountCircle,
    Key,
    MobileFriendly,
    Phone,
    Email,
    AccountBox,
} from '@mui/icons-material';
import { countries } from 'countries-list';
import { OnChangeValue } from 'react-select';
import { react_backend_url } from '../../config';

const defaultUser = {
    _id: '',
    fullname: '',
    username: '',
    email: '',
    mobile: '',
    status: 'Active',
    country: '',
    group: [''],
    department: '',
    office: '',
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
const initialErrors = {
    fullname: '',
    username: '',
    email: '',

    mobile: '',
};
interface UserFormProps {
    userDetails: User | null;
    isEditMode: boolean;
}
const UserForm = ({ userDetails, isEditMode }: UserFormProps) => {
    const [user, setUser] = useState(defaultUser);

    const [selectedOption, setSelectedOption] = useState('Active');
    const [ValidationError, setvalidationError] = useState<string>('');
    const theme = useTheme();
    const [group, setGroup] = React.useState<string[]>([]);

    const [selectedStatus, setSelectedStatus] = useState('Active');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [error, setError] = useState(initialErrors);
    const [booleanError, setBooleanError] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

    useEffect(() => {
        if (isEditMode && userDetails) {
            setUser((prevUser) => ({
                ...prevUser,
                ...userDetails,
            }));
            setSelectedStatus(userDetails.status);
            setSelectedCountry(userDetails.country);
            setGroup(userDetails.group);
        }
    }, [isEditMode, userDetails]);

    const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSelectedCountry(value);
        setUser((prevUser) => {
            return {
                ...prevUser,
                [name]: value,
            };
        });
    };
    const handleBack = () => {
        history.back();
    };

    const countryOptions = Object.keys(countries).map((countryCode) => ({
        code: countryCode,
        name: countries[countryCode].name,
    }));
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const schema = Joi.object({
        fullname: Joi.string().required().label('Fullname'),
        username: Joi.string().required().label('Username'),
        email: Joi.string().email().required().label('Email'),
        mobile: Joi.string().required().label('Mobile'),
    }).options({ allowUnknown: true });
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { error } = schema.validate(user, { abortEarly: false });
        if (error) {
            const newErrors: any = {};
            error.details.forEach((detail: any) => {
                newErrors[detail.context.key] = detail.message;
            });
            setError(newErrors);
        } else {
            try {
                let res;

                if (isEditMode) {
                    res = await axios.put(
                        `${react_backend_url}/${userDetails?._id}`,
                        user
                    );
                } else {
                    const { _id, ...userWithoutId } = user;
                    res = await axios.post(
                        `${react_backend_url}/v1/adminusers`,
                        userWithoutId
                    );
                }
                if (res.data) {
                    if (isEditMode) {
                        setShowUpdateSuccess(true);
                        setTimeout(() => {
                            setShowUpdateSuccess(false);
                            navigate('/manageaccounts');
                        }, 1500);
                    } else {
                        setShowSuccess(true);
                        setTimeout(() => {
                            setShowSuccess(false);
                            navigate('/manageaccounts');
                        }, 1500);
                    }
                } else {
                    window.alert('User creation failed!');
                }
            } catch (error) {
                console.error('Error creating user:', error);
                window.alert('An error occurred while creating the user.');
            }
        }
    };

    const handleChange = (event: SelectChangeEvent<typeof group>) => {
        const { name, value } = event.target;
        setGroup(typeof value === 'string' ? value.split(',') : value);
        setUser((prevUser) => {
            return {
                ...prevUser,
                [name]: typeof value === 'string' ? value.split(',') : value,
            };
        });
    };
    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
        setUser((prevUser) => ({
            ...prevUser,
            status: event.target.value,
        }));
    };
    return (
        <div className="userformPage">
            <div className="title">Create users</div>

            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="userForm">
                        <div className="formleft">
                            <TextField
                                label="FullName"
                                fullWidth
                                variant="outlined"
                                name="fullname"
                                className="formfeild"
                                size="small"
                                required
                                error={!!error.fullname}
                                helperText={error.fullname}
                                sx={{ marginBottom: 3 }}
                                value={user.fullname}
                                onChange={handleTextChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBox />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="UserName"
                                fullWidth
                                variant="outlined"
                                name="username"
                                className="formfeild"
                                size="small"
                                error={!!error.username}
                                helperText={error.username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                                value={user.username}
                                onChange={handleTextChange}
                                sx={{ marginBottom: 3 }}
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                variant="outlined"
                                name="email"
                                className="formfeild"
                                size="small"
                                required
                                value={user.email}
                                onChange={handleTextChange}
                                error={!!error.email}
                                helperText={error.email}
                                sx={{ marginBottom: 3 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/*<FormControl
                                sx={{ marginBottom: 3 }}
                                variant="outlined"
                                size="small"
                                className="formfeild"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Key />
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    value={user.password}
                                    onChange={handleTextChange}
                                />
                                {error.password && (
                                    <FormHelperText sx={{ color: '#f44336' }}>
                                        {error.password}
                                    </FormHelperText>
                                )} 
                            </FormControl>*/}
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
                        </div>
                        <div className="formright">
                            <TextField
                                label="Mobile"
                                fullWidth
                                variant="outlined"
                                name="mobile"
                                className="formfeild"
                                size="small"
                                value={user.mobile}
                                onChange={handleTextChange}
                                required
                                sx={{ marginBottom: 3 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!error.mobile}
                                helperText={error.mobile}
                            />
                            <TextField
                                label="Office Phone"
                                fullWidth
                                variant="outlined"
                                name="office"
                                className="formfeild"
                                value={user.office}
                                onChange={handleTextChange}
                                size="small"
                                required
                                sx={{ marginBottom: 3 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControl
                                sx={{ marginBottom: 3 }}
                                className="formfeild"
                                required
                            >
                                <InputLabel
                                    id="demo-multiple-name-label"
                                    size="small"
                                >
                                    Group
                                </InputLabel>
                                <Select
                                    label="Group"
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    name="group"
                                    multiple
                                    value={group}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Group" />}
                                    MenuProps={MenuProps}
                                    size="small"
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                                name,
                                                group,
                                                theme
                                            )}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Department"
                                fullWidth
                                variant="outlined"
                                name="department"
                                className="formfeild"
                                size="small"
                                value={user.department}
                                onChange={handleTextChange}
                                sx={{ marginBottom: 3 }}
                            />
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
                        {isEditMode ? 'Save' : 'Create User'}
                    </button>
                    <button
                        className="form-button"
                        type="button"
                        onClick={handleBack}
                    >
                        {isEditMode ? 'Cancel' : 'Back'}
                    </button>
                </div>
            </form>
            {showSuccess && (
                <Alert
                    severity="success"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                    }}
                >
                    User created successfully!
                </Alert>
            )}
            {showUpdateSuccess && (
                <Alert
                    severity="success"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                    }}
                >
                    User updated successfully!
                </Alert>
            )}
        </div>
    );
};

export default UserForm;
