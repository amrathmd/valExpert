import React, { useState, useEffect } from 'react';
import {
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Requirements.css';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ReqForm from './RequirementForm';
import { NavLink } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface RequirementsdetailsProps {
    selectedRequirementSet: string;
    setSelectedList: (selectedList: number) => void;
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

const Requirementsdetails: React.FC<RequirementsdetailsProps> = ({
    selectedRequirementSet,
    setSelectedList,
}) => {
    const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] =
        React.useState<boolean>(false);
    const [selectedRequirement, setSelectedRequirement] =
        React.useState<Requirement | null>(null);
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [showTables, setShowTables] = useState<{ [key: string]: boolean }>(
        {}
    );
    const [requirementSetName, setRequirementSetName] = React.useState<
        string | null
    >(null);

    useEffect(() => {
        const fetchRequirementSetName = async () => {
            try {
                const result = await axios.get(
                    `${react_backend_url}/v1/requirementset/${selectedRequirementSet}`
                );
                const requirementSetData = result.data;
                setRequirementSetName(requirementSetData.name);
            } catch (error) {
                console.error('Error fetching requirement set name:', error);
            }
        };

        fetchRequirementSetName();
    }, [selectedRequirement]);

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const result = await axios.get(
                    `${react_backend_url}/v1/requirements/requirementset/${selectedRequirementSet}`
                );
                const requirementsData: Requirement[] = result.data;
                setRequirements(requirementsData);

                // Initialize showTables state with false for each requirement
                const initialShowTablesState: { [key: string]: boolean } = {};
                requirementsData.forEach((requirement) => {
                    initialShowTablesState[requirement._id] = false;
                });
                setShowTables(initialShowTablesState);
            } catch (error) {
                console.error('Error fetching requirements:', error);
            }
        };

        fetchRequirements();
    }, [selectedRequirementSet, editDialogOpen]);

    const handleToggleTable = (requirementId: string) => {
        // Toggle the display state for the clicked requirement
        setShowTables((prevShowTables) => ({
            ...prevShowTables,
            [requirementId]: !prevShowTables[requirementId],
        }));
    };

    const handleEditIconClick = (requirement: Requirement) => {
        setSelectedRequirement(requirement);
        setEditDialogOpen(true);
    };

    const handleDeleteIconClick = (requirement: Requirement) => {
        setSelectedRequirement(requirement);
        setDeleteDialogOpen(true);
    };

    const handleEditRequirement = async (updatedRequirement: Requirement) => {
        try {
            const result = await axios.put(
                `${react_backend_url}/v1/requirements/${updatedRequirement._id}`,
                updatedRequirement
            );
            console.log('Requirement updated:', result.data);
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Error updating requirement:', error);
        }
    };

    const handleDeleteRequirement = async () => {
        if (selectedRequirement) {
            try {
                const result = await axios.delete(
                    `${react_backend_url}/v1/requirements/${selectedRequirement?._id}`
                );
                console.log('Requirement deleted:', result.data);
                setDeleteDialogOpen(false);
                // After deletion, you may want to update the requirements list
                const updatedRequirements = requirements.filter(
                    (req) => req._id !== selectedRequirement._id
                );
                setRequirements(updatedRequirements);
            } catch (error) {
                console.error('Error deleting requirement:', error);
            }
        }
    };

    return (
        <div>
            <div className="req-set-header">
                <b>Requirement Set Name : {requirementSetName}</b>
                <div className="req-set-right">
                    <b>Status : Draft</b>
                    <b>Version : 1.3</b>
                </div>
            </div>
            <div className="req-title-underline"></div>
            <div className="requirements-Details">
                {requirements.length > 0 ? (
                    !editDialogOpen &&
                    requirements.map((requirement: Requirement) => (
                        <div key={requirement._id} className="Main23">
                            <div
                                className="category-title-container"
                                style={{
                                    marginBottom: showTables[requirement._id]
                                        ? '0px'
                                        : '16px', // Adjust the margin as needed
                                    display: 'flex',
                                    justifyContent: 'space-between', // Push elements to the left and right
                                }}
                            >
                                <div className="flex-container">
                                    <h2
                                        className="category-title-text"
                                        onClick={() =>
                                            handleToggleTable(requirement._id)
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showTables[requirement._id] ? (
                                            <IconButton
                                                size="small"
                                                aria-label="Collapse"
                                                className="white-icon"
                                            >
                                                <ExpandLessIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                size="small"
                                                aria-label="Expand"
                                                className="white-icon"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        )}
                                        Requirement ID: {requirement._id}
                                    </h2>
                                </div>
                                <div className="action-icon">
                                    <div className="icon-border">
                                        <Tooltip
                                            title="Edit Requirement"
                                            placement="top-end"
                                        >
                                            <img
                                                className="edit-pic"
                                                src={`../../../public/edit.svg`}
                                                onClick={() =>
                                                    handleEditIconClick(
                                                        requirement
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="icon-border">
                                        <Tooltip
                                            title="Delete Requirement"
                                            placement="top-end"
                                        >
                                            <img
                                                className="edit-pic"
                                                src={`../../../public/delete-outlined.svg`}
                                                onClick={() =>
                                                    handleDeleteIconClick(
                                                        requirement
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            {showTables[requirement._id] && (
                                <table className="content-table1">
                                    <thead>
                                        <tr>
                                            <th>Requirement Description</th>
                                            <th>Author</th>
                                            <th>Reference</th>
                                            <th>Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="req-middlePart">
                                                <p
                                                    style={{
                                                        textOverflow: 'clip',
                                                        width: '27vw',
                                                    }}
                                                >
                                                    {requirement
                                                        .requirementDescription
                                                        .length > 50
                                                        ? requirement.requirementDescription.substring(
                                                              0,
                                                              47
                                                          ) + '...'
                                                        : requirement.requirementDescription}
                                                </p>
                                            </td>
                                            <td>{requirement.author}</td>
                                            <td>{requirement.reference}</td>
                                            <td className="req-rightPart"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            <Dialog
                                open={deleteDialogOpen}
                                onClose={() => setDeleteDialogOpen(false)}
                            >
                                <DialogTitle>Confirm Delete</DialogTitle>
                                <DialogContent>
                                    Are you sure you want to delete this
                                    requirement?
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() =>
                                            setDeleteDialogOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDeleteRequirement}
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    ))
                ) : (
                    <div className="no-requirements">
                        <h3>No requirements created in this requirement set</h3>
                    </div>
                )}
                {editDialogOpen && (
                    <ReqForm
                        selectedRequirement={selectedRequirement}
                        handleFormActive={() => setEditDialogOpen(false)}
                        selectedRequirementSet={undefined}
                        setSelectedList={setSelectedList}
                    />
                )}
            </div>
        </div>
    );
};

export default Requirementsdetails;
