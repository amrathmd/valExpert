import React from 'react';

interface Project {
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

    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Category</th>
                    <th>Project Description</th>
                    <th>Estimated Implementation Date</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.name}>
                        <td>{project.name}</td>
                        <td>{project.Department}</td>
                        <td>{project.Category}</td>
                        <td>{project.ProjectDescription}</td>
                        <td>{project.EstimatedDate}</td>
                    </tr>
                ))}
                <tr>
                    <td>Arbaz</td>
                    <td>Khan</td>
                    <td>Hooda</td>
                    <td>Deepak</td>
                    <td>16-02-2024</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
