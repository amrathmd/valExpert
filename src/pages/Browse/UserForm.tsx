import React, { FormEvent } from 'react';
import './UserForm.css';

interface UserFormProps {
    handleFormClose: () => void;
    handleFormSubmit: () => void;
    active: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
    handleFormClose,
    handleFormSubmit,
    active,
}) => {
    const handleChangePrompt = () => {
        handleFormClose();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFormSubmit();
    };

    return (
        <form
            className={`user-form ${active ? 'active' : ''}`}
            onSubmit={handleSubmit}
        >
            <label htmlFor="id">ID</label>
            <input type="number" name="id" placeholder="ID" />

            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Name" />

            <label htmlFor="mobile">Mobile</label>
            <input type="text" name="mobile" placeholder="Mobile" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" />
            <div className="group">
                <label htmlFor="active">Activate</label>
                <input type="checkbox" name="active" />
            </div>

            <div className="button-group">
                <button
                    className="cancel"
                    type="button"
                    onClick={handleChangePrompt}
                >
                    Cancel
                </button>
                <button className="save" type="submit">
                    Save
                </button>
            </div>
        </form>
    );
};

export default UserForm;
