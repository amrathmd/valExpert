import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/components/Models/adminUsersModel';
import Joi from 'joi-browser';
import './userForm.css';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Paper } from '@mui/material';

const defaultUser = {
    name: '',
    email: '',
    mobile: '',
    status: 'Active',
};

const UserForm = () => {
    const [userId, setUserId] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState('Active');
    const [user, setUser] = useState<User>(defaultUser);
    const [ValidationError, setvalidationError] = useState<string>('');

    useEffect(() => {
        setUserId(generateUniqueId());
    }, []);

    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        status: Joi.string().required(),
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { error } = Joi.validate(user, schema);
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
            window.alert('success');
        }
    };

    const handleInputChange = (name: string, value: any) => {
        setUser((prevUser) => {
            return {
                ...prevUser,
                [name]: value,
            };
        });
    };

    function generateUniqueId() {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        return randomNum.toString().padStart(6, '0');
    }

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setUser((prevUser) => {
            return {
                ...prevUser,
                status: event.target.value,
            };
        });
    };

    return (
        <>
            <div className="title">User Management console</div>

            <form onSubmit={handleSubmit}>
                <div className="userForm">
                    <div className="formleft">
                        {/* <label htmlFor="name">FullName</label> */}
                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            name="name"
                            className="formfeild"
                            size="small"
                            required
                            sx={{ marginBottom: 3 }}
                        />
                        {/* <label htmlFor="User Name">UserName</label> */}
                        <TextField
                            label="UserName"
                            fullWidth
                            variant="outlined"
                            name="username"
                            className="formfeild"
                            size="small"
                            required
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
                            sx={{ marginBottom: 3 }}
                        />
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Status
                        </FormLabel>
                        <RadioGroup
                            sx={{ marginBottom: 3 }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Active"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="inactive"
                            />
                        </RadioGroup>
                        <TextField
                            label="UserId"
                            fullWidth
                            variant="outlined"
                            name="userid"
                            className="formfeild"
                            size="small"
                            required
                            sx={{ marginBottom: 3 }}
                        />
                        <TextField
                            label="ComapnyId"
                            fullWidth
                            variant="outlined"
                            name="CompanyId"
                            className="formfeild"
                            size="small"
                            required
                            sx={{ marginBottom: 3 }}
                        />
                        <TextField
                            label="Country"
                            fullWidth
                            variant="outlined"
                            name="country"
                            className="formfeild"
                            size="small"
                            required
                            sx={{ marginBottom: 3 }}
                        />
                    </div>

                    <div className="formright">
                        <label htmlFor="name">FullName</label>
                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            name="name"
                            className="formfeild"
                            size="small"
                            required
                        />
                        <label htmlFor="User Name">UserName</label>
                        <TextField
                            label="UserName"
                            fullWidth
                            variant="outlined"
                            name="name"
                            className="formfeild"
                            size="small"
                            required
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserForm;
