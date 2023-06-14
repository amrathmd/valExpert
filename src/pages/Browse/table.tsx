import React from 'react';

interface Project {
    name: string;
    Department: string;
    Category: string;
    ProjectDescription: string;
    EstimatedDate: string;
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
                    <th> </th>
                    <th></th>
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
                        <td>
                            <input type="checkbox"></input>
                        </td>
                        <td></td>
                        <td>{project.name}</td>
                        <td>{project.Department}</td>
                        <td>{project.Category}</td>
                        <td>{project.ProjectDescription}</td>
                        <td>{project.EstimatedDate}</td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <input type="checkbox"></input>{' '}
                    </td>
                    <td>
                        <i className="fa fa-start-o" aria-hidden="true"></i>
                    </td>
                    <td>Arbaz</td>
                    <td>Khan</td>
                    <td>Hooda</td>
                    <td>Deepak</td>
                    <td>Amrath</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
