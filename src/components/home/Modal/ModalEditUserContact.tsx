import Modal from '../../_modal/Modal';
import {makeStyles} from '@material-ui/core/styles/index';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FormEditUserContact from '../Form/FormEditUserContact';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

const useStyles = makeStyles({
  content: {
    margin: 0
  }
});

export default function ModalEditUserContact(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  let { toggle, isOpen } = props;

  return (
    <Modal open={isOpen} onClose={toggle} maxWidth={'sm'} fullWidth>
      <FormEditUserContact
        onUpdated={toggle}
        title={t('update your contact')}
        className={classes.content}
      />
    </Modal>
  );
}
