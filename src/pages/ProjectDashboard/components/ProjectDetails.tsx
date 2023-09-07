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
    const total = 12;
    const fail = 6;
    const notRun = 3;
    const pass = 3;

    const failWidth = (fail / total) * 100 + '%';
    const passWidth = (pass / total) * 100 + '%';
    const notRunWidth = (notRun / total) * 100 + '%';
    return (
        <div className="project-details-container">
            <div className="projectdetailstop">
                <table className="table1">
                    <tbody>
                        <tr>
                            <td className="project-tabledata">
                                <b>Total Requirements</b>
                            </td>
                            <td className="project-tabledata">
                                <b>Total Test Cases</b>
                            </td>
                            <td className="project-tabledata">
                                <b>Total Bugs</b>
                            </td>
                            <td className="project-tabledata">
                                <b>Uncovered Reuirements</b>
                            </td>
                            <td className="project-progress-bar">
                                <b>Execution Program</b>
                            </td>
                        </tr>
                        <tr>
                            <td className="project-tabledata1">
                                <b>{project.requirementsets.length}</b>
                            </td>
                            <td className="project-tabledata1">
                                <b>{project.testsets.length}</b>
                            </td>

                            <td className="project-tabledata-bugs">
                                <b>9</b>
                            </td>

                            <td className="project-tabledata-bugs">
                                <b>10</b>
                            </td>
                            <td className="project-progress-bar">
                                <div className="progress-bar">
                                    <div className="status-bar">
                                        <div className="progress-container">
                                            <div
                                                className="not-run"
                                                style={{ width: notRunWidth }}
                                            >
                                                <span>&nbsp;</span>
                                            </div>
                                            <div
                                                className="fail"
                                                style={{ width: failWidth }}
                                            >
                                                <span>&nbsp;</span>
                                            </div>
                                            <div
                                                className="pass"
                                                style={{ width: passWidth }}
                                            >
                                                <span>&nbsp;</span>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <span>&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="labels-values-container">
                                        <div className="label-cell">
                                            <b className="b-total">
                                                Total Test Cases:
                                            </b>
                                            <span>{total}</span>
                                        </div>
                                        <div className="label-cell">
                                            <b className="b-pass">Pass:</b>
                                            <span>{pass}</span>
                                        </div>
                                        <div className="label-cell">
                                            <b className="b-fail">Fail:</b>
                                            <span>{fail}</span>
                                        </div>
                                        <div className="label-cell">
                                            <b className="b-not-run">No Run:</b>
                                            <span>{notRun}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="project-detail-line"></div>
            <div className="project-details-row">
                <div className="project-details-left">
                    {firstRowLeftFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b>
                            <span className="project-details-value">
                                {project[item.key]}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="project-details-right">
                    {firstRowRightFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b>
                            <span className="project-details-value">
                                {project[item.key]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="project-detail-line"></div>
            <div className="project-details-row">
                <div className="project-details-left">
                    {secondRowLeftFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b>
                            <span className="project-details-value">
                                {project[item.key]}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="project-details-right">
                    {secondRowRightFields.map((item) => (
                        <div key={item.key} className="project-details-item">
                            <b>{item.label}:</b>
                            <span className="project-details-value">
                                {project[item.key]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ProjectDetails;
