import React from 'react';
import { IconButton } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import useStyles from './AddIconButton.styles';

const AddIconButton = ({ iconsOptions, setIconsOptions }) => {
  const classes = useStyles();

  const handleOnChange = async (event) => {
    // TODO: Alert error
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newIcon = reader.result;
        if (!iconsOptions.includes(newIcon)) {
          setIconsOptions((prevValue) => [...prevValue, newIcon]);
        }
      };
    }
  };

  return (
    <IconButton
      variant="contained"
      component="label"
      className={classes.root}
    >
      <AddAPhoto />
      <input
        accept="image/*"
        type="file"
        hidden
        multiple
        onChange={(e) => handleOnChange(e)}
      />
    </IconButton>
  );
};

export default AddIconButton;