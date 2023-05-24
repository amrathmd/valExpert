import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Homeindex.css';
import { Link } from 'react-router-dom';
import ActionButton from './ActionButton';

type Props = {
    setSelectedPage: (value: string) => void;
};

const Homeindex = ({ setSelectedPage }: Props) => {
    return (
        <section id="Home" className="home">
            <div className="container">
                <div className="header">
                    <div className="left-column">
                        <div>
                            <h1 className="title">VALEXPERT</h1>
                        </div>
                        <div>
                            <p className="text">
                                ValExpert is a Manual Testing Application. You
                                can create, run, and generate detailed reports
                                of your test cases and projects here.
                            </p>
                        </div>
                        <div className="action-buttons">
                            <ActionButton setSelectedPage={setSelectedPage}>
                                <Link
                                    to="/other-component"
                                    className="solid-button"
                                >
                                    Create New
                                </Link>
                            </ActionButton>
                            <AnchorLink className="learn-more-link">
                                <p>Learn More</p>
                            </AnchorLink>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="image-container">
                            <img
                                alt="welcome image"
                                src={'../../../public/welcome.png'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homeindex;
