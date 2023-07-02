import { Project } from '@/components/Models/projerctModel';
import React from 'react';
import DashboardContext from '../../contexts/dashboardContext';

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
