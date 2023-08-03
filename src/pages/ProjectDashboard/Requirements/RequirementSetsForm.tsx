import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import './RequirementSetFrom.css';
interface RequirementSet {
    name: string;
    projectId: string;
}
const initialSet: RequirementSet = {
    name: '',
    projectId: '',
};
interface Props {
    handleRequirementSet: () => void;
}
const RequirementSetForm: React.FC<Props> = ({ handleRequirementSet }) => {
    const [requirementSet, setRequirementset] = useState(initialSet);
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRequirementset((prevRequirement) => {
            return {
                ...prevRequirement,
                [name]: value,
            };
        });
    };
    return (
        <div className="requirementSetForm">
            <div className="requirementSetFormContainer">
                <div>
                    <TextField
                        label="RequirementSet Name"
                        variant="outlined"
                        fullWidth
                        onChange={handleTextChange}
                        value={requirementSet.name}
                        name="RequirementSetName"
                    />
                </div>
                <div className="buttons-requirementSetForm">
                    <button className="reqCreate">Create</button>
                    <button
                        className="reqCancel"
                        onClick={handleRequirementSet}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RequirementSetForm;
