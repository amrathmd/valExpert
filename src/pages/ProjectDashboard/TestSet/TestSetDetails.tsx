import TestSetForm from './TestSetForm';
import TestCasesForm from './Testscript/TestscriptForm';
import React, { useEffect, useState } from 'react';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import TestscriptForm from './Testscript/TestscriptForm';
import TestCaseDetailsForm from './TestCaseDetailsForm';
import { Collapse, List, ListItemButton, Tooltip } from '@mui/material';
import '../Requirements/Requirements.css';
import { Icon } from '@iconify/react';
import pageFacingUp from '@iconify/icons-fluent-emoji-high-contrast/page-facing-up';
import './TestSetDetails.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
interface Props {
    selectedItem: number;
    projectId: string;
    testSet: null | any;
    handleTestCaseForm: () => void;
    isTestCaseFormVisible: boolean;
    setSelectedList: (selectedList: number) => void;
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
    setSelectedList,
}) => {
    const [isTestActive, setTestActive] = React.useState<boolean>(false);
    const [isTestCasesActive, setTestCasesActive] = React.useState(false);
    const [testScripts, setTestScripts] = useState<TestScript[]>([]);
    const [openTestSetDetails, setOpenTestSetDetails] =
        useState<boolean>(false);

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
    const handleTestSetOpen = () => {
        setOpenTestSetDetails(!openTestSetDetails);
    };
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
                                    setSelectedList={setSelectedList}
                                />
                            )}
                        </div>
                    ) : (
                        <div>
                            <List
                                sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    paddingTop: '0px',
                                    paddingBottom: '0px',
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <div
                                    className="TestCaseFrom-header"
                                    onClick={handleTestSetOpen}
                                >
                                    {openTestSetDetails ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}

                                    <span className="header-text-testcase">
                                        <b>Test set details</b>
                                    </span>
                                </div>
                                <Collapse in={openTestSetDetails}>
                                    <div className="test-set-details-container">
                                        <div className="test-set-details-column">
                                            {testSetDetails && (
                                                <div className="test-set-detail">
                                                    <tr>
                                                        <td>
                                                            <b>Test Set Name</b>
                                                        </td>
                                                        <td>
                                                            {
                                                                testSetDetails.testSetName
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Category</b>
                                                        </td>
                                                        <td>
                                                            {
                                                                testSetDetails.category
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Description</b>
                                                        </td>
                                                        <td>
                                                            {
                                                                testSetDetails.description
                                                            }
                                                        </td>
                                                    </tr>
                                                </div>
                                            )}
                                        </div>
                                        <div className="test-set-details-column">
                                            {testSetDetails && (
                                                <div className="test-set-detail">
                                                    <tr>
                                                        <td>
                                                            <b>Status</b>
                                                        </td>
                                                        <td>
                                                            {
                                                                testSetDetails.status
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Version</b>
                                                        </td>
                                                        <td>1.0</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Created Date</b>
                                                        </td>
                                                        <td>
                                                            {new Date(
                                                                testSetDetails.createdAt
                                                            ).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Collapse>
                            </List>

                            <div className="line"></div>
                            <div className="testCaseheader">
                                <b>List of Test Cases:</b>
                            </div>
                            <section className={`testcase-section`}>
                                {testScripts.length > 0 &&
                                    testScripts.map((script) => (
                                        <div
                                            key={script._id}
                                            className="testcase-main"
                                        >
                                            <div
                                                className="testcase-card"
                                                key={script._id}
                                            >
                                                <div className="testcase-image">
                                                    <img
                                                        src={
                                                            '../../../public/Testscript.svg'
                                                        }
                                                        alt=""
                                                        className="testcaseicon"
                                                    />
                                                    <div className="testcaseicons-small">
                                                        <div className="testcase-border1">
                                                            <Tooltip
                                                                title="Edit Project"
                                                                placement="top-end"
                                                            >
                                                                <img
                                                                    className="testcase-pic1"
                                                                    src={`../../../public/edit.svg`}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                        <div className="testcase-border1">
                                                            <Tooltip
                                                                title="Delete Project"
                                                                placement="top-end"
                                                            >
                                                                <img
                                                                    className="testcase-pic1"
                                                                    src={`../../../public/delete-outlined.svg`}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="testcase-description">
                                                    <b>
                                                        Test Case Number{' '}
                                                        {script.testCaseNumber}
                                                    </b>
                                                    <p>
                                                        <b>Author:</b>
                                                        {script.author}
                                                    </p>
                                                    <p>
                                                        <b>Created on:</b>
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
