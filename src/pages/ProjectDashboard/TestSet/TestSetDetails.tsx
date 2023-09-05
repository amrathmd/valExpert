import TestSetForm from './TestSetForm';
import TestCasesForm from './Testscript/TestscriptForm';
import React, { useEffect, useState } from 'react';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import TestscriptForm from './Testscript/TestscriptForm';
import TestCaseDetailsForm from './TestCaseDetailsForm';
import { Tooltip } from '@mui/material';
import '../Requirements/Requirements.css';
import { Icon } from '@iconify/react';
import pageFacingUp from '@iconify/icons-fluent-emoji-high-contrast/page-facing-up';
interface Props {
    selectedItem: number;
    projectId: string;
    testSet: null | any;
    handleTestCaseForm: () => void;
    isTestCaseFormVisible: boolean;
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
    testCaseNumber: number;
}

const TestSetDetails: React.FC<Props> = ({
    selectedItem,
    projectId,
    testSet,
    handleTestCaseForm,
    isTestCaseFormVisible,
}) => {
    const [isTestActive, setTestActive] = React.useState<boolean>(false);
    const [isTestCasesActive, setTestCasesActive] = React.useState(false);
    const [testScripts, setTestScripts] = useState<TestScript[]>([]);

    const [testSetDetails, setTestSetDetails] = useState<any>(null);
    const [isFormVisible, setFormVisible] = useState(false);

    React.useEffect(() => {
        if (testSet) {
            axios
                .get(`${react_backend_url}/v1/testsets/${testSet}`)
                .then((response) => {
                    setTestSetDetails(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching test set details:', error);
                });
        }
    }, [testSet]);
    React.useEffect(() => {
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
            {selectedItem === 0 && (
                <div>
                    {isTestCaseFormVisible ? (
                        <div>
                            {isTestCaseFormVisible && (
                                <TestCaseDetailsForm
                                    handleTestCaseForm={handleTestCaseForm}
                                    testsetId={testSet}
                                    projectId={projectId}
                                />
                            )}
                        </div>
                    ) : (
                        <div>
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

                            <hr className="line"></hr>
                            <div className="testheader">
                                <p>List of Test Cases:</p>
                            </div>
                            <section className={`requirements-section`}>
                                {testScripts.length > 0 &&
                                    testScripts.map((script) => (
                                        <div
                                            key={script._id}
                                            className="testscripts-main"
                                        >
                                            <div
                                                className="testscripts-card"
                                                key={script._id}
                                            >
                                                <div className="testscripts-image">
                                                    <img
                                                        src={
                                                            '../../../public/Testscript.svg'
                                                        }
                                                        alt=""
                                                        className="iconimg"
                                                    />
                                                    <div className="testscripticonimg-small">
                                                        <div className="icon-border1">
                                                            <Tooltip
                                                                title="Edit Project"
                                                                placement="top-end"
                                                            >
                                                                <img
                                                                    className="edit-pic1"
                                                                    src={`../../../public/edit.svg`}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                        <div className="icon-border1">
                                                            <Tooltip
                                                                title="Delete Project"
                                                                placement="top-end"
                                                            >
                                                                <img
                                                                    className="edit-pic1"
                                                                    src={`../../../public/delete-outlined.svg`}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="testscripts-description">
                                                    <b>
                                                        Test Case Number{' '}
                                                        {script.testCaseNumber}
                                                    </b>
                                                    <p className="paragraph">
                                                        Author:{script.author}
                                                    </p>
                                                    <p className="paragraph">
                                                        Created on:
                                                        {new Date(
                                                            script.createdAt
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </section>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestSetDetails;
