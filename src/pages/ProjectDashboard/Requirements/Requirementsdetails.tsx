import React from 'react';
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
                        `http://localhost:3000/v1/requirements/requirementset/${selectedRequirementSet}`
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
            {!editDialogOpen && (
                <div>
                    {Object.keys(categoryRequirementsMap).map((category) => (
                        <div key={category} className="category-title">
                            <h2 className="category-title-text">
                                Requirement Category:{category}
                            </h2>
                            <table className="content-table1">
                                <thead>
                                    <tr>
                                        <th>RequirementSetId</th>
                                        <th>RequirementDescription</th>
                                        {/* <th>Reference</th>
                                    <th>Verification</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryRequirementsMap[category].map(
                                        (requirement) => (
                                            <tr key={requirement._id}>
                                                <td>
                                                    {
                                                        requirement.requirementSetId
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        requirement.requirementDescription
                                                    }
                                                </td>
                                                {/* <td>{requirement.reference}</td>
                                            <td>{requirement.verification}</td> */}
                                                <td>
                                                    <div className="action-icon">
                                                        <Tooltip
                                                            title="Edit Requirement"
                                                            placement="top-end"
                                                        >
                                                            <ModeEditOutlineOutlinedIcon
                                                                onClick={() =>
                                                                    handleEditIconClick(
                                                                        requirement
                                                                    )
                                                                }
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            title="Delete Requirement"
                                                            placement="top-end"
                                                        >
                                                            <DeleteOutlineIcon
                                                                onClick={() =>
                                                                    handleDeleteIconClick(
                                                                        requirement
                                                                    )
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    <Dialog
                        open={deleteDialogOpen}
                        onClose={() => setDeleteDialogOpen(false)}
                    >
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete this requirement?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeleteDialogOpen(false)}>
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
            )}
            {editDialogOpen && (
                <ReqForm
                    selectedRequirement={selectedRequirement}
                    handleFormActive={() => setEditDialogOpen(false)}
                    selectedRequirementSet={undefined}
                />
            )}
        </div>
    );
};

export default Requirementsdetails;
