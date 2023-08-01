import { createContext, useState } from 'react';
import React from 'react';

const DashboardContext = createContext(null);

export const DashboardContextProvider = (props: any) => {
    const [dashboardState, setDashboardState] = React.useState(2);

    return (
        <DashboardContext.Provider
            value={{ dashboardState, setDashboardState }}
        >
            {props.children}
        </DashboardContext.Provider>
    );
};

export default DashboardContext;
