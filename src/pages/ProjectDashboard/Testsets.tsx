import React from 'react';
import TestForm from './TestForm';

interface Props {
    selectedItem: number;
    selectedTestSetId: any;
    refreshTestSets: () => void;
    selectedTestSet: any;
}

interface TableColumn {
    key: string;
    label: string;
}

const TesteSets: React.FC<Props> = ({
    selectedItem,
    selectedTestSetId,
    refreshTestSets,
    selectedTestSet,
}) => {
    const [isTestActive, setTestActive] = React.useState<boolean>(false);

    const handleTestActive = () => {
        setTestActive(!isTestActive);
    };

    const testSetHeader: TableColumn[] = [
        { key: 'testName', label: 'TestSet Name' },
        { key: 'testsetId', label: 'TestSet Id' },
        { key: 'reqsetId', label: 'ReqSet Id' },
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
            )}
        </div>
    );
};

export default TesteSets;
