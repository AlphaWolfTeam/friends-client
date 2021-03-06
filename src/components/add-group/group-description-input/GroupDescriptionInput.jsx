import { TextareaAutosize } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { setNewGroupDescription } from '../../shared/sharedFunctions';
import useStyles from './GroupDescriptionInput.styles';

const GroupDescriptionInput = ({ group, setGroup }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleOnChange = (event) => {
    setNewGroupDescription(setGroup, event.target.value);
  };

  return (
    <TextareaAutosize
      cols="5"
      rows={2}
      rowsMax={2}
      placeholder={t('placeholder.description')}
      value={group.description}
      onChange={(e) => handleOnChange(e)}
      className={classes.root}
    />
  );
};

export default GroupDescriptionInput;
