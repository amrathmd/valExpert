import React, { ChangeEvent, useState } from 'react';
import './RequirementForm.css';
import axios from 'axios';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormLabel,
} from '@mui/material';
import { react_backend_url } from '../../../config';
const initialState = {
    requirementName: '',
    requirementDescription: ' ',
    requirementCategory: 'User Requirement',
    reference: '',
    verification: 'Testing',
    requirementSetId: '',
};

interface ReqFormProps {
    handleFormActive: () => void;
    selectedRequirementSet: string;
}
const ReqForm: React.FC<ReqFormProps> = ({
    handleFormActive,
    selectedRequirementSet,
}) => {
    const [requirement, setRequirement] = useState(initialState);
    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRequirement((prevReq) => {
            return {
                ...prevReq,
                [name]: value,
            };
        });
    };
    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;

        setRequirement((prevRequriement) => {
            return {
                ...prevRequriement,
                [name]: value,
            };
        });
    };

    const handleReqFormSubmit = async () => {
        requirement.requirementSetId = selectedRequirementSet;
        try {
            const res = await axios.post(
                `${react_backend_url}/v1/requirements`,
                requirement
            );
            if (res.data) {
                window.alert('Success');
            } else {
                window.alert('Error while creating requirements');
            }
        } catch (error) {
            window.alert('An error occurred while creating the user.');
        }
        console.log(requirement);
    };
    return (
        <div className="req-form-container">
            <div>
                <div className="heading">
                    <h2>Requirements Form</h2>
                </div>
                <div className="req-item">
                    <TextField
                        label="RequirementSet Name"
                        variant="outlined"
                        fullWidth
                        onChange={handleTextChange}
                        value={requirement.requirementName}
                        name="requirementName"
                    />
                </div>
                <div className="req-item">
                    <TextField
                        label="Requirement Description"
                        variant="outlined"
                        type="textarea"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={handleTextChange}
                        value={requirement.requirementDescription}
                        name="requirementDescription"
                    />
                </div>
                <div className="req-item">
                    <FormControl variant="outlined" fullWidth>
                        <FormLabel id="reference-category-label">
                            Reference Category
                        </FormLabel>
                        <Select
                            labelId="reference-category-label"
                            id="req-dropdown"
                            label="Reference Category"
                            onChange={handleSelectChange}
                            value={requirement.requirementCategory}
                            name="referenceCategory"
                        >
                            <MenuItem value="User Requirement">
                                User Requirement
                            </MenuItem>
                            <MenuItem value="Functional Requirement">
                                Functional Requirement
                            </MenuItem>
                            <MenuItem value="Technical Requirement">
                                Technical Requirement
                            </MenuItem>
                            <MenuItem value="Physical Requirement">
                                Physical Requirement
                            </MenuItem>
                            <MenuItem value="Regulatory Requirement">
                                Regulatory Requirement
                            </MenuItem>
                            <MenuItem value="Other Requirement">
                                Other Requirement
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="req-item">
                    <TextField
                        label="Reference SOP"
                        variant="outlined"
                        type="text"
                        fullWidth
                        onChange={handleTextChange}
                        value={requirement.reference}
                        name="reference"
                    />
                </div>
                <div className="req-item">
                    <FormControl variant="outlined" fullWidth>
                        <FormLabel id="verification-label">
                            Verification
                        </FormLabel>
                        <Select
                            labelId="verification-label"
                            id="req-dropdown"
                            label="Verification"
                            onChange={handleSelectChange}
                            value={requirement.verification}
                            name="verification"
                        >
                            <MenuItem value="Testing">Testing</MenuItem>
                            <MenuItem value="Procedure">Procedure</MenuItem>
                            <MenuItem value="Testing and Procedure">
                                Testing and Procedure
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="req-submit">
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleFormActive}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleReqFormSubmit}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReqForm;
