import { react_backend_url } from '../../../config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SpecificRequirement.css';
import { Button } from '@mui/material';

const SpecificRequirement = () => {
    const [requirement, setRequirement] = useState(null);
    const { id: reqId } = useParams();

    const handleBackClick = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchRequirement = async () => {
            try {
                const response = await axios.get(
                    `${react_backend_url}/v1/requirements/${reqId}`
                );
                const fetchedRequirement = response.data;
                setRequirement(fetchedRequirement);
            } catch (error) {
                console.error('Error fetching requirement:', error);
            }
        };

        fetchRequirement();
    }, [reqId]);

    return (
        <div className="specificReq-container">
            <h1>Requirement Details</h1>
            <div className="specific-req-details">
                {requirement && (
                    <table className="req-details-table">
                        <tbody>
                            <tr>
                                <th>Requirement ID:</th>
                                <td>{requirement._id}</td>
                            </tr>
                            <tr>
                                <th>Requirement Set ID:</th>
                                <td>{requirement.requirementSetId}</td>
                            </tr>
                            <tr>
                                <th>Requirement Description:</th>
                                <td>{requirement.requirementDescription}</td>
                            </tr>
                            {/* Add more rows for other properties if needed */}
                        </tbody>
                    </table>
                )}
            </div>
            <Button onClick={handleBackClick}>back</Button>
        </div>
    );
};

export default SpecificRequirement;
