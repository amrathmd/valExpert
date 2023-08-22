import React, { ChangeEvent, useState } from 'react';
import './RequirementForm.css';
import axios from 'axios';
import { react_backend_url } from '../../../config';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormLabel,
    Alert,
} from '@mui/material';

const initialState = {
    // requirementName: 'venkatesh',
    requirementDescription: 'initialdescription',
    requirementCategory: 'User Requirement',
    verification: 'Testing',
    reference: '',
    author: 'subho',
};
interface Requirement {
    _id: string;
    requirementSetId: string;
    requirementDescription: string;
    requirementCategory: string;
    reference: string;
    verification: string;
    author: string;
}
interface ReqFormProps {
    handleFormActive: () => void;
    selectedRequirementSet: any;
    selectedRequirement?: Requirement;
}
const authors = [
    {
        id: '1',
        name: 'Subho',
    },
    {
        id: '2',
        name: 'Valexpert',
    },
];

const ReqForm: React.FC<ReqFormProps> = ({
    selectedRequirementSet,
    selectedRequirement,
    handleFormActive,
}) => {
    const [requirement, setRequirement] = useState(
        selectedRequirement || initialState
    );
    const [success, setSuccess] = useState<boolean>(false);

    // const [requirement, setRequirement] = useState({
    //      ...initialState,
    //     requirementSetId: selectedRequirementSet,
    // });
    React.useEffect(() => {
        if (selectedRequirement) {
            setRequirement(selectedRequirement);
        } else {
            setRequirement(initialState);
        }
    }, [selectedRequirement]);
    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRequirement((prevReq) => ({
            ...prevReq,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;

        setRequirement((prevRequirement) => ({
            ...prevRequirement,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const requestData = {
                ...requirement,
                requirementSetId: selectedRequirementSet,
            };

            if (selectedRequirement) {
                const result = await axios.put(
                    `${react_backend_url}/v1/requirements/${selectedRequirement._id}`,
                    requestData
                );
                console.log('Requirement updated:', result.data);
            } else {
                const result = await axios.post(
                    `${react_backend_url}/v1/requirements`,
                    requestData
                );
                if (result) {
                    setSuccess(true);
                }
            }
        } catch (e) {
            window.alert('some Error occured');
        }
    };
    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                handleFormActive();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <>
            <div className="alert-container">
                {success && (
                    <Alert severity="success">
                        Requirements created successfully!
                    </Alert>
                )}
            </div>
            <div className="form-container">
                <div>
                    <div className="heading">
                        <h2>Requirements Form</h2>
                    </div>
                    {/* <div className="req-item">
                <TextField
                    label="RequirementSet Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleTextChange}
                    value={requirement.requirementName}
                    name="requirementName"
                />
            </div> */}
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
                                Requirement Category
                            </FormLabel>
                            <Select
                                labelId="reference-category-label"
                                id="req-dropdown"
                                label="Reference Category"
                                onChange={handleSelectChange}
                                value={requirement.requirementCategory}
                                name="requirementCategory"
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
                    <FormControl variant="outlined" fullWidth>
                        <FormLabel id="reference-category-label">
                            Author
                        </FormLabel>
                        <Select
                            labelId="reference-category-label"
                            id="req-dropdown"
                            label="Author"
                            onChange={handleSelectChange}
                            value={requirement.author}
                            name="author"
                        >
                            {authors.map((author) => (
                                <MenuItem key={author.id} value={author.name}>
                                    {author.name}
                                </MenuItem>
                            ))}
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
                        <button
                            onClick={handleFormActive}
                            className="requirementFormButtons"
                       >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="requirementFormButtons"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReqForm;
