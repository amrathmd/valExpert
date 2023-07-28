import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';

import Joi from 'joi-browser';
import './userForm.css';
import { IconButton, InputAdornment, Typography } from '@mui/material';
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
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { countries } from 'countries-list';
import { OnChangeValue } from 'react-select';
interface User {
    fullname: string;
    username: string;
    email: string;
    mobile: string;
    status: string;
    group: string[];
    country: string;
    office: string;
    department: string;
    password: string;
}

const defaultUser: User = {
    fullname: '',
    username: '',
    email: '',
    mobile: '',
    status: 'Active',
    password: '',
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

const UserForm = () => {
    const [selectedOption, setSelectedOption] = useState('Active');
    const [user, setUser] = useState(defaultUser);
    const [ValidationError, setvalidationError] = useState<string>('');
    const theme = useTheme();
    const [group, setGroup] = React.useState<string[]>([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Active');
    const [selectedCountry, setSelectedCountry] = useState('');

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const countryOptions = Object.keys(countries).map((countryCode) => ({
        code: countryCode,
        name: countries[countryCode].name,
    }));
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        status: Joi.string().required(),
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(user);
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
        <>
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
                                sx={{ marginBottom: 3 }}
                                value={user.fullname}
                                onChange={handleTextChange}
                            />
                            <TextField
                                label="UserName"
                                fullWidth
                                variant="outlined"
                                name="username"
                                className="formfeild"
                                size="small"
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
                                sx={{ marginBottom: 3 }}
                            />
                            <FormControl
                                sx={{ marginBottom: 3 }}
                                variant="outlined"
                                size="small"
                                className="formfeild"
                                required
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
                                    label="Password"
                                    value={user.password}
                                    onChange={handleTextChange}
                                />
                            </FormControl>
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
                        Create User!
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserForm;
