import { Project } from '@/components/Models/projerctModel';
import React from 'react';

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
                        <td>{project.department}</td>
                        <td>{project.category}</td>
                        <td>{project.description}</td>
                        <td>
                            {project.implementationDate
                                .toString()
                                .substring(0, 10)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
