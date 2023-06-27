import React from 'react';
import './project.css';
import DashboardContext from '../../contexts/dashboardContext';
interface Project {
    _id: string;
    name: string;
    Department: string;
    Category: string;
    ProjectDescription: string;
    EstimatedDate: number;
}

interface TableProps {
    projects: Project[];
}

const Table: React.FC<TableProps> = (props) => {
    const { projects } = props;
    const { dashboardState, setDashboardState } =
        React.useContext(DashboardContext);
    const handleProject = () => {
        setDashboardState(1);
    };
    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Category</th>
                    <th>Project Description</th>
                    <th>Estimated Implementation Date</th>
                    <th>
                        <></>
                    </th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project._id}>
                        <td>{project.name}</td>
                        <td>{project.Department}</td>
                        <td>{project.Category}</td>
                        <td>{project.ProjectDescription}</td>
                        <td>{project.EstimatedDate}</td>
                        <td>
                            <button
                                className="manage-project"
                                value={project.name}
                                onClick={handleProject}
                            >
                                Manage Project
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
