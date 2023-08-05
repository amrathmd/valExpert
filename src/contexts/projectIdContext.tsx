import { createContext, useState } from 'react';
import React, { ReactNode } from 'react';

interface ProjectIdProviderProps {
    children: ReactNode;
}

const projectIdContext = createContext<any>(null);

export const projectIdProvider = ({ children }: ProjectIdProviderProps) => {
    const [projectIdState, setProjectIdState] = useState<number>(2);

    return (
        <projectIdContext.Provider
            value={{ projectIdState, setProjectIdState }}
        >
            {children}
        </projectIdContext.Provider>
    );
};

export default projectIdContext;
