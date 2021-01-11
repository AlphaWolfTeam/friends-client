import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import refreshDataContext from '../../stores/refreshDataStore';
import DialogTemplate from '../shared/dialog-template/DialogTemplate';
import IconInput from '../shared/icon-input/IconInput';
import EditableGroupName from './editable-group-name/EditableGroupName';
import LockIconInput from '../shared/lock-icon-input/LockIconInput';
import UsersInputFields from '../shared/users-input-fields/UsersInputFields';
import Paging from '../shared/paging/Paging';
import {
  setNewGroupIcon,
  setNewGroupType,
  setNewGroupUser,
  removeGroupUser,
  setNewGroupUserRole,
  setNewGroupTag,
  removeGroupTag,
} from '../shared/sharedFunctions';
import EditableGroupDescription from
  './editable-group-description/EditableGroupDescription';
import TagsInputFields from '../shared/tags-input-fields/TagsInputFields';
import AlertDialogTemplate from '../shared/alert-dialog-template/AlertDialogTemplate';
// import GroupsService from '../../services/GroupsService';
import GroupsService from '../../services/Mock/GroupsService';
import useStyles from './index.styles';
import CustomeBackdrop from '../shared/custome-backdrop/CustomeBackdrop';
import CustomeSnackbarContent from '../shared/custome-snackbar-content/CustomeSnackbarContent';

const EditGroupDialog = ({
  group, open, onClose,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const refreshData = useContext(refreshDataContext);
  const [openAlertDeleteDialog, setOpenAlertDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLockLoading, setIsLockLoading] = useState(false);
  const [isIconLoading, setIsIconLoading] = useState(false);
  const [dialogDeleteAnswer, setDialogDeleteAnswer] = useState(undefined);
  const [newGroup, setNewGroup] = useState(group);

  useEffect(async () => {
    if (dialogDeleteAnswer === 'agree') {
      setIsLoading(true);
      GroupsService.deleteGroup(group._id)
        .then(() => {
          // TODO: Update only
          refreshData();
        })
        .catch(() => {
          setIsLoading(false);
          enqueueSnackbar(
            <CustomeSnackbarContent message={t('error.server')} />,
            { variant: 'error' },
          );
        });
    }
  }, [dialogDeleteAnswer]);

  const handleDeleteGroup = () => {
    setOpenAlertDeleteDialog(true);
  };

  const renderDialogTitle = () => (
    <>
      <IconInput
        shownIcon={newGroup.icon}
        initialIcon={group.icon}
        onChange={(newIcon) => {
          const prevIcon = newGroup.icon;
          if (prevIcon !== newIcon) {
            setNewGroupIcon(setNewGroup, newIcon);
            setIsIconLoading(true);
            GroupsService.updateGroupDetails(group._id, { ...newGroup, icon: newIcon })
              .catch(() => {
                setNewGroupIcon(setNewGroup, prevIcon);
                enqueueSnackbar(
                  <CustomeSnackbarContent message={t('error.server')} />,
                  { variant: 'error' },
                );
              }).finally(() => {
                setIsIconLoading(false);
              });
          }
        }}
        isLoading={isIconLoading}
      />
      <div className={classes.title}>
        <EditableGroupName group={newGroup} setGroup={setNewGroup} />
        <LockIconInput
          type={newGroup.type}
          onChange={(newType) => {
            setIsLockLoading(true);
            GroupsService.updateGroupDetails(group._id, { ...newGroup, type: newType })
              .then(() => {
                setNewGroupType(setNewGroup, newType);
              })
              .catch(() => {
                enqueueSnackbar(
                  <CustomeSnackbarContent message={t('error.server')} />,
                  { variant: 'error' },
                );
              }).finally(() => {
                setIsLockLoading(false);
              });
          }}
          isLoading={isLockLoading}
        />
      </div>
    </>
  );

  const firstPage = (
    <UsersInputFields
      groupUsers={newGroup.users}
      onAdd={(userToAdd, role) => {
        // TODO: Add loader
        GroupsService.addUserToGroup(group._id, { id: userToAdd.id, role })
          .then(() => {
            setNewGroupUser(setNewGroup, userToAdd, role);
          })
          .catch(() => {
            enqueueSnackbar(
              <CustomeSnackbarContent message={t('error.server')} />,
              { variant: 'error' },
            );
          });
      }}
      onRemove={(userObjectToRemove) => {
        // TODO: Add loader
        GroupsService.removeUserFromGroup(group._id, userObjectToRemove.user.id)
          .then(() => {
            removeGroupUser(setNewGroup, userObjectToRemove);
          })
          .catch(() => {
            enqueueSnackbar(
              <CustomeSnackbarContent message={t('error.server')} />,
              { variant: 'error' },
            );
          });
      }}
      onChangeRole={(userObjectToUpdate, newRole) => {
        // TODO: Add loader
        GroupsService.updateUserRole(group._id, userObjectToUpdate.user.id, newRole)
          .then(() => {
            setNewGroupUserRole(setNewGroup, userObjectToUpdate, newRole);
          })
          .catch(() => {
            enqueueSnackbar(
              <CustomeSnackbarContent message={t('error.server')} />,
              { variant: 'error' },
            );
          });
      }}
    />
  );

  const secondPage = (
    <div className={classes.page}>
      <EditableGroupDescription group={newGroup} setGroup={setNewGroup} />
      <TagsInputFields
        tagsList={newGroup.tags}
        onAdd={(newTag) => {
          // TODO: Add loader
          GroupsService.addTagToGroup(group._id, newTag)
            .then(() => {
              setNewGroupTag(setNewGroup, newTag);
            })
            .catch(() => {
              enqueueSnackbar(
                <CustomeSnackbarContent message={t('error.server')} />,
                { variant: 'error' },
              );
            });
        }}
        onRemove={(tagToRemove) => {
          // TODO: Add loader
          GroupsService.removeTagFromGroup(group._id, tagToRemove)
            .then(() => {
              removeGroupTag(setNewGroup, tagToRemove);
            })
            .catch(() => {
              enqueueSnackbar(
                <CustomeSnackbarContent message={t('error.server')} />,
                { variant: 'error' },
              );
            });
        }}
      />
    </div>
  );

  const renderDialogContent = () => (
    <Paging pages={[firstPage, secondPage]} />
  );

  const renderDialogActions = () => (
    <Button onClick={() => handleDeleteGroup()}>
      {t('button.deleteGroup')}
    </Button>
  );

  return (
    <>
      <DialogTemplate
        title={renderDialogTitle()}
        content={renderDialogContent()}
        actions={renderDialogActions()}
        open={open}
        onClose={() => onClose()}
      />
      <AlertDialogTemplate
        message={t('alertMessage.deleteGroup')}
        open={openAlertDeleteDialog}
        onClose={() => setOpenAlertDeleteDialog(false)}
        handleAnswer={(answer) => setDialogDeleteAnswer(answer)}
        preferredAnswer="disagree"
      />
      <CustomeBackdrop open={isLoading} />
    </>
  );
};

export default EditGroupDialog;