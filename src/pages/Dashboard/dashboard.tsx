import DashboardContext from '../../contexts/dashboardContext';
import { useContext } from 'react';
import Dashboard1 from '../ProjectDashboard/ProjectDashboard1';
import React from 'react';
const Dashboard = () => {
    const { dashboardState, setDashboardState } = useContext(DashboardContext);
    console.log(dashboardState);

    return <>{dashboardState === 2 && <Dashboard1 />}</>;
};
export default Dashboard;
