import React, { ChangeEvent, FormEvent } from 'react';

interface FormProps {
    prompt: boolean;
    handlePrompt: () => void;
    handleCreateProject: () => void;
}

const Form: React.FC<FormProps> = (props) => {
    const { prompt, handlePrompt, handleCreateProject } = props;

    const handleChangePrompt = () => {
        handlePrompt();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCreateProject();
    };

    return (
        <form
            className={`forms ${prompt ? 'active' : ''}`}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Name Your Project:</label>
            <input type="text" name="name" placeholder="New Project" />
            <button type="button" onClick={handleChangePrompt}>
                Cancel
            </button>
            <button className="ok" type="submit">
                Ok
            </button>
        </form>
    );
};

export default Form;
