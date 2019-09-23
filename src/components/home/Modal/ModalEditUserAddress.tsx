import Modal from '../../_modal/Modal';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FormEditUserAddress from '../Form/FormEditUserAddress';
import {makeStyles} from '@material-ui/core';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

const useStyles = makeStyles({
  content: {
    margin: 0
  }
});

export default function ModalEditUserAddress(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  let { toggle, isOpen } = props;

  return (
    <Modal open={isOpen} onClose={toggle} maxWidth={'sm'} fullWidth>
      <FormEditUserAddress
        title={t('update your address')}
        onUpdated={toggle}
        className={classes.content}
      />
    </Modal>
  );
}
