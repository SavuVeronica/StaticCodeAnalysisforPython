import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';

const categories = ['Bug', 'Vulnerability', 'Code Smell'];

export default function ExcludeCategoriesDialogSonar({ onClose, onCancel, open }) {
  const [prevChecked, setPrevChecked] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setHasChanges(true);
  };

  useEffect(() => {
    if(open) {
      setPrevChecked([...checked]);
      setHasChanges(false);
    } 
  }, [open]);

  const handleClose = () => {
    onClose(checked);
  };

  const handleCancel = () => {
    if(hasChanges) {
      setChecked(prevChecked);
    }
    onCancel();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose Categories</DialogTitle>
      <List sx={{ pt: 0 }}>
        {categories.map((category) => {
          const labelId = `checkbox-list-label-${category}`;
          return (
            <ListItem id={labelId} key={labelId}>
              <ListItemButton role={undefined} onClick={handleToggle(category)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(category) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          )
        }
        )}
      </List>
      <DialogActions>
        <Button onClick={handleClose}>Apply</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

ExcludeCategoriesDialogSonar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};