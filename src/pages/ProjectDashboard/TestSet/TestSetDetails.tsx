import TestSetForm from './TestSetForm';
import TestCasesForm from './Testscript/TestscriptForm';
import React, { useEffect, useState } from 'react';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import TestscriptForm from './Testscript/TestscriptForm';
import { Tooltip } from '@mui/material';
import '../Requirements/Requirements.css';
interface Props {
    selectedItem: number;
    projectId: string;
    testSet: null | any;
}

interface TableColumn {
    key: string;
    label: string;
}
interface TestScript {
    _id?: string;
    testsetId: string;
    Type: string;
    purpose: string;
    acceptanceCriteria: string;
    prerequesites: string;
    result: string;
    author: string;
    createdAt: Date;
}

const TestSetDetails: React.FC<Props> = ({
    selectedItem,
    projectId,
    testSet,
}) => {
    console.log(selectedItem);
    console.log(projectId);
    const [isTestActive, setTestActive] = React.useState<boolean>(false);
    const [isTestCasesActive, setTestCasesActive] = React.useState(false);
    const [testScripts, setTestScripts] = useState<TestScript[]>([]);
    const [isTestScriptFormVisible, setTestScriptFormVisible] =
        React.useState(false);
    const [testSetDetails, setTestSetDetails] = useState<any>(null);
    const [isFormVisible, setFormVisible] = useState(false);

    const handleTestScriptForm = () => {
        setTestScriptFormVisible(true);
    };

    React.useEffect(() => {
        if (testSet) {
            axios
                .get(`${react_backend_url}/v1/testsets/${testSet}`)
                .then((response) => {
                    console.log('Test Set Details:', response.data);
                    setTestSetDetails(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching test set details:', error);
                });
        }
    }, [testSet]);
    React.useEffect(() => {
        console.log('Received testSet:', testSet);
        if (testSet) {
            axios
                .get(`${react_backend_url}/v1/testscripts/testset/${testSet}`)
                .then((response) => {
                    console.log(response.data);
                    setTestScripts(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching test scripts:', error);
                });
        }
    }, [testSet]);

    const handleTestActive = () => {
        setTestActive(!isTestActive);
    };
    const handleTestCasesActive = () => {
        setTestCasesActive(!isTestCasesActive);
    };

    const testScriptHeader: TableColumn[] = [
        { key: 'acceptanceCriteria', label: 'Acceptance Criteria' },
        { key: 'result', label: 'Result' },
        { key: 'type', label: 'Type' },
        { key: 'purpose', label: 'Purpose' },
        { key: 'prerequesites', label: 'Prerequesites' },
        { key: 'author', label: 'Author' },
        // { key: '_Id', label: 'ScriptNumber' },
    ];
    function handleEditIconClick(requirement: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div>
            {selectedItem === 2 && (
                <div>
                    {isTestScriptFormVisible ? (
                        <div>
                            <button
                                className="create-reqSet-button"
                                onClick={handleTestScriptForm}
                            >
                                Create Test Script
                            </button>

                            <TestscriptForm
                                testSetId={testSet}
                                onClose={() => setTestScriptFormVisible(false)}
                            />
                        </div>
                    ) : (
                        <div>
                            <button
                                className="create-reqSet-button"
                                onClick={handleTestScriptForm}
                            >
                                Create Test Script
                            </button>
                            <div className="test-set-details-container">
                                <div className="test-set-details-column">
                                    {testSetDetails && (
                                        <div className="test-set-detail">
                                            <p>
                                                Test Set Name:{' '}
                                                {testSetDetails.testSetName}
                                            </p>
                                            <p>
                                                Category:
                                                {testSetDetails.category}
                                            </p>
                                            <p>
                                                Description:
                                                {testSetDetails.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="test-set-details-column">
                                    {testSetDetails && (
                                        <div className="test-set-detail">
                                            <p>
                                                Status: {testSetDetails.status}
                                            </p>
                                            <p>Version:1.0</p>
                                            <p>
                                                Created Date:{' '}
                                                {new Date(
                                                    testSetDetails.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <hr className="hr"></hr>
                            {testScripts.length > 0 && (
                                <div>
                                    <div className="category-title">
                                        <h2 className="category-title-text">
                                            List of Test Scripts:
                                        </h2>
                                        <table className="content-table1">
                                            <thead>
                                                <tr>
                                                    <th>Test Script Number</th>
                                                    <th>Purpose</th>
                                                    <th>Author</th>
                                                    <th>Created Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {testScripts.map((script) => (
                                                    <tr key={script._id}>
                                                        <td>{script._id}</td>
                                                        <td>
                                                            {script.purpose}
                                                        </td>
                                                        <td>{script.author}</td>
                                                        <td>
                                                            {new Date(
                                                                script.createdAt
                                                            ).toLocaleDateString()}
                                                        </td>
                                                        <td>
                                                            <div className="action-icon">
                                                                <div className="icon-border">
                                                                    <Tooltip
                                                                        title="view testscript"
                                                                        placement="top-end"
                                                                    >
                                                                        <img
                                                                            className="edit-pic"
                                                                            src={`../../../public/edit.svg`}
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
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestSetDetails;
