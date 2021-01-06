import React, {
  useContext, useState, useEffect,
} from 'react';
import { Info, People, Close } from '@material-ui/icons';
import {
  Button,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles from './GroupDialog.styles';
import LockIcon from '../../components/lock-icon/LockIcon';
import DialogTemplate from '../../components/dialog-template/DialogTemplate';
import EditGroupDialog from '../edit-group-dialog/EditGroupDialog';
import userContext from '../../stores/userStore';
import refreshDataContext from '../../stores/refreshDataStore';
import TagsList from '../../components/tags-list/TagsList';
import UsersList from '../../components/users-list/UsersList';
import GroupService from '../../services/GroupsService';
import AlertDialogTemplate from '../../components/alert-dialog-template/AlertDialogTemplate';
import config from '../../appConf';
import AlertMessageTemplate from '../../components/alert-message-template/AlertMessageTemplate';

const { getRole } = config;

const getManagersCount = (groupsUsers) => groupsUsers.filter(
  (user) => user.role === getRole('manager').code,
).length;

const GroupDialog = ({
  group,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const currentUser = useContext(userContext);
  const refreshData = useContext(refreshDataContext);
  const [openEditGroupDialog, setOpenEditGroupDialog] = useState(false);
  const [openAlertLeaveDialog, setOpenAlertLeaveDialog] = useState(false);
  const [openAlertLeaveMessage, setOpenAlertLeaveMessage] = useState(false);
  const [openAlertDeleteDialog, setOpenAlertDeleteDialog] = useState(false);
  const [dialogLeaveAnswer, setDialogLeaveAnswer] = useState(undefined);
  const [dialogDeleteAnswer, setDialogDeleteAnswer] = useState(undefined);
  const currentUserRole = GroupService.getUserRoleCodeFromPopulatedGroup(
    group,
    currentUser.genesisId,
  );

  const handleEditGroup = () => {
    setOpenEditGroupDialog(true);
  };

  useEffect(async () => {
    // TODO: Add loader
    if (dialogLeaveAnswer === 'agree') {
      await GroupService.removeUserFromGroup(group._id, currentUser.genesisId);
      // TODO: Update only
      refreshData();
      onClose();
    }
  }, [dialogLeaveAnswer]);

  useEffect(async () => {
    // TODO: Add loader
    if (dialogDeleteAnswer === 'agree') {
      await GroupService.deleteGroup(group._id);
      // TODO: Update only
      refreshData();
      onClose();
    }
  }, [dialogDeleteAnswer]);

  const handleLeaveGroup = () => {
    if (group.users.length === 1) {
      setOpenAlertDeleteDialog(true);
    } else if (currentUserRole === getRole('manager').code
      && getManagersCount(group.users) === 1) {
      setOpenAlertLeaveMessage(true);
    } else {
      setOpenAlertLeaveDialog(true);
    }
  };

  const dialogTitle = (
    <>
      <div className={classes.groupIcon}>
        <img className={classes.img} src={group.icon} alt="icon" />
      </div>
      <div className={classes.groupTitle}>
        <Tooltip title={group.name}>
          <Typography className={classes.groupName}>
            {group.name}
          </Typography>
        </Tooltip>
        <Typography className={classes.groupId}>
          #
          {group._id.slice(0, 4)}
        </Typography>
        <LockIcon type={group.type} />
      </div>
    </>
  );

  const dialogContent = (
    <div className={classes.content}>
      <Typography className={classes.title}>
        <Info className={classes.titleIcon} />
        {t('title.description')}
      </Typography>
      <Typography className={classes.groupDescription}>
        {group.description}
      </Typography>
      <hr className={classes.divider} />
      {group.tags.length > 0 && (
        <>
          <TagsList tags={group.tags} />
          <hr className={classes.divider} />
        </>
      )}
      <Typography className={classes.title}>
        <People className={classes.titleIcon} />
        {t('title.friends')}
      </Typography>
      <UsersList users={group.users} />
    </div>
  );

  const dialogActions = (
    <div className={classes.actions}>
      {currentUserRole === getRole('manager').code && (
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => handleEditGroup()}
        >
          {t('button.edit')}
        </Button>
      )}
      {currentUserRole !== undefined && (
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => handleLeaveGroup()}
        >
          {t('button.leaveGroup')}
        </Button>
      )}
    </div>
  );

  const renderGroupDialog = () => (
    <>
      <DialogTemplate
        title={dialogTitle}
        content={dialogContent}
        actions={dialogActions}
        open={open}
        onClose={onClose}
        closeButton={(
          <IconButton onClick={onClose} className={classes.closeButton}>
            <Close />
          </IconButton>
        )}
      />
      <AlertDialogTemplate
        message={t('alertMessage.leaveGroup')}
        open={openAlertLeaveDialog}
        onClose={() => setOpenAlertLeaveDialog(false)}
        handleAnswer={(answer) => setDialogLeaveAnswer(answer)}
        preferredAnswer="disagree"
      />
      <AlertDialogTemplate
        message={t('alertMessage.theGroupWillBeDeleted')}
        open={openAlertDeleteDialog}
        onClose={() => setOpenAlertDeleteDialog(false)}
        handleAnswer={(answer) => setDialogDeleteAnswer(answer)}
        preferredAnswer="disagree"
      />
      <AlertMessageTemplate
        message={t('alertMessage.cantLeaveGroup')}
        open={openAlertLeaveMessage}
        onClose={() => setOpenAlertLeaveMessage(false)}
      />
    </>
  );

  return (
    <>
      {openEditGroupDialog ? (
        <EditGroupDialog
          open={openEditGroupDialog}
          onCancel={() => setOpenEditGroupDialog(false)}
          onClose={() => onClose()}
          group={group}
        />
      ) : renderGroupDialog()}
    </>
  );
};

export default GroupDialog;
