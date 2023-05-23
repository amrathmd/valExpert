import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

type Props = {
    children: React.ReactNode;
    setSelectedPage: (value: string) => void;
};

const ActionButton = ({ children, setSelectedPage }: Props) => {
    return (
        <AnchorLink
            className="rounded-md bg-secondary-500  px-10 py-2 hover:bg-primary-300 hover:text-slate-300"
            onClick={() => setSelectedPage('ContactUs')} //add page
            href={`#${'ContactUs'}`}
        >
            {children}
        </AnchorLink>
    );
};

export default ActionButton;
