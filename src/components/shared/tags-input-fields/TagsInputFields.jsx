import React from 'react';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import AddTagInput from '../add-tag-input/AddTagInput';
import DeletableTag from '../deletable-tag/DeletableTag';
import ValidationService from '../../../services/ValidationService';
import useStyles from './TagsInputFields.styles';
import config from '../../../appConf';

const TagsInputFields = ({
  tagsList,
  onAdd,
  onRemove,
  removeTagLoaders,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const isValidated = (newTag) => {
    const validationResult = ValidationService.validateNewGroupTag(
      tagsList,
      newTag,
      config.length_limitations.min_length_tag,
    );
    if (validationResult === null) {
      return true;
    }
    enqueueSnackbar(
      t(`error.${validationResult}`,
        { minTagLength: config.length_limitations.min_length_tag }),
    );
    return false;
  };

  const renderTagsList = () => (
    tagsList.length > 0 ? (
      <>
        {tagsList.map((tag) => (
          <DeletableTag
            tag={tag.label}
            key={tag.label}
            isRemoveLoading={removeTagLoaders && removeTagLoaders.includes(tag.label)}
            onRemove={() => onRemove(tag.label)}
          />
        ))}
      </>
    )
      : (
        <Typography className={classes.message}>
          {t('message.noTagsFound')}
        </Typography>
      )
  );

  return (
    <div className={classes.root}>
      <AddTagInput
        onAdd={onAdd}
        isValidated={isValidated}
      />
      <div className={classes.tagsList}>
        {renderTagsList()}
      </div>
    </div>
  );
};

export default TagsInputFields;
