import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DialogActions } from '@mui/material';
import { FindingsContext } from '../../../contexts/FindingsContext';

async function getProjectRuns(projectId) {
    return fetch('http://localhost:4000/report/project/' + projectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}


export default function ChooseCompareRun({ onClose, onCancel, open }) {

    const { projectId, runId } = React.useContext(FindingsContext);

    const [checked, setChecked] = React.useState([]);
    const [runs, setRuns] = React.useState([]);

    useEffect(async () => {
        var projectRuns = await getProjectRuns(projectId);
        if (projectRuns.length === 1) {
            projectRuns = [];
        }
        else {
            projectRuns = projectRuns.filter(run => run.id !== runId).sort((a, b) => new Date(a.dateTime) < new Date(b.dateTime) ? 1 : -1);
        }
        setRuns(projectRuns);
    }, [projectId, runId]);

    const handleClose = () => {
        onClose(checked);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString();
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose run for comparison</DialogTitle>
            <List sx={{ pt: 0 }}>
                {runs.map((run) => (
                    <ListItem button onClick={() => handleListItemClick(run)} key={run.id}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <DateRangeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={formatTime(run.dateTime)} secondary={formatDate(run.dateTime)} />
                    </ListItem>
                ))}
            </List>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

ChooseCompareRun.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};