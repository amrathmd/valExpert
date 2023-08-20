import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import './RequirementSetForm.css';
import axios from 'axios';
import { react_backend_url } from '../../../config';
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
    projectId: string;
}
const RequirementSetForm: React.FC<Props> = ({
    handleRequirementSet,
    projectId,
}) => {
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
            requirementSet.projectId = projectId;
            const response = await axios.post(
                `${react_backend_url}/v1/requirementset`,
                requirementSet
            );
            if (response) {
                console.log(response);
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
                handleRequirementSet();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    return (
        <>
            {success && (
                <Alert severity="success" sx={{ bottom: 5 }}>
                    Requirement Set saved successfullty!
                </Alert>
            )}

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
        </>
    );
};
export default RequirementSetForm;
