import React from 'react';
import TestForm from './TestForm';
import TestCasesForm from './TestCasesForm';
import { TestCase } from '@/components/Models/testCasesmodel';

interface Props {
    selectedItem: number;
    selectedTestSetId: string | null;
    refreshTestSets: () => void;
    selectedTestSet: any;
    testCases: TestCase[];
}

interface TableColumn {
    key: string;
    label: string;
}

const TestSets: React.FC<Props> = ({
    selectedItem,
    selectedTestSetId,
    refreshTestSets,
    selectedTestSet,
    testCases,
}) => {
    const [isTestActive, setTestActive] = React.useState<boolean>(false);
    const [isTestCasesActive, setTestCasesActive] = React.useState(false);

    const handleTestActive = () => {
        setTestActive(!isTestActive);
    };
    const handleTestCasesActive = () => {
        setTestCasesActive(!isTestCasesActive); // Toggle the state for TestCasesForm
    };
    const testSetHeader: TableColumn[] = [
        { key: 'projectId', label: 'Project Id' },
        { key: 'requirementSetId', label: 'RequirementSet Id' },
        { key: 'testName', label: 'TestSet Name' },
        { key: '_id', label: 'TestSet Id' },
        { key: 'requirementSetName', label: 'RequirementSet Name' },
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description' },
        { key: 'status', label: 'Status' },
    ];

    return (
        <div>
            {selectedItem === 2 && (
                <div>
                    <button
                        className="create-reqSet-button"
                        onClick={handleTestActive}
                    >
                        Create Test Set
                    </button>

                    {isTestActive && (
                        <TestForm
                            refresh={refreshTestSets}
                            handleFormActive={handleTestActive}
                        />
                    )}
                </div>
            )}
            {selectedTestSetId && (
                <div>
                    <div className="testsetdetails">
                        <table>
                            <tbody>
                                {testSetHeader.map((item) => (
                                    <tr key={item.key}>
                                        <td>{item.label}</td>
                                        <td>{selectedTestSet[item.key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        className="create-reqSet-button"
                        onClick={handleTestCasesActive}
                    >
                        create test cases
                    </button>
                </div>
            )}
            {isTestCasesActive && (
                <TestCasesForm
                    handleFormActive={handleTestCasesActive}
                    selectedTestSetId={selectedTestSetId}
                />
            )}
        </div>
    );
};

export default TestSets;
