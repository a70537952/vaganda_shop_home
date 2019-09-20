import React from 'react';

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(),
    { t } = useTranslation();

  function enqueue(message: string, options = {}) {
    // let action = (key: string | number) => (
    // 	<React.Fragment>
    // 		<Button
    // 			onClick={() => {
    // 				closeSnackbar(key)
    // 			}}
    // 			color={'inherit'}>
    // 			{t('close')}
    // 		</Button>
    // 	</React.Fragment>
    // );

    let action = (
      <Button color={'primary'} size="small">
        {t('close')}
      </Button>
    );

    return enqueueSnackbar(message, {
      ...{ action },
      ...options
    });
  }

  function defaultSnackbar(msg: string, options = {}) {
    enqueue(msg, {
      ...{ variant: 'default' },
      ...options
    });
  }

  function success(msg: string, options = {}) {
    enqueue(msg, {
      ...{ variant: 'success' },
      ...options
    });
  }

  function warning(msg: string, options = {}) {
    enqueue(msg, {
      ...{ variant: 'warning' },
      ...options
    });
  }

  function info(msg: string, options = {}) {
    enqueue(msg, {
      ...{ variant: 'info' },
      ...options
    });
  }

  function error(msg: string, options = {}) {
    enqueue(msg, {
      ...{
        variant: 'error',
        autoHideDuration: 5000
      },
      ...options
    });
  }

  return {
    enqueueSnackbar: enqueue,
    closeSnackbar,
    toast: {
      success,
      warning,
      info,
      error,
      default: defaultSnackbar
    }
  };
};

export default useToast;
