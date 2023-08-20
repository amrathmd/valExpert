import React, { useState } from 'react';
import {
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Requirements.css';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ReqForm from './RequirementForm';
import { NavLink } from 'react-router-dom';
interface RequirementsdetailsProps {
    selectedRequirementSet: any;
}

interface Requirement {
    _id: string;
    requirementSetId: string;
    requirementDescription: string;
    requirementCategory: string;
    reference: string;
    verification: string;
}

const Requirementsdetails: React.FC<RequirementsdetailsProps> = ({
    selectedRequirementSet,
}) => {
    const [categoryRequirementsMap, setCategoryRequirementsMap] =
        React.useState<Record<string, Requirement[]>>({});

    const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] =
        React.useState<boolean>(false);
    const [selectedRequirement, setSelectedRequirement] =
        React.useState<Requirement | null>(null);

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
            setCategoryRequirementsMap((prevCategoryRequirementsMap) => {
                const updatedCategoryRequirementsMap = {
                    ...prevCategoryRequirementsMap,
                };
                const category = updatedRequirement.requirementCategory;
                const updatedRequirements = updatedCategoryRequirementsMap[
                    category
                ].map((requirement) =>
                    requirement._id === updatedRequirement._id
                        ? updatedRequirement
                        : requirement
                );
                updatedCategoryRequirementsMap[category] = updatedRequirements;
                return updatedCategoryRequirementsMap;
            });

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
                setCategoryRequirementsMap((prevCategoryRequirementsMap) => {
                    const updatedCategoryRequirementsMap = {
                        ...prevCategoryRequirementsMap,
                    };
                    const category = selectedRequirement.requirementCategory;
                    updatedCategoryRequirementsMap[category] =
                        updatedCategoryRequirementsMap[category].filter(
                            (requirement) =>
                                requirement._id !== selectedRequirement._id
                        );
                    return updatedCategoryRequirementsMap;
                });
            } catch (error) {
                console.error('Error deleting requirement:', error);
            }
        }
    };

    React.useEffect(() => {
        const fetchRequirements = async () => {
            try {
                if (selectedRequirementSet) {
                    const result = await axios.get(
                        `${react_backend_url}/v1/requirements/requirementset/${selectedRequirementSet}`
                    );
                    const requirementsData: Requirement[] = result.data;
                    const groupedRequirements: Record<string, Requirement[]> =
                        {};

                    requirementsData.forEach((requirement) => {
                        const category = requirement.requirementCategory;
                        if (!groupedRequirements[category]) {
                            groupedRequirements[category] = [];
                        }
                        groupedRequirements[category].push(requirement);
                    });

                    setCategoryRequirementsMap(groupedRequirements);
                }
            } catch (error) {
                console.error('Error fetching requirements details:', error);
                // Handle error state or display an error message
            }
        };
        fetchRequirements();
    }, [selectedRequirementSet, editDialogOpen, deleteDialogOpen]);

    return (
        <div>
            <div className="req-set-header">
                <b>Requirement Set Name : RequirementSet1</b>
                <div className="req-set-right">
                    <b>Status : Draft</b>
                    <b>Version : 1.3</b>
                </div>
            </div>
            <div className="title-underline"></div>
            <div className="requirements-Details">
                {!editDialogOpen &&
                    (Object.keys(categoryRequirementsMap).length === 0 ? (
                        <div className="no-requirements">
                            <h3>
                                No requirements created in this requirement set
                            </h3>
                        </div>
                    ) : (
                        <div>
                            {Object.keys(categoryRequirementsMap).map(
                                (category) => (
                                    <div
                                        key={category}
                                        className="category-title"
                                    >
                                        <h2 className="category-title-text">
                                            Requirement Category:{category}
                                        </h2>
                                        <table className="content-table1">
                                            <thead>
                                                <tr>
                                                    <th>RequirementId</th>
                                                    <th>
                                                        RequirementDescription
                                                    </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categoryRequirementsMap[
                                                    category
                                                ].map((requirement) => (
                                                    <tr key={requirement._id}>
                                                        <td className="req-leftPart">
                                                            <NavLink
                                                                to={`/dashboard/requirements/${requirement._id}`}
                                                                className="req-id"
                                                            >
                                                                {
                                                                    requirement._id
                                                                }
                                                            </NavLink>
                                                        </td>
                                                        <td className="req-middlePart">
                                                            <p
                                                                style={{
                                                                    textOverflow:
                                                                        'clip',
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
                                                        <td className="req-rightPart">
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
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
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
                    ))}
                {editDialogOpen && (
                    <ReqForm
                        selectedRequirement={selectedRequirement}
                        handleFormActive={() => setEditDialogOpen(false)}
                        selectedRequirementSet={undefined}
                    />
                )}
            </div>
        </div>
    );
};

export default Requirementsdetails;
