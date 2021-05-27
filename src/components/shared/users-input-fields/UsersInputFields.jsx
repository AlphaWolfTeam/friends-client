import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import useStyles from './UsersInputFields.styles';
import UserRaw from '../user-raw/UserRaw';
import EditableUserRaw from '../editable-user-raw/EditableUserRaw';
import AddUserSearchBar from '../add-user-search-bar/AddUserSearchBar';
import SearchUserBar from '../search-user-bar/SearchUserBar';
import GroupsService from '../../../services/GroupsService';
import userContext from '../../../stores/userStore';
import config from '../../../appConf';

const UsersInputFields = ({
  groupUsers,
  onAdd,
  onRemove,
  onChangeRole,
  removeUserLoaders,
  updateUserLoaders,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useContext(userContext);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [searchedUsers, setSearchedUsers] = useState(groupUsers);
  const [isModeSearch, setIsModeSearch] = useState(true);

  const updatedUsersList = isModeSearch ? searchedUsers : groupUsers;

  const usersListToEdit = useMemo(
    () => updatedUsersList.filter(({ user }) => user.id !== currentUser.genesisId),
    [groupUsers, currentUser, searchedUsers, isModeSearch],
  );

  const sortedUsers = useMemo(() => usersListToEdit
    .sort((firstUser, secondUser) => secondUser.role - firstUser.role),
  [usersListToEdit]);

  useEffect(() => {
    if (selectedUser) {
      if (!GroupsService.isUserExist(groupUsers, selectedUser.id)) {
        onAdd(selectedUser, config.roles.member_role_value);
        setSelectedUser(undefined);
      } else {
        enqueueSnackbar(t('error.userAlreadyExist'));
      }
    }
  }, [selectedUser]);

  const renderCurrentUserField = () => (
    <div className={classes.field}>
      <UserRaw
        user={{
          id: currentUser.genesisId,
          firstName: currentUser.name.firstName,
          lastName: currentUser.name.lastName,
        }}
        role={config.roles.manager_role_value}
      />
    </div>
  );

  const renderUsersFields = () => (
    updatedUsersList.length > 0 ? sortedUsers.map(({ user, role }) => (
      <div key={user.id} className={classes.field}>
        <EditableUserRaw
          user={user}
          role={role}
          onRemove={() => onRemove(user)}
          onChangeRole={(newRole) => onChangeRole(user, newRole)}
          isRemoveLoading={removeUserLoaders && removeUserLoaders.includes(user.id)}
          isUpdateLoading={updateUserLoaders && updateUserLoaders.includes(user.id)}
        />
      </div>
    ))
      : (
        <Typography className={classes.message}>
          {t('message.noMembersFound')}
        </Typography>
      )
  );

  const SearchBar = isModeSearch ? SearchUserBar : AddUserSearchBar;

  return (
    <div className={classes.root}>
      <div className={classes.inputArea}>
        <ButtonGroup className={classes.buttonGroup} variant="primary" color="primary">
          <Tooltip title={t('tooltip.search')}>
            <Button
              className={`${classes.inputIcon} ${isModeSearch ? classes.active : classes.disabled}`}
              onClick={() => setIsModeSearch(true)}
            >
              <SearchIcon />
            </Button>
          </Tooltip>
          <Tooltip title={t('tooltip.add')}>
            <Button
              className={`${classes.inputIcon} ${!isModeSearch ? classes.active : classes.disabled}`}
              onClick={() => setIsModeSearch(false)}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <SearchBar
          setSelectedUser={setSelectedUser}
          setSearchedUsers={setSearchedUsers}
          groupUsers={groupUsers}
        />
      </div>
      <div className={classes.scrollBar}>
        {searchedUsers.some(({ user }) => user.id === currentUser.genesisId)
          && renderCurrentUserField()}
        {renderUsersFields()}
      </div>
    </div>
  );
};

export default UsersInputFields;
