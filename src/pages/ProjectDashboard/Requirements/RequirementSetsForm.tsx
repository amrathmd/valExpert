import {
    Alert,
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';
import './RequirementSetForm.css';
import axios from 'axios';
import { react_backend_url } from '../../../config';
interface RequirementSet {
    name: string;
    projectId: string;
    status: string;
}
const initialSet: RequirementSet = {
    name: '',
    projectId: '',
    status: '',
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
            }, 1500);
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
                    <div className="requirementSetDiv">
                        <FormLabel>RequirementSet Name</FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={handleTextChange}
                            value={requirementSet.name}
                            name="name"
                        />
                    </div>
                    <div className="requirementSetDiv">
                        <FormControl fullWidth>
                            <FormLabel id="demo-simple-select-label">
                                Status
                            </FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={requirementSet.status}
                                onChange={handleTextChange}
                                name="status"
                            >
                                <MenuItem value="Draft">Draft</MenuItem>
                                <MenuItem value="In Review">In Review</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                            </Select>
                        </FormControl>
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
