import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHelmet from '../components/home/HomeHelmet';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import { homePath } from '../utils/RouteUtil';
import useToast from '../components/_hook/useToast';
import { useResetUserPasswordMutation } from '../graphql/mutation/authMutation/ResetUserPasswordMutation';
import { IResetUserPasswordMutationFragmentDefaultFragment } from '../graphql/fragmentType/mutation/authMutation/ResetUserPasswordMutationFragmentInterface';
import { resetUserPasswordMutationFragments } from '../graphql/fragment/mutation/authMutation/ResetUserPasswordMutationFragment';
import useRouter from '../components/_hook/useRouter';
import useForm from '../components/_hook/useForm';
import ButtonSubmit from '../components/ButtonSubmit';

export default function ResetPassword() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    value,
    error,
    setValue,
    validate,
    checkApolloError,
    setError
  } = useForm({
    password: {
      value: '',
      emptyMessage: t('please enter password')
    },
    confirmPassword: {
      value: '',
      emptyMessage: t('please enter confirm password')
    },
    token: {
      value: ''
    }
  });

  const [token, setToken] = useState<string>('');
  const [isResetPasswordCompleted, setIsResetPasswordCompleted] = useState<
    boolean
  >(false);
  const { location, history } = useRouter();
  const [
    resetUserPasswordMutation,
    { loading: isResetingUserPasswordMutation }
  ] = useResetUserPasswordMutation<
    IResetUserPasswordMutationFragmentDefaultFragment
  >(resetUserPasswordMutationFragments.DefaultFragment, {
    onCompleted: () => {
      setIsResetPasswordCompleted(true);
      toast.default(
        t(
          'you password has been reset successfully, you can sign in with your new password now'
        ),
        {
          autoHideDuration: 15000
        }
      );
    },
    onError: error => {
      checkApolloError(error);
    }
  });

  useEffect(() => {
    let urlParams = new URLSearchParams(location.search);
    if (urlParams.has('token')) {
      setToken(urlParams.get('token') || '');
    } else {
      history.push(homePath('home'));
    }
  }, [location.search]);

  function isConfirmPasswordValid() {
    if (value.password !== value.confirmPassword) {
      setError(
        'confirmPassword',
        t('password does not match the confirm password')
      );
      return false;
    }
    return true;
  }

  async function onClickResetPassword() {
    if (validate() && isConfirmPasswordValid()) {
      resetUserPasswordMutation({
        variables: {
          token: token,
          password: value.password
        }
      });
    }
  }

  return (
    <>
      <HomeHelmet
        title={t('reset password')}
        description={'reset password'}
        keywords={t('reset password')}
        ogImage="/images/favicon-228.png"
      />
      <Grid container item direction="row" justify={'center'} xs={12}>
        <Grid container item xs={10} sm={8} md={6} lg={4} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align={'center'}>
              {t('reset password')}
            </Typography>
          </Grid>
          {!isResetPasswordCompleted && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1" align={'center'}>
                  {t(
                    'please enter your new password to reset your account password'
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  error={Boolean(error.password)}
                  label={t('password')}
                  value={value.password}
                  onChange={e => {
                    setValue('password', e.target.value);
                  }}
                  helperText={error.password}
                  margin={'dense'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  error={Boolean(error.confirmPassword)}
                  label={t('confirm password')}
                  value={value.confirmPassword}
                  onChange={e => {
                    setValue('confirmPassword', e.target.value);
                  }}
                  helperText={error.confirmPassword}
                  margin={'dense'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {Boolean(error.token) && (
                  <FormHelperText error>{error.token}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <ButtonSubmit
                  onClick={onClickResetPassword}
                  variant="contained"
                  color="primary"
                  fullWidth
                  size={'large'}
                  loading={isResetingUserPasswordMutation}
                  loadingLabel={t('resetting')}
                  label={t('reset password')}
                />
              </Grid>
            </>
          )}
          {isResetPasswordCompleted && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1" align={'center'}>
                  {t(
                    'you password has been reset successfully, click the button below to return to home page'
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size={'large'}
                  {...({ component: Link, to: homePath('home') } as any)}
                >
                  {t('back to home')}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
