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
    formState: boolean;
    setFormState: () => void;
}
const RequirementSetForm: React.FC<Props> = (formState, setFormState) => {
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
            <form>
                <TextField
                    label="RequirementSet Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleTextChange}
                    value={requirementSet.name}
                    name="RequirementSetName"
                />
                <Button variant="contained" size="medium">
                    Submit
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    sx={{ backgroundColor: ' red' }}
                    onClick={setFormState}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
};
export default RequirementSetForm;
