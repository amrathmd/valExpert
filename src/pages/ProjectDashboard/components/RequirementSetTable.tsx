import { Tooltip } from '@mui/material';
import React from 'react';
import Requirements from '../Requirements/Requirement';
import './RequrementSetTable.css';
interface Requirement {
    _id?: string;
    name: string;
    projectId: string;
    status: string;
    testsetId?: string;
    version: string;
    requirements: string[];
    createdAt: string;
}
interface props {
    requirementSets: Requirement[];
}
const RequirementSetTable: React.FC<props> = ({ requirementSets }) => {
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
    return (
        <section className={`requirements-section`}>
            {requirementSets.length !== 0 &&
                requirementSets.map((item) => (
                    <div key={item._id} className="requirementSet-main">
                        <div className="requirementSet-card" key={item._id}>
                            <div className="requirementSet-image">
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
                            <div className="test-description">
                                <b>{item.name}</b>
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
export default RequirementSetTable;
