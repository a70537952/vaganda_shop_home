import Modal from '../../_modal/Modal';
import { makeStyles } from '@material-ui/core/styles/index';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FormEditUserAccount from '../Form/FormEditUserAccount';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

const useStyles = makeStyles({
  content: {
    margin: 0
  }
});

export default function ModalEditUserAccount(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  let { toggle, isOpen } = props;

  return (
    <Modal open={isOpen} onClose={toggle} maxWidth={'sm'} fullWidth>
      <FormEditUserAccount
        onUpdated={toggle}
        title={t('update your account')}
        className={classes.content}
      />
    </Modal>
  );
}
