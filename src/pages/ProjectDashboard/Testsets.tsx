import React, { useEffect, useState } from 'react';
import TestForm from './TestForm';
import axios from 'axios';
import { TestScript } from '@/components/Models/testscriptsModel';
import Testscripts from './Testscripts';
import TestscriptsForm from './TestscriptsForm';
interface Props {
    selectedItem: number;
    selectedTestSetId: any;
    refreshTestSets: () => void;
    selectedTestSet: any;
    selectedScripts: number;
    selectedScriptId: any;
    refreshTestScripts: () => void;
    selectedTestScript: any;
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
    selectedScripts,
    selectedScriptId,
    refreshTestScripts,
    selectedTestScript,
}) => {
    const [isTestActive, setTestActive] = React.useState<boolean>(false);
    const [testListState, setTestListState] = React.useState(false);
    const [isScriptFormActive, setScriptFormActive] = useState(false);
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

    const handleScriptFormActive = () => {
        setScriptFormActive(true);
    };
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
                    <button
                        className="create-reqSet-button"
                        onClick={handleScriptFormActive}
                    >
                        Create Script
                    </button>
                </div>
            )}
            {isScriptFormActive && (
                <TestscriptsForm
                    refreshscripts={refreshTestScripts}
                    handleFormActive={handleScriptFormActive}
                    // Pass any necessary props to the TestscriptsForm component
                />
            )}
            <div className="project-dashboard-content">
                <Testscripts
                    selectedItems={selectedScripts}
                    selectedTestscriptId={selectedScriptId}
                    refreshTestScripts={refreshTestScripts}
                    selectedTestScript={selectedTestScript}
                />
            </div>
        </div>
    );
};

export default TesteSets;
