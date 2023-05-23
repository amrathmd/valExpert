import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ActionButton from './ActionButton';
type Props = {
    setSelectedPage: (value: string) => void;
};

const Homeindex = ({ setSelectedPage }: Props) => {
    return (
        <section id="Home" className="gap-16  py-10  md:h-full md:pb-0">
            {/* image and content*/}
            <div className="md:flex mx-auto w-5/6 items-center justify-center md:h-64/72">
                {/*main header*/}
                <div className="z-10 mt-32 md:basis-3/5">
                    {/*heading*/}
                    <div className="md:-mt-30 after:absolute after:left-20 ">
                        <div className="relative">
                            <div>
                                <h1 className="text-cyan-900 h-20">
                                    VALEXPERT
                                </h1>
                            </div>
                        </div>
                        <p className="mt-4 text-sm">
                            ValExpert is Manual Testing Applivcation.You can
                            create,run,generate detailed reports of your test
                            cases,projects here.
                        </p>
                    </div>
                    {/*action*/}
                    <div className="mt-6 flex items-center gap-8">
                        <ActionButton setSelectedPage={setSelectedPage}>
                            Create New
                        </ActionButton>
                        <AnchorLink className="text-sm font-bold text-purple-950 underline hover:texr-">
                            <p>Learn More</p>
                        </AnchorLink>
                    </div>
                </div>
                {/*image*/}

                <div
                    className="flex basis-3/5 justify-center md:z-10
            md:ml-40 md:mt-16  md:justify-items-end"
                >
                    <img
                        alt="welcome image"
                        src={'../../../public/welcome.png'}
                    ></img>
                </div>
            </div>
        </section>
    );
};

export default Homeindex;
