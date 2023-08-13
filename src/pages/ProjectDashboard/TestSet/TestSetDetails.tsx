import React from 'react';
import TestSetForm from './TestSetForm';
import TestCasesForm from './TestCases/TestcaseForm';
import { TestCase } from '@/components/Models/testCasesmodel';

interface Props {
    selectedList: number;
}

interface TableColumn {
    key: string;
    label: string;
}

const TestSets: React.FC<Props> = ({ selectedList }) => {
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
            {selectedList === 2 && (
                <div>
                    <button
                        className="create-reqSet-button"
                        onClick={handleTestActive}
                    >
                        Create Test Set
                    </button>

                    {isTestActive && (
                        <TestSetForm handleTestSetForm={handleTestActive} />
                    )}
                </div>
            )}
        </div>
    );
};

export default TestSets;
