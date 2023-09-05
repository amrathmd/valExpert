import React from 'react';
import './stickyHeader.css';

const StickyHeader = () => {
    return (
        <div className="fixing">
            <div className="sticky-header">
                <div className="project-title">
                    <img src="../../public/logo.png" alt="" />
                </div>
                <div className="project-header-icons">
                    <div className="user-icons">
                        <img src={'../../../public/GroupProf.png'} alt="" />
                    </div>
                    <div className="user-icons">
                        <img src={'../../../public/LogOutImg.png'} alt="" />
                    </div>
                </div>
            </div>
            <div className="title-underline"></div>
        </div>
    );
};

export default StickyHeader;
