import DashboardContext from '../../contexts/dashboardContext';
import { useContext } from 'react';
import Browse from '../Browse/Browse';
import ProjectDashboard from '../ProjectDashboard/ProjectDashboard';
import Dashboard1 from '../ProjectDashboard/ProjectDashboard1';
import React from 'react';
const Dashboard = () => {
    const { dashboardState, setDashboardState } = useContext(DashboardContext);
    console.log(dashboardState);

    return (
        <>
            {dashboardState === 0 && <Browse />}
            {dashboardState === 1 && <ProjectDashboard />}
            {dashboardState === 2 && <Dashboard1 />}
        </>
    );
};
export default Dashboard;
