import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '../../_modal/Modal';
import React, { useState } from 'react';
import FormForgotPassword from '../Form/FormForgotPassword';
import FormSignIn from '../Form/FormSignIn';
import FormSignUp from '../Form/FormSignUp';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function ModalLoginRegister(props: IProps) {
  let { toggle, isOpen } = props;
  let [current, setCurrent] = useState<'sign up' | 'forgot password' | 'login'>(
    'login'
  );

  return (
    <Modal
      closeAfterTransition
      disableAutoFocus
      open={isOpen}
      onClose={toggle}
      maxWidth={'sm'}
      fullWidth
    >
      {current === 'login' && (
        <Fade in={current === 'login'} timeout={400}>
          <Grid container item justify={'center'}>
            <FormSignIn
              onSignUpClick={() => {
                setCurrent('sign up');
              }}
              onForgotPasswordClick={() => {
                setCurrent('forgot password');
              }}
            />
          </Grid>
        </Fade>
      )}
      {current === 'sign up' && (
        <Fade in={current === 'sign up'} timeout={400}>
          <Grid container item justify={'center'}>
            <FormSignUp
              onLoginClick={() => {
                setCurrent('login');
              }}
            />
          </Grid>
        </Fade>
      )}
      {current === 'forgot password' && (
        <Fade in={current === 'forgot password'} timeout={400}>
          <Grid container item justify={'center'}>
            <FormForgotPassword
              onLoginClick={() => {
                setCurrent('login');
              }}
            />
          </Grid>
        </Fade>
      )}
    </Modal>
  );
}
