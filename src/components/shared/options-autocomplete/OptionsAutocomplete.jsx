import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Group from '@material-ui/icons/Group';
import Person from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import useStyles from './OptionsAutocomplete.styles';
import LockIcon from '../lock-icon/LockIcon';

const idLength = 4;

const OptionsAutocomplete = ({ options, setOptions, setSelectedOption }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setOptions([]);
  };

  const renderGroup = (group) => (
    <Card
      key={group._id}
      className={classes.groupCard}
      onClick={() => handleSelect(group)}
    >
      <Group color="primary" className={classes.typeIcon} />
      <Typography className={classes.groupTitle}>
        <strong>
          {group.name}
          {' #'}
          {group._id.substr(-idLength)}
        </strong>
      </Typography>

      <div className={classes.groupInfo}>
        <LockIcon type={group.type} />
        <Typography className={classes.groupAmount}>
          {group.users.length === 1 ? (
            t('title.oneMember')
          ) : (
            <>{`${group.users.length} ${t('title.members')}`}</>
          )}
        </Typography>
      </div>
    </Card>
  );

  const renderUser = (user) => (
    <Card
      key={user.id}
      className={classes.optionCard}
      onClick={() => handleSelect(user)}
    >
      <Person color="primary" className={classes.typeIcon} />
      <Typography className={classes.optionContent}>
        <strong>
          {user.firstName}
          {' '}
          {user.lastName}
        </strong>
        {'- '}
        {user.hierarchyFlat}
      </Typography>
    </Card>
  );

  const renderOptions = () => options.map((option) => ('users' in option ? renderGroup : renderUser)(option));

  return (
    options.length > 0 && (
      <div className={classes.root}>
        <hr className={classes.divider} />
        <div className={classes.optionsList}>{renderOptions()}</div>
      </div>
    )
  );
};

export default OptionsAutocomplete;
