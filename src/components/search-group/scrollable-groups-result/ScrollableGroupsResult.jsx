import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { GroupAddOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import GroupsList from '../groups-list/GroupsList';
import GroupsLoader from '../groups-loader/GroupsLoader';
import TextDivider from '../text-divider/TextDivider';
import useStyles from './ScrollableGroupsResult.styles';

const ScrollableGroupsResult = ({
  currentUserGroups,
  privateGroups,
  publicGroups,
  searchValue,
  setOpenAddGroupDialog,
  isLoading,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const noGroupsFound = (
    <Typography className={classes.message}>
      {t('message.noGroupsFound')}
    </Typography>
  );

  const noCurrentUserGroupsFound = (
    <div className={classes.startMessage}>
      {t('message.noCurrentUserGroupsFound')}
      <GroupAddOutlined
        className={classes.button}
        onClick={() => setOpenAddGroupDialog(true)}
      />
    </div>
  );

  const currentUserGroupsList = (
    <>
      <TextDivider text={t('title.currentUserGroups')} />
      <GroupsList groups={currentUserGroups} searchValue={searchValue} />
    </>
  );

  const privateGroupsList = (
    <>
      <TextDivider text={t('title.privateGroups')} />
      <GroupsList groups={privateGroups} searchValue={searchValue} />
    </>
  );

  const publicGroupsList = (
    <>
      <TextDivider text={t('title.publicGroups')} />
      <GroupsList groups={publicGroups} searchValue={searchValue} />
    </>
  );

  const renderGroupsList = () => {
    if (((privateGroups && privateGroups.length === 0)
    && (publicGroups && publicGroups.length === 0))) {
      return noGroupsFound;
    }
    if (currentUserGroups && currentUserGroups.length === 0) {
      return noCurrentUserGroupsFound;
    }
    return (
      <>
        {currentUserGroups && currentUserGroups.length > 0 && (currentUserGroupsList)}
        {privateGroups && privateGroups.length > 0 && (privateGroupsList)}
        {publicGroups && publicGroups.length > 0 && (publicGroupsList)}
      </>
    );
  };

  return (
    <Paper elevation={2} className={classes.root}>
      <div className={classes.scrollBarContent}>
        {isLoading ? <GroupsLoader /> : renderGroupsList()}
      </div>
    </Paper>
  );
};

export default ScrollableGroupsResult;