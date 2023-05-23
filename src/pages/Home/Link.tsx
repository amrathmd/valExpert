import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
type Props = {
    page: string;
    selectedPage: string;
    setSelectedPage: (value: string) => void;
};

const Link = ({ page, selectedPage, setSelectedPage }: Props) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, ' ');
    return (
        <AnchorLink
            className={`${selectedPage === lowerCasePage ? 'text-red-600' : ''} 
        transition duration-700 hover:text-red-800
    `}
            href={`#${lowerCasePage}`}
            onClick={() => setSelectedPage(lowerCasePage)}
        >
            {page}
        </AnchorLink>
    );
};

export default Link;
