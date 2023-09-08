import React, { ChangeEvent, useEffect, useState } from 'react';
import './RequirementForm.css';
import axios from 'axios';
import { react_backend_url } from '../../../config';
import { Alert } from '@mui/material';

const initialState = {
    // requirementName: 'venkatesh',
    requirementDescription: '',
    requirementCategory: 'User Requirement',
    verification: 'Testing',
    reference: '',
    author: 'subho',
};

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}-${date}-${year}`;
}

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
    setSelectedList: (selectedList: number) => void;
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
    setSelectedList,
}) => {
    const [requirement, setRequirement] = useState(
        selectedRequirement || initialState
    );
    const [success, setSuccess] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState(getDate());
    React.useEffect(() => {
        if (selectedRequirement) {
            setRequirement(selectedRequirement);
        } else {
            setRequirement(initialState);
        }
    }, [selectedRequirement]);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setRequirement((prevReq) => ({
            ...prevReq,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        setRequirement((prevRequirement) => ({
            ...prevRequirement,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                if (result) {
                    setSuccess(true);
                }
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
            window.alert('some Error occurred');
        }
    };

    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                handleFormActive();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className="req-mainContainer">
            <div className="alert-container">
                {success &&
                    (selectedRequirement ? (
                        <Alert severity="success">
                            Requirements Edited successfully!
                        </Alert>
                    ) : (
                        <Alert severity="success">
                            Requirement created Successfully
                        </Alert>
                    ))}
            </div>
            <div className="req-form-container">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="req-item">
                            <label htmlFor="requirementDescription">
                                Requirement Description
                            </label>
                            <textarea
                                id="requirementDescription"
                                name="requirementDescription"
                                rows={4}
                                onChange={handleInputChange}
                                value={requirement.requirementDescription}
                            ></textarea>
                        </div>
                        <div className="req-item">
                            <label htmlFor="reference">Reference SOP</label>
                            <input
                                type="text"
                                id="reference"
                                name="reference"
                                onChange={handleInputChange}
                                value={requirement.reference}
                            />
                        </div>
                        <div className="req-item">
                            <label htmlFor="priority">Priority</label>
                            <select id="priority" name="priority">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="req-item">
                            <label htmlFor="verification">Verification</label>
                            <select
                                id="verification"
                                name="verification"
                                onChange={handleSelectChange}
                                value={requirement.verification}
                            >
                                <option value="Testing">Testing</option>
                                <option value="Procedure">Procedure</option>
                                <option value="Testing and Procedure">
                                    Testing and Procedure
                                </option>
                            </select>
                        </div>
                        <div className="req-item">
                            <p>Category : User Requirement</p>
                            <p>Created Date:{currentDate}</p>
                            <p>Author :vignesh</p>
                        </div>
                        <div className="req-submit">
                            {selectedRequirement ? (
                                <button
                                    type="submit"
                                    className="requirementFormButtonconfirm"
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="requirementFormButtonconfirm"
                                >
                                    Save
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleFormActive}
                                className="requirementFormButtoncancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReqForm;
