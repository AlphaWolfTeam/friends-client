import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import useStyles from './AddGroupDialog.styles';
import EditableGroupDialogTemplate from '../editable-group-dialog-template/EditableGroupDialogTemplate';
import userContext from '../../stores/userStore';
import config from '../../appConf';
import groupIconsCodes from '../../images/group-icons/group-icons-base64-codes';

const { rolesEnum } = config;
const DEFAULT_TYPE = 'private';
const DEFAULT_ICON = groupIconsCodes[0];

const AddGroupDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const currentUser = useContext(userContext);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    tags: [],
    type: DEFAULT_TYPE,
    users: [{ id: currentUser.id, role: rolesEnum.MANAGER }],
    icon: DEFAULT_ICON,
  });

  const handleAdd = () => {
    // TODO: Add new group
    // TODO: Add validation
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
    />
  );
};

export default AddGroupDialog;