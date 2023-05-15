import React from 'react';
import { ErrorBoundary } from '../../components';

const Home = () => {
    return (
        <ErrorBoundary>
            <h1>Welcome to valExpert, We can start now</h1>
        </ErrorBoundary>
    );
};

export default Home;
