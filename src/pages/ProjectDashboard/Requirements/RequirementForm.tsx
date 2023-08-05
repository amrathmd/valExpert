import React, { ChangeEvent, useState } from 'react';
import './RequirementForm.css';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormLabel,
} from '@mui/material';
const initialState = {
    RequirementName: '',
    RequirementDescription: ' ',
    ReferenceCategory: 'User Requirement',
    ReferenceSOP: '',
    Verification: 'Testing',
};

interface ReqFormProps {
    createRequirements: () => void;
    handleFormActive: () => void;
}
const ReqForm: React.FC<ReqFormProps> = ({
    createRequirements,
    handleFormActive,
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
        console.log(requirement);
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
                        value={requirement.RequirementName}
                        name="RequirementName"
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
                        value={requirement.RequirementDescription}
                        name="RequirementDescription"
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
                            value={requirement.ReferenceCategory}
                            name="ReferenceCategory"
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
                        value={requirement.ReferenceSOP}
                        name="ReferenceSOP"
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
                            value={requirement.Verification}
                            name="Verification"
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
                    <Button variant="contained" onClick={createRequirements}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReqForm;
