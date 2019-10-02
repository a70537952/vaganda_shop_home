import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { useSendResetPasswordEmailMutation } from '../../../graphql/mutation/authMutation/SendResetPasswordEmailMutation';
import { sendResetPasswordEmailMutationFragments } from '../../../graphql/fragment/mutation/authMutation/SendResetPasswordEmailMutationFragment';
import { ISendResetPasswordEmailMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/authMutation/SendResetPasswordEmailMutationFragmentInterface';
import useToast from '../../_hook/useToast';
import useForm from '../../_hook/useForm';
import ButtonSubmit from '../../ButtonSubmit';

interface IProps {
  onLoginClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  login: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginLeft: theme.spacing(1)
  }
}));

export default function FormForgotPassword(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { value, error, setValue, validate, checkApolloError } = useForm({
    email: {
      value: '',
      emptyMessage: t('please enter email')
    }
  });

  const [
    sendResetPasswordEmailMutation,
    { loading: isSendingResetPasswordEmailMutation }
  ] = useSendResetPasswordEmailMutation<
    ISendResetPasswordEmailMutationFragmentDefaultFragment
  >(sendResetPasswordEmailMutationFragments.DefaultFragment, {
    onCompleted: () => {
      toast.default(
        t(
          'we have send a reset password link to your email, please sign in to your email account and check'
        ),
        {
          autoHideDuration: 30000
        }
      );
      props.onLoginClick();
    },
    onError: error => {
      checkApolloError(error);
    }
  });

  function onClickSendResetPasswordEmail() {
    if (validate()) {
      sendResetPasswordEmailMutation({
        variables: {
          email: value.email
        }
      });
    }
  }

  let { onLoginClick } = props;

  return (
    <Grid container item xs={10} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align={'center'} paragraph>
          {t('forgot password?')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align={'center'}>
          {t(
            'if you need help resetting your password, we can help by sending you a link to your email to reset it.'
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name={'email'}
          type={'email'}
          error={Boolean(error.email)}
          label={t('email')}
          value={value.email}
          onChange={e => {
            setValue('email', e.target.value);
          }}
          helperText={error.email}
          margin={'dense'}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonSubmit
          fullWidth
          onClick={onClickSendResetPasswordEmail}
          variant="contained"
          color="primary"
          loading={isSendingResetPasswordEmailMutation}
          loadingLabel={t('sending')}
          label={t('send reset password email')}
        />
      </Grid>
      <Grid item xs={12} container justify={'center'}>
        <Typography variant="body1" display="inline">
          {t('already have an account?')}
        </Typography>
        <Typography
          variant="body1"
          className={classes.login}
          display="inline"
          onClick={onLoginClick}
        >
          {t('sign in')}
        </Typography>
      </Grid>
    </Grid>
  );
}
