import { react_backend_url } from '../../../config';
import axios from 'axios';
import React from 'react';
import './TestCaseDetails.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, Collapse } from '@mui/material';

interface TestCase {
    testsetId: string;
    Type: string;
    testCaseNumber: number;
    purpose: string;
    acceptanceCriteria: string;
    prerequisites: string;
    result: string;
    author: string;
}
interface Props {
    testCaseId: string;
}
const TestCaseDetails: React.FC<Props> = ({ testCaseId }) => {
    const [testCase, setTestCase] = React.useState<TestCase>();
    const [openTestCaseDetails, setOpenTestCaseDetails] =
        React.useState<boolean>();

    const handleOpenTestCaseDetails = () => {
        setOpenTestCaseDetails(!openTestCaseDetails);
    };
    React.useEffect(() => {
        const fetchTestCase = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/testscripts/${testCaseId}`
            );
            setTestCase(result.data[0]);
        };
        fetchTestCase();
    }, []);
    const testCaseDummy = [
        { key: 'testCaseNumber', label: 'Test Case Number' },
        { key: 'purpose', label: 'Purpose' },
        { key: 'acceptanceCriteria', label: 'Acceptance' },
        { key: 'prerequisites', label: 'Prerequisites' },
    ];
    return (
        <div className="testcasedetails">
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
                    onClick={handleOpenTestCaseDetails}
                >
                    {openTestCaseDetails ? <ExpandLess /> : <ExpandMore />}

                    <span className="header-text-testcase">
                        <b>Test case Details</b>
                    </span>
                </div>
                <div className="testcasedetails1">
                    <Collapse
                        in={openTestCaseDetails}
                        timeout="auto"
                        unmountOnExit
                    >
                        {testCase && (
                            <div className="testCaseDetailsView">
                                <div>
                                    <table>
                                        <tr>
                                            <td className="testDetailsLabel">
                                                <b>Test case Number</b>
                                            </td>
                                            <td className="testDetailsValue">
                                                {testCase.testCaseNumber}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="testDetailsLabel">
                                                <b>Purpose</b>
                                            </td>
                                            <td className="testDetailsValue">
                                                {testCase.purpose}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div>
                                    <table>
                                        <tr>
                                            <td className="testDetailsLabel">
                                                <b>Acceptance Criteria</b>
                                            </td>
                                            <td className="testDetailsValue">
                                                {testCase.acceptanceCriteria}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="testDetailsLabel">
                                                <b>Prerequisites</b>
                                            </td>
                                            <td className="testDetailsValue">
                                                {testCase.prerequisites}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        )}
                    </Collapse>
                </div>
            </List>
            <hr style={{ background: '#B8B6B6', height: '1px' }} />
        </div>
    );
};
export default TestCaseDetails;
