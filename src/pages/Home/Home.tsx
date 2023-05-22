import React from 'react';
import { ErrorBoundary, Navbar } from '../../components';
import './Home.css';
const Home = () => {
    return (
        <ErrorBoundary>
            <div className="home">This is home page</div>
        </ErrorBoundary>
    );
};

export default Home;
