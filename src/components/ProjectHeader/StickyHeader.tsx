import React from 'react';
import './stickyHeader.css';

const StickyHeader = () => {
    return (
        <div className="fixing">
            <div className="sticky-header">
                <div className="project-title">
                    <img src="../../public/logo.png" alt="" />
                </div>
            </div>
            <div className="title-underline"></div>
        </div>
    );
};

export default StickyHeader;
