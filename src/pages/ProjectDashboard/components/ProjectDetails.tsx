import React from 'react';
import './Projectdetails.css';
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
    { key: 'purpose', label: 'Purpose' },
    { key: 'activationDate', label: 'Activation Date' },
    { key: 'inactivationDate', label: 'Inactivation Date' },
    { key: 'scope', label: 'Scope' },
    { key: 'description', label: 'Project Description' },
    { key: 'applicationName', label: 'Application Name' },
    { key: 'status', label: 'Status' },
    { key: 'facility', label: 'Facility' },
    { key: 'department', label: 'Department' },
    { key: 'country', label: 'Country' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Project Description' },
    { key: 'estimationDate', label: 'Estimation Date' },
];
const ProjectDetails: React.FC<Props> = ({ project }) => {
    const firstRowLeftFields = defaultProject.slice(0, 4);
    const firstRowRightFields = defaultProject.slice(4, 7);
    const secondRowLeftFields = defaultProject.slice(7, 10);
    const secondRowRightFields = defaultProject.slice(10);

    return (
        <div className="project-details-container">
            <div className="projectdetailstop">
                <table className="table1">
                    <tbody>
                        <tr>
                            <th>Total Requirements</th>
                            <th>Total Test Cases</th>
                            <th>Total Bugs</th>
                            <th>Uncovered Reuirements</th>
                        </tr>
                        <tr>
                            <td>{project.requirementsets.length}</td>
                            <td>{project.testsets.length}</td>
                            <td>Total Bugs</td>
                            <td>Uncovered Reuirements</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="project-details-row">
                <div className="project-details-left">
                    {firstRowLeftFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b> {project[item.key]}
                        </div>
                    ))}
                </div>
                <div className="project-details-right">
                    {firstRowRightFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b> {project[item.key]}
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className="project-details-row">
                <div className="project-details-left">
                    {secondRowLeftFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b> {project[item.key]}
                        </div>
                    ))}
                </div>
                <div className="project-details-right">
                    {secondRowRightFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b> {project[item.key]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ProjectDetails;
