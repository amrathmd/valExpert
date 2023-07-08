import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface FormUserProps {
    userprompt: boolean;
    handleUserPrompt: () => void;
    handleCreateUser: () => void;
}

const UserForm: React.FC<FormUserProps> = (props) => {
    const { userprompt, handleUserPrompt, handleCreateUser } = props;
    const [userId, setUserId] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState('Active');

    useEffect(() => {
        setUserId(generateUniqueId());
    }, []);

    const handleChangeUserPrompt = () => {
        handleUserPrompt();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCreateUser();
    };
    function generateUniqueId() {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        return randomNum.toString().padStart(6, '0');
    }
    const handleOptionChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setSelectedOption(event.target.value);
    };

    return (
        <form
            className={`forms ${userprompt ? 'active' : ''}`}
            onSubmit={handleSubmit}
        >
            <label htmlFor="Id">User ID </label>
            <input type="text" name="id" defaultValue={userId} readOnly />
            <label htmlFor="name">Name </label>
            <input type="text" name="name" placeholder="Name" />
            <label>Email</label>
            <input type="text" placeholder="Email" />
            <label>Mobile</label>
            <input type="text" placeholder="Mobile" />
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
