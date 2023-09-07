import { CircularProgress } from '@mui/material';
import React from 'react';

const LoadingPdf = () => {
    return (
        <div className="blur-background">
            <div className="pdfSection">
                <CircularProgress />
                <h2 className="loadingMessage">Downloading please wait...</h2>
            </div>
        </div>
    );
};
export default LoadingPdf;
