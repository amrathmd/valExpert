import { useState } from 'react';
import React from 'react';
import Link from './Link';
type Props = {
    isTopOfPage: boolean;
    selectedPage: string;
    setSelectedPage: (value: string) => void;
};

const Homenav = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
    const flexBetween = 'flex items-center justify-between';
    const navbarBackground = isTopOfPage ? '' : 'bg-primary-100 drop-shadow';
    const [highlighted, setHighlighted] = useState(true);
    const highlightSearchBar = () => {
        setHighlighted(true);
    };
    const removeHighlight = () => {
        setHighlighted(false);
    };
    return (
        <nav>
            <div
                className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-4`}
            >
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        {/*left side*/}
                        <h1>ValExpert</h1>
                        {/*right side*/}

                        <div className={`${flexBetween} w-full`}>
                            <div className={`${flexBetween} gap-10 `}></div>
                            <div className={`${flexBetween} gap-10`}>
                                <Link
                                    page="Login"
                                    selectedPage={selectedPage}
                                    setSelectedPage={setSelectedPage}
                                />
                                <div
                                    onMouseEnter={highlightSearchBar}
                                    onMouseLeave={removeHighlight}
                                    className={'highlight'}
                                >
                                    <input
                                        type="search"
                                        id="searchInput"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Homenav;
