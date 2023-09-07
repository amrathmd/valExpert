import React, { useState } from 'react';
import './Profile.css';

import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { Key, Visibility, VisibilityOff } from '@mui/icons-material';

function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [showPassword, setShowPassword] = React.useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmNewPassword) {
            // Here you can perform your password change logic
            console.log(formData);
        } else {
            setMessage('New password and confirm password do not match.');
        }
    };

    const handleClickShowPassword = (name: string) => {
        setShowPassword({
            oldPassword: name === 'oldPassword',
            newPassword: name === 'newPassword',
            confirmNewPassword: name === 'confirmNewPassword',
        });
    };

    return (
        <div className="changePassword-container">
            <div className="input-item">
                <FormControl
                    sx={{ marginBottom: 3 }}
                    variant="outlined"
                    size="small"
                    className="formfeild"
                    required
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Old Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword.oldPassword ? 'text' : 'password'}
                        name="oldPassword"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword('oldPassword')
                                    }
                                    edge="end"
                                >
                                    {showPassword.oldPassword ? (
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
                        value={formData.oldPassword}
                        onChange={handleChange}
                    />
                </FormControl>
            </div>
            <div className="input-item">
                <FormControl
                    sx={{ marginBottom: 3 }}
                    variant="outlined"
                    size="small"
                    className="formfeild"
                    required
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword.newPassword ? 'text' : 'password'}
                        name="newPassword"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword('newPassword')
                                    }
                                    edge="end"
                                >
                                    {showPassword.newPassword ? (
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
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </FormControl>
            </div>
            <div className="input-item">
                <FormControl
                    sx={{ marginBottom: 3 }}
                    variant="outlined"
                    size="small"
                    className="formfeild"
                    required
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={
                            showPassword.confirmNewPassword
                                ? 'text'
                                : 'password'
                        }
                        name="confirmNewPassword"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword(
                                            'confirmNewPassword'
                                        )
                                    }
                                    edge="end"
                                >
                                    {showPassword.confirmNewPassword ? (
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
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                    />
                </FormControl>
            </div>
            <button
                type="submit"
                className="changePassword-button"
                onClick={handleSubmit}
            >
                Change Password
            </button>
        </div>
    );
}

export default ChangePassword;
