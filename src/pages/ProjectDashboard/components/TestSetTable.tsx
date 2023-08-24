import { Tooltip } from '@mui/material';
import React from 'react';
import TestScript from '../../../components/Models/testScriptsmodel';
import './TestSetTable.css';
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
        <section className={`testset-section`}>
            {testSets.length !== 0 &&
                testSets.map((item) => (
                    <div key={item._id} className="testSet-main">
                        <div className="testSet-card" key={item._id}>
                            <div className="testSet-image">
                                <img
                                    src={'../../../public/projectdoc.png'}
                                    alt=""
                                    className="iconimg"
                                />
                                <div className="iconimg-small">
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
                            <div className="project-description">
                                <b>{item.testSetName}</b>
                                <p className="paragraph">
                                    Category:{item.category}
                                </p>
                                <p className="paragraph">
                                    Completion Date{': '}
                                    {formatDate(item.createdAt)}
                                </p>
                                <p className="paragraph">
                                    Status: {item.status}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </section>
    );
};
export default TestSetTable;
