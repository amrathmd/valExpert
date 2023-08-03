// Dashboard.js
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './ProjectDashboard1.css';
import { Collapse, ListItemIcon } from '@mui/material';
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material';
import Requirements from './Requirements/Requirement';
import TestSets from './TestSet/TestSetDetails';
import RequirementSetForm from './Requirements/RequirementSetsForm';

const Dashboard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState(0);
    const [selectedRequirementSet, setSelectedRequirementSet] = useState<
        string | null
    >(null);
    const [requirementSets, setRequirementSets] = useState([]);
    const [requirementSetForm, setRequirementSetForm] = useState<boolean>();
    const handleRequirementSet = () => {
        setRequirementSetForm(!requirementSetForm);
    };

    const handleClick = () => {
        setOpen(!open);
        setSelectedList(1);
    };
    const handleRequirementSetClick = (reqSetId: any) => {
        setSelectedRequirementSet(reqSetId);
    };

    return (
        <div className="projectdashboard">
            <div className="dashboard-sidebar">
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            Project Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Requirement sets" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {requirementSets.map((requirements) => (
                                <ListItemButton
                                    key={requirements._id}
                                    sx={{
                                        pl: 4,
                                        backgroundColor:
                                            selectedRequirementSet ===
                                            requirements._id
                                                ? 'rgba(0, 0, 0, 0.1)'
                                                : 'transparent',
                                    }}
                                    onClick={() =>
                                        handleRequirementSetClick(
                                            requirements._id
                                        )
                                    }
                                >
                                    <ListItemText primary={requirements.name} />
                                </ListItemButton>
                            ))}
                            <ListItemButton
                                sx={{ pl: 3 }}
                                onClick={handleRequirementSet}
                            >
                                <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                >
                                    <Add />
                                    Create Requirement set
                                </Typography>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className="content-bar">
                <Requirements
                    selectedItem={selectedList}
                    selectedRequirementSet={selectedRequirementSet}
                    RequirementSets={requirementSets}
                />
            </div>
            {requirementSetForm && (
                <div className="blur-background">
                    <div className="requirementsetform">
                        <RequirementSetForm
                            handleRequirementSet={handleRequirementSet}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
