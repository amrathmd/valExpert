import { createContext, useState } from 'react';
import React from 'react';

const DashboardContext = createContext(null);

export const DashboardContextProvider = (props: any) => {
    const [dashboardState, setDashboardState] = React.useState(2);
    const [projectId, setProjectId] = React.useState<string | null>(null);

    return (
        <DashboardContext.Provider
            value={{
                dashboardState,
                setDashboardState,
                projectId,
                setProjectId,
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    );
};

export default DashboardContext;
