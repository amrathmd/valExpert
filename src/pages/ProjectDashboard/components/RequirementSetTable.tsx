import { Tooltip } from '@mui/material';
import React from 'react';
interface Requirement {
    _id?: string;
    name: string;
    projectId: string;
    status: string;
    testsetId?: string;
    version: string;
    requirements: string[];
    createdAt: string;
}
interface props {
    requirementSets: Requirement[];
}
const RequirementSetTable: React.FC<props> = ({ requirementSets }) => {
    const formatDate = (dateString: string) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        } as Intl.DateTimeFormatOptions;
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
    };
    return (
        <div className="requirementSets-Details">
            <div className="category-title">
                <h2 className="category-title-text">Requirement Set Details</h2>
            </div>
            <table className="content-table1">
                <thead>
                    <tr>
                        <th>Requirement Set ID</th>
                        <th>Requirement Set Name</th>
                        <th>Status</th>
                        <th>Version</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requirementSets.map((requirementSet) => (
                        <tr key={requirementSet._id}>
                            <td className="req-leftPart">
                                {requirementSet._id}
                            </td>
                            <td className="req-middlePart">
                                {requirementSet.name}
                            </td>
                            <td>{requirementSet.status}</td>
                            <td>{requirementSet.version}</td>
                            <td>{formatDate(requirementSet.createdAt)}</td>
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
    );
};
export default RequirementSetTable;
