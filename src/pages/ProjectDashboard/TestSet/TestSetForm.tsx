import React, { useState } from 'react';
import { TestSet } from '@/components/Models/testsetsModel';
import axios from 'axios';
import '../Requirements/RequirementForm.css';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import { react_backend_url } from '../../../config';
import Alert from '@mui/material/Alert';
interface TestSetFormProps {
    handleTestSetForm: () => void;
    projectId: string;
}

const defaultTestSet = {
    projectId: '',
    testSetName: '',
    category: 'IQ',
    description: '',
    status: 'Approved',
    //requirementSetName: '',
    requirementSetId: '',
};

const TestSetForm: React.FC<TestSetFormProps> = ({
    handleTestSetForm,
    projectId,
}) => {
    const navigate = useNavigate();
    const [testSet, setTestSet] = useState(defaultTestSet);
    const [requirementSets, setRequirementSets] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const updateTestSet = (field: string, value: any) => {
        setTestSet((prevTestSet) => {
            return {
                ...prevTestSet,
                [field]: value,
            };
        });
    };
    React.useEffect(() => {
        const FetchRequirementSets = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/requirementset/project/${projectId}`
            );
            setRequirementSets(result.data);
        };
        FetchRequirementSets();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const requiredReq = requirementSets.find(
            (item) => item._id === testSet.requirementSetId
        );
        testSet.projectId = projectId;
        console.log(testSet);
        const res = await axios.post(
            `${react_backend_url}/v1/testsets`,
            testSet
        );
        console.log('res post', res);
        if (!res) {
            window.alert('error');
            return;
        }
        setShowSuccess(true);
    };
    React.useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                handleTestSetForm();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    return (
        <div className="form-container">
            <div>
                <div className="heading">
                    <h2>TestSet Details</h2>
                </div>
                <div className="req-item">
                    <TextField
                        fullWidth
                        label="TestSet Name"
                        value={testSet.testSetName}
                        placeholder="TestSetName"
                        onChange={(e) =>
                            updateTestSet('testSetName', e.target.value)
                        }
                    />
                </div>

                <div className="req-item">
                    <FormControl fullWidth>
                        <FormLabel>Category</FormLabel>
                        <Select
                            value={testSet.category}
                            onChange={(e) =>
                                updateTestSet('category', e.target.value)
                            }
                        >
                            <MenuItem value="IQ">IQ</MenuItem>
                            <MenuItem value="OQ">OQ</MenuItem>
                            <MenuItem value="PQ">PQ</MenuItem>
                            <MenuItem value="UAT">UAT</MenuItem>
                            <MenuItem value="FAT">FAT</MenuItem>
                            <MenuItem value="Integration Test">
                                Integration Test
                            </MenuItem>
                            <MenuItem value="Unit Tests">Unit Tests</MenuItem>
                            <MenuItem value="Smoke Test">Smoke Test</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="req-item">
                    <InputLabel>Description</InputLabel>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={testSet.description}
                        onChange={(e) =>
                            updateTestSet('description', e.target.value)
                        }
                    />
                </div>

                <div className="req-item">
                    <FormControl fullWidth>
                        <FormLabel>Status</FormLabel>
                        <Select
                            value={testSet.status}
                            onChange={(e) =>
                                updateTestSet('status', e.target.value)
                            }
                        >
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Draft">Draft</MenuItem>
                            <MenuItem value="In Review">In Review</MenuItem>
                            <MenuItem value="Ready for Execution">
                                Ready for Execution
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="req-item">
                    <FormControl fullWidth>
                        <FormLabel>Requirement Set Id</FormLabel>
                        <Select
                            value={testSet.requirementSetId}
                            onChange={(e) =>
                                updateTestSet(
                                    'requirementSetId',
                                    e.target.value
                                )
                            }
                        >
                            {requirementSets.map((requirementSet) => (
                                <MenuItem
                                    value={requirementSet._id}
                                    key={requirementSet._id}
                                >
                                    {requirementSet.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="req-submit">
                    <button
                        onClick={handleTestSetForm}
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
            {showSuccess && (
                <div className="alert-container">
                    <Alert severity="success">
                        Test set created successfully!
                    </Alert>
                </div>
            )}
        </div>
    );
};
export default TestSetForm;
