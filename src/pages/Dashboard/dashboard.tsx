import DashboardContext from "../../contexts/dashboardContext";
import { useContext } from 'react';
import Browse  from "../Browse/Browse";
import ProjectDashboard from "../ProjectDashboard/ProjectDashboard";
import React from "react";
const Dashboard = ()=>{
    const { dashboardState,setDashboardState } = useContext(DashboardContext);
    console.log(dashboardState);

    return (
      <>
      {dashboardState === 1 && <Browse />}
      {dashboardState ===  0 && <ProjectDashboard/>}
      </>

    );
}
export default Dashboard;