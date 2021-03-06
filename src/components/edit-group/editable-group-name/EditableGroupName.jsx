import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import ValidationService from '../../../services/ValidationService';
import GroupsService from '../../../services/GroupsService';
import { setNewGroupName } from '../../shared/sharedFunctions';
import EditableTextField from '../editable-text-field/EditableTextField';
import config from '../../../appConf';

const GroupNameInput = ({ group, setGroup }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveNewName = (newName) => {
    setIsLoading(true);
    GroupsService.updateGroupDetails(group._id, { ...group, name: newName })
      .then(() => {
        setNewGroupName(setGroup, newName);
        setEditMode(false);
        enqueueSnackbar(t('success.name'), { variant: 'success' });
      }).catch(() => {
        enqueueSnackbar(t('error.server'), { variant: 'error' });
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnSave = (newName) => {
    const validationResult = ValidationService.validateGroupName(
      newName,
      config.length_limitations.min_length_group_name,
    );
    if (validationResult === null) {
      if (group.name !== newName) {
        saveNewName(newName);
      } else {
        setEditMode(false);
      }
    } else {
      enqueueSnackbar(
        t(`validation.${validationResult}`,
          { minGroupNameLength: config.length_limitations.min_length_group_name }),
      );
    }
  };

  return (
    <EditableTextField
      rows={1}
      width="60%"
      placeholder={t('placeholder.name')}
      value={group.name}
      onSave={(value) => handleOnSave(value)}
      editMode={editMode}
      setEditMode={setEditMode}
      isLoading={isLoading}
    />
  );
};

export default GroupNameInput;
