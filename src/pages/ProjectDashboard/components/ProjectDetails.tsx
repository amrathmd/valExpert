import React from 'react';

interface ProjectInterface {
    projectName: string;
    purpose: string;
    status: 'Active' | 'Inactive';
    activationDate: Date;
    inactivationDate: Date;
    facility: string[];
    department: string[];
    country: string[];
    scope?: string[];
    category?: string;
    description: string;
    estimationDate?: Date;
    applicationName?: string;
    applicationVersion?: number;
    changeControlNumber?: string;
    owner?: string;
    requirementsets: string[];
    testsets: string[];
    createdAt: Date;
    updatedAt: Date;
}
interface Props {
    project: ProjectInterface;
}
const defaultProject = [
    { key: 'projectName', label: 'Project Name' },
    { key: 'facility', label: 'Facility' },
    { key: 'department', label: 'Department' },
    { key: 'country', label: 'Country' },
    { key: 'scope', label: 'Scope' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Project Description' },
    { key: 'estimationDate', label: 'Estimation Date' },
];
const ProjectDetails: React.FC<Props> = ({ project }) => {
    return (
        <div className="project-table-container">
            <div>
                <div className="project-table-header">
                    <h1>Project Details</h1>
                </div>
                <table className="project-table">
                    <tbody>
                        {defaultProject.map((item) => (
                            <tr key={item.key}>
                                <td>
                                    <b>{item.label}</b>
                                </td>
                                <td>{project[item.key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ProjectDetails;
