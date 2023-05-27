import React, { useEffect, useState } from 'react';
import { ErrorBoundary, Navbar } from '../../components';
import Homeindex from './Homeindex';

const Home = () => {
    const [selectedPage, setSelectedPage] = useState<string>('Home');
    const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTopOfPage(true);
                setSelectedPage('Home');
            }
            if (window.scrollY !== 0) {
                setIsTopOfPage(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <ErrorBoundary>
            <Homeindex setSelectedPage={setSelectedPage} />
        </ErrorBoundary>
    );
};

export default Home;
