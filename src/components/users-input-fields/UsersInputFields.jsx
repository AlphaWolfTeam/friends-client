import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import useStyles from './UsersInputFields.styles';
import UserRaw from '../user-raw/UserRaw';
import EditableUserRaw from '../editable-user-raw/EditableUserRaw';
import AddUserSearchBar from '../add-user-search-bar/AddUserSearchBar';
// import GroupsService from '../../services/GroupsService';
import GroupsService from '../../services/Mock/GroupsService';
import userContext from '../../stores/userStore';
import { getRole } from '../../utils/sharedFunctions';

const UserInputFields = ({
  groupUsers,
  onAdd,
  onRemove,
  onChangeRole,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useContext(userContext);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const usersListToEdit = useMemo(
    () => groupUsers.filter((userObject) => userObject.user.id !== currentUser.genesisId),
    [groupUsers, currentUser],
  );

  const sortedUsers = useMemo(() => usersListToEdit.sort((firstUser, secondUser) => {
    return secondUser.role - firstUser.role;
  }), [usersListToEdit]);

  useEffect(() => {
    if (selectedUser) {
      if (!GroupsService.isUserExist(groupUsers, selectedUser.id)) {
        onAdd(selectedUser, getRole('member').value);
        setSelectedUser(undefined);
      } else {
        enqueueSnackbar(t('error.userAlreadyExist'));
      }
    }
  }, [selectedUser]);

  const renderCurrentUserField = () => (
    <div className={classes.field}>
      <UserRaw
        userObject={{
          user: {
            id: currentUser.genesisId,
            fullName: `${currentUser.name.firstName} ${currentUser.name.lastName}`,
          },
          role: getRole('manager').value,
        }}
      />
    </div>
  );

  const renderUserInputField = (userObject) => (
    <div key={userObject.user.id} className={classes.field}>
      <EditableUserRaw
        userObject={userObject}
        onRemove={() => onRemove(userObject)}
        onChangeRole={(newRole) => onChangeRole(userObject, newRole)}
      />
    </div>
  );

  return (
    <div className={classes.root}>
      <AddUserSearchBar setSelectedUser={setSelectedUser} />
      <div className={classes.scrollBar}>
        <div className={classes.fieldList}>
          {renderCurrentUserField()}
          {sortedUsers.length > 0 ? sortedUsers.map((user) => (
            renderUserInputField(user)
          ))
            : (
              <Typography className={classes.message}>
                {t('message.noMembersFound')}
              </Typography>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserInputFields;