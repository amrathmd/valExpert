import React from 'react';
import { ErrorBoundary, Navbar } from '../../components';

const Home = () => {
    return (
        <ErrorBoundary>
            <h1 style={{ marginLeft: 100 }}>
                Welcome to valExpert, We can start now
            </h1>
        </ErrorBoundary>
    );
};

export default Home;
