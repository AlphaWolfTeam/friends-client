import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { AddPhotoAlternateOutlined } from '@material-ui/icons';
import useStyles from './AddIconButton.styles';

const AddIconButton = ({ iconsOptions, setIconsOptions, setSelectedIcon }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const uploadImage = (imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const newIcon = reader.result;
      if (!iconsOptions.includes(newIcon)) {
        setIconsOptions((prevValue) => [newIcon, ...prevValue]);
      }
      setSelectedIcon(newIcon);
    };
  };

  const handleOnChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      uploadImage(file);
    } else {
      enqueueSnackbar(t('error.file'), { variant: 'error' });
    }
  };

  return (
    <Tooltip title={t('tooltip.addNewPhoto')}>
      <IconButton
        variant="contained"
        component="label"
        className={classes.iconButton}
      >
        <AddPhotoAlternateOutlined className={classes.icon} />
        <input
          accept="image/*"
          type="file"
          hidden
          multiple
          onChange={(e) => handleOnChange(e)}
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddIconButton;
