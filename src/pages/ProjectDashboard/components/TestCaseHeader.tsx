import React from 'react';
import { InputAdornment, TextField, Tooltip } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

interface ProjectInterface {
    projectName: string;
    purpose: string;
    status: 'Active' | 'Inactive';
    activationDate: Date;
    inactivationDate: Date;
    facility: string[];
    department: string[];
    country: string[];
    scope?: string[];
    category?: string;
    description: string;
    estimationDate?: Date;
    applicationName?: string;
    applicationVersion?: number;
    changeControlNumber?: string;
    owner?: string;
    requirementsets: string[];
    testsets: string[];
    createdAt: Date;
    updatedAt: Date;
}
interface props {
    project: ProjectInterface;
    handleDownloadPdf: () => void;
    handleTestCaseForm: () => void;
}

const TestCaseHeader: React.FC<props> = ({
    project,
    handleDownloadPdf,
    handleTestCaseForm,
}) => {
    return (
        <div>
            <div className="req-header">
                <div className="req-projectName">
                    <p> Test Set Details</p>
                </div>
                <div className="requirements-icons">
                    <div>
                        <TextField
                            placeholder="Search"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <button>
                        <div className="req-add" onClick={handleTestCaseForm}>
                            <img src={'../../../public/plus.svg'} alt="" />
                            <p>Test case</p>
                        </div>
                    </button>
                    <Tooltip title="Route" placement="top-end">
                        <div className="req-header-icons">
                            <img src={'../../../public/back.png'} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip title="version" placement="top-end">
                        <div className="req-header-icons">
                            <img src={'../../../public/time.png'} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip title="Pdf Download" placement="top-end">
                        <div
                            className="req-header-icons"
                            onClick={handleDownloadPdf}
                        >
                            <img src={'../../../public/pdf.png'} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip title="Print this page" placement="top-end">
                        <div className="req-header-icons">
                            <img src={'../../../public/scanner.png'} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip title="Version" placement="top-end">
                        <div className="req-header-icons">
                            <img src={'../../../public/blocks.png'} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top-end">
                        <div className="req-header-icons">
                            <img src={'../../../public/del.png'} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip title="Edit" placement="top-end">
                        <div className="req-header-icons">
                            <img src={'../../../public/ep_edit.png'} alt="" />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className="req-header-underline"></div>
        </div>
    );
};
export default TestCaseHeader;