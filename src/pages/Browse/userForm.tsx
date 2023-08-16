import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/components/Models/adminUsersModel';
import Joi from 'joi-browser';
import { react_backend_url } from '../../config';

interface FormUserProps {
    userprompt: boolean;
    handleUserPrompt: () => void;
    getUsers: () => void;
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

const UserForm: React.FC<FormUserProps> = (props) => {
    const { userprompt, handleUserPrompt, getUsers } = props;
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

    const handleChangeUserPrompt = () => {
        handleUserPrompt();
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
                `http://${react_backend_url}/v1/adminusers`,
                user
            );
            if (!res) {
                console.log(res);
                window.alert('error');
                return;
            }
            window.alert('success');
            handleChangeUserPrompt();
            getUsers();
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
        <form
            className={`forms ${userprompt ? 'active' : ''}`}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Name </label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <label>Email</label>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <label>Mobile</label>
            <input
                type="text"
                placeholder="Mobile"
                onChange={(e) => handleInputChange('mobile', e.target.value)}
            />
            <label>Status</label>
            <div className="radioClass">
                <label>
                    <input
                        type="radio"
                        value="Active"
                        checked={selectedOption === 'Active'}
                        onChange={handleOptionChange}
                    />
                    Active
                </label>
                <label>
                    <input
                        type="radio"
                        value="Inactive"
                        checked={selectedOption === 'Inactive'}
                        onChange={handleOptionChange}
                    />
                    Inactive
                </label>
            </div>
            <button
                className="cancel"
                type="button"
                onClick={handleChangeUserPrompt}
            >
                Cancel
            </button>
            <button className="ok" type="submit">
                Save
            </button>
        </form>
    );
};

export default UserForm;
