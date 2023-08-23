import { Tooltip } from '@mui/material';
import React from 'react';
import TestScript from '../../../components/Models/testScriptsmodel';
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
interface TestSet {
    Type: string;
    _id: string;
    testSetName: string;
    status: string;
    version: string;
    createdAt: string;
    description: string;
    category: string;
    testScripts: TestScript[];
}
interface props {
    testSets: TestSet[];
}
const TestSetTable: React.FC<props> = ({ testSets }) => {
    return (
        <div className="requirementSets-Details">
            <div className="category-title">
                <h2 className="category-title-text">Test Sets Details</h2>
            </div>
            <table className="content-table1">
                <thead>
                    <tr>
                        <th>Test Set ID</th>
                        <th>Test Set Name </th>
                        <th>Test Set Description </th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Version</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testSets.map((testSet) => (
                        <tr key={testSet._id}>
                            <td style={{ width: '10vw' }}>{testSet._id}</td>
                            <td className="req-middlePart">
                                {testSet.testSetName}
                            </td>
                            <td>{testSet.description}</td>
                            <td>{testSet.category}</td>
                            <td>{testSet.status}</td>
                            <td>{testSet.version}</td>
                            <td>{formatDate(testSet.createdAt)}</td>
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
export default TestSetTable;
