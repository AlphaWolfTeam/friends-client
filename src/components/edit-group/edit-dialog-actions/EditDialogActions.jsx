import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import refreshDataContext from '../../../stores/refreshDataStore';
import CustomeSnackbarContent from '../../shared/custome-snackbar-content/CustomeSnackbarContent';
import AlertDialogTemplate from '../../shared/alert-dialog-template/AlertDialogTemplate';
// import GroupsService from '../../../services/GroupsService';
import GroupsService from '../../../services/Mock/GroupsService';
import CustomeBackdrop from '../../shared/custome-backdrop/CustomeBackdrop';

const EditDialogActions = ({ group }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const refreshData = useContext(refreshDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogDeleteAnswer, setDialogDeleteAnswer] = useState(undefined);
  const [openAlertDeleteDialog, setOpenAlertDeleteDialog] = useState(false);

  useEffect(async () => {
    if (dialogDeleteAnswer === 'agree') {
      setIsLoading(true);
      GroupsService.deleteGroup(group._id)
        .then(() => {
          // TODO: Update only
          refreshData();
        })
        .catch(() => {
          setIsLoading(false);
          enqueueSnackbar(
            <CustomeSnackbarContent message={t('error.server')} />,
            { variant: 'error' },
          );
        });
    }
  }, [dialogDeleteAnswer]);

  const handleDeleteGroup = () => {
    setOpenAlertDeleteDialog(true);
  };

  return (
    <>
      <Button onClick={() => handleDeleteGroup()}>
        {t('button.deleteGroup')}
      </Button>
      <AlertDialogTemplate
        message={t('alertMessage.deleteGroup')}
        open={openAlertDeleteDialog}
        onClose={() => setOpenAlertDeleteDialog(false)}
        handleAnswer={(answer) => setDialogDeleteAnswer(answer)}
        preferredAnswer="disagree"
      />
      <CustomeBackdrop open={isLoading} />
    </>
  );
};

export default EditDialogActions;