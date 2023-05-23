import React, { useEffect, useState } from 'react';
import { ErrorBoundary, Navbar } from '../../components';
import Homenav from './Homenav';
import Homeindex from './Homeindex';

const Home = () => {
    const [selectedPage, setSelectedPage] = useState<string>('Home');
    const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = () => {
            //we are at top of page
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
            <Homenav
                isTopOfPage={isTopOfPage}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
            <Homeindex setSelectedPage={setSelectedPage} />
        </ErrorBoundary>
    );
};

export default Home;
