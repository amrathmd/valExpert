import React from 'react';

interface FormProps {
    prompt: boolean;
    handlePrompt: () => void;
    createRequirementSet: () => void;
}
const Form: React.FC<FormProps> = (props) => {
    const { prompt, handlePrompt, createRequirementSet } = props;

    const handleChangePrompt = () => {
        handlePrompt();
    };
    const handleCreateRequirementSet = () => {
        createRequirementSet();
    };

    return (
        <form
            className={`reqnameform ${prompt ? 'active' : ''}`}
            onSubmit={handleCreateRequirementSet}
        >
            <label htmlFor="inputText">Name your RequirementSet :</label>
            <input
                type="text"
                id="inputText"
                placeholder="New RequirementSet"
            />

            <button
                className="reqcancel"
                type="button"
                onClick={handleChangePrompt}
            >
                Cancel
            </button>
            <button className="reqok" type="submit">
                OK
            </button>
        </form>
    );
};
export default Form;
