import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import './RequirementSetFrom.css';
import axios from 'axios';
import { react_backend_url } from '../../../config';
interface RequirementSet {
    name: string;
    projectId: string;
}
const initialSet: RequirementSet = {
    name: '',
    projectId: '64ab0f4a4250c114d4fde1d6',
};
interface Props {
    handleRequirementSet: () => void;
}
const RequirementSetForm: React.FC<Props> = ({ handleRequirementSet }) => {
    const [requirementSet, setRequirementset] = useState(initialSet);
    const [success, setSuccess] = useState<boolean>(false);
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRequirementset((prevRequirement) => {
            return {
                ...prevRequirement,
                [name]: value,
            };
        });
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${react_backend_url}/v1/requirementset`,
                requirementSet
            );
            if (response) {
                setSuccess(true);
            }
        } catch (e) {
            window.alert('some Error occured');
        }
    };
    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);
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
                        name="name"
                    />
                </div>
                <div className="buttons-requirementSetForm">
                    <button className="reqCreate" onClick={handleSubmit}>
                        Create
                    </button>
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
