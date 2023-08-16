import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import './Profile.css';
import { AccountBox, AccountCircle, Email, Phone } from '@mui/icons-material';

const UpdatedDetails = () => {
    const obj = {
        fullname: 'Arbaz Khan',
        username: 'Arbaz',
        email: 'qureshiammu@gmail.com',
        mobile: '79965910231',
    };

    const [user, setUser] = useState(obj);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSuccess = () => {
        console.log(user);
        alert('Success!');
    };

    return (
        <div className="updateddetails-container">
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
                onChange={handleInputChange}
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
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
                required
                value={user.username}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                sx={{ marginBottom: 3 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Mobile"
                fullWidth
                variant="outlined"
                name="mobile"
                className="formfeild"
                size="small"
                value={user.mobile}
                onChange={handleInputChange}
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
            <Button
                className="updatedsave-button"
                style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100px',
                }}
                onClick={handleSuccess}
            >
                Update
            </Button>
        </div>
    );
};

export default UpdatedDetails;
