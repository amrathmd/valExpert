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
import TestStepForm from './TestStep/TestStepForm';
import TestCaseDetails from './TestCaseDetails';
import TestStepForm1 from './TestStep/TestStepForm1';
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
    const [selectedTestScript, setSelectedTestScript] = useState<string>(null);
    const [openTestStepForm, setOpenTestStepForm] = useState<boolean>(false);
    const [count, setcount] = React.useState<number>(1);
    const [currPage, setCurrentPage] = React.useState<number>(1);

    const [isSaved, setIsSaved] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [testStep, setTestStep] = React.useState(null);
    const handleTestStepForm = () => {
        setOpenTestStepForm(!openTestStepForm);
    };

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
    const handleSelectedTestScript = (id: string) => {
        setSelectedTestScript(id);
    };
    const handleTestSetOpen = () => {
        setOpenTestSetDetails(!openTestSetDetails);
    };
    return (
        <div className="TestSet-page">
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
                                    editTestCase={false}
                                />
                            )}
                        </div>
                    ) : !selectedTestScript ? (
                        <div className="testSet-main">
                            <div className="testSet-left">
                                <List
                                    sx={{
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
                                                                <b>
                                                                    Test Set
                                                                    Name
                                                                </b>
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
                                                                <b>
                                                                    Description
                                                                </b>
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
                                                                <b>
                                                                    Created Date
                                                                </b>
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
                                                    onClick={() =>
                                                        handleSelectedTestScript(
                                                            script._id
                                                        )
                                                    }
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
                                                            {
                                                                script.testCaseNumber
                                                            }
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
                            <div className="testSet-right">
                                <b> Version History</b>
                                <table className="testRight-table">
                                    <tr>
                                        <th style={{ width: '20%;' }}>
                                            Version
                                        </th>
                                        <th style={{ width: '30%;' }}>
                                            Status
                                        </th>
                                        <th style={{ width: '50%;' }}>
                                            Created On
                                        </th>
                                    </tr>

                                    <tr>
                                        <td style={{ width: '20%;' }}>1.0</td>
                                        <td style={{ width: '30%;' }}>
                                            Approved
                                        </td>
                                        <td style={{ width: '50%;' }}>
                                            16-Aug-2023
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <TestCaseDetails testCaseId={selectedTestScript} />
                            <div
                                onClick={handleTestStepForm}
                                className="testStepHeader"
                            >
                                <img
                                    src="../../../../public/roundedplus.png"
                                    alt=""
                                    style={{
                                        display: 'inline-block',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                />
                                <span className="header-text-teststep">
                                    <p>Add Step</p>
                                </span>
                            </div>
                            {openTestStepForm && (
                                <div className="dialogOpen">
                                    <TestStepForm1
                                        setOpenTestStepForm={
                                            setOpenTestStepForm
                                        }
                                        testScriptId={selectedTestScript}
                                        handleTestStepForm={handleTestStepForm}
                                        count={count}
                                        setcount={setcount}
                                    />
                                </div>
                            )}
                            <TestStepForm
                                count={count}
                                setcount={setcount}
                                currPage={currPage}
                                setCurrentPage={setCurrentPage}
                                testCaseId={selectedTestScript}
                                handleTestCaseform={handleTestCaseForm}
                                isSaved={isSaved}
                                setIsSaved={setIsSaved}
                                isEditMode={isEditMode}
                                setIsEditMode={setIsEditMode}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestSetDetails;
