import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import UsersInputFields from '../../shared/users-input-fields/UsersInputFields';
import Paging from '../../shared/paging/Paging';
import {
  setNewGroupUser,
  removeGroupUser,
  setNewGroupUserRole,
  setNewGroupTag,
  removeGroupTag,
} from '../../shared/sharedFunctions';
import EditableGroupDescription from '../editable-group-description/EditableGroupDescription';
import TagsInputFields from '../../shared/tags-input-fields/TagsInputFields';
import GroupsService from '../../../services/GroupsService';
import useStyles from './EditDialogContent.styles';
import CustomeSnackbarContent from '../../shared/custome-snackbar-content/CustomeSnackbarContent';

const EditDialogContent = ({ newGroup, setNewGroup }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [removeUserLoaders, setRemoveUserLoaders] = useState([]);
  const [updateUserLoaders, setUpdateUserLoaders] = useState([]);

  const handleAddUser = (userToAdd, role) => {
    // TODO: Add loader
    GroupsService.addUserToGroup(newGroup._id, { id: userToAdd.id, role })
      .then(() => {
        setNewGroupUser(setNewGroup, userToAdd, role);
      })
      .catch(() => {
        enqueueSnackbar(
          <CustomeSnackbarContent message={t('error.server')} />,
          { variant: 'error' },
        );
      });
  };

  const handleRemoveUser = (userObjectToRemove) => {
    setRemoveUserLoaders((prevValue) => [...prevValue, userObjectToRemove.user.id]);
    GroupsService.removeUserFromGroup(newGroup._id, userObjectToRemove.user.id)
      .then(() => {
        removeGroupUser(setNewGroup, userObjectToRemove);
      })
      .catch(() => {
        enqueueSnackbar(
          <CustomeSnackbarContent message={t('error.server')} />,
          { variant: 'error' },
        );
      }).finally(() => {
        setRemoveUserLoaders((prevValue) => prevValue.filter((id) => (
          id !== userObjectToRemove.user.id)));
      });
  };

  const handleChangeRole = (userObjectToUpdate, newRole) => {
    setUpdateUserLoaders((prevValue) => [...prevValue, userObjectToUpdate.user.id]);
    GroupsService.updateUserRole(newGroup._id, userObjectToUpdate.user.id, newRole)
      .then(() => {
        setNewGroupUserRole(setNewGroup, userObjectToUpdate, newRole);
      })
      .catch(() => {
        enqueueSnackbar(
          <CustomeSnackbarContent message={t('error.server')} />,
          { variant: 'error' },
        );
      }).finally(() => {
        setUpdateUserLoaders((prevValue) => prevValue.filter((id) => (
          id !== userObjectToUpdate.user.id)));
      });
  };

  const handleAddTag = (newTag) => {
    // TODO: Add loader
    GroupsService.addTagToGroup(newGroup._id, newTag)
      .then(() => {
        setNewGroupTag(setNewGroup, newTag);
      })
      .catch(() => {
        enqueueSnackbar(
          <CustomeSnackbarContent message={t('error.server')} />,
          { variant: 'error' },
        );
      });
  };

  const handleRemoveTag = (tagToRemove) => {
    // TODO: Add loader
    GroupsService.removeTagFromGroup(newGroup._id, tagToRemove)
      .then(() => {
        removeGroupTag(setNewGroup, tagToRemove);
      })
      .catch(() => {
        enqueueSnackbar(
          <CustomeSnackbarContent message={t('error.server')} />,
          { variant: 'error' },
        );
      });
  };

  return (
    <Paging pages={[
      <div className={classes.page}>
        <EditableGroupDescription
          group={newGroup}
          setGroup={setNewGroup}
        />
        <TagsInputFields
          tagsList={newGroup.tags}
          onAdd={handleAddTag}
          onRemove={handleRemoveTag}
        />
      </div>,
      <UsersInputFields
        groupUsers={newGroup.users}
        onAdd={handleAddUser}
        onRemove={handleRemoveUser}
        onChangeRole={handleChangeRole}
        removeUserLoaders={removeUserLoaders}
        updateUserLoaders={updateUserLoaders}
      />,
    ]}
    />
  );
};

export default EditDialogContent;
