import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import useStyles from './AddGroupDialog.styles';
import EditableGroupDialogTemplate from '../editable-group-dialog-template/EditableGroupDialogTemplate';
import userContext from '../../stores/userStore';
import refreshDataContext from '../../stores/refreshDataStore';
import config from '../../appConf';
import groupIconsCodes from '../../images/group-icons/group-icons-base64-codes';
import GroupsService from '../../services/GroupsService';

const { getRole } = config;
const DEFAULT_TYPE = 'private';
const DEFAULT_ICON = groupIconsCodes[0];

const AddGroupDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const currentUser = useContext(userContext);
  const refreshData = useContext(refreshDataContext);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    tags: [],
    type: DEFAULT_TYPE,
    users: [
      {
        id: currentUser.id,
        role: getRole('manager').code,
      }],
    icon: DEFAULT_ICON,
  });

  const handleAdd = async () => {
    // TODO: Add validation
    // TODO: Add loader
    await GroupsService.createGroup(newGroup);
    refreshData();
    onClose();
  };

  const dialogActions = () => (
    <>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => handleAdd()}
      >
        הוסף
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => onClose()}
      >
        ביטול
      </Button>
    </>
  );

  return (
    <EditableGroupDialogTemplate
      newGroup={newGroup}
      setNewGroup={setNewGroup}
      actions={dialogActions()}
      open={open}
      onClose={onClose}
    />
  );
};

export default AddGroupDialog;
