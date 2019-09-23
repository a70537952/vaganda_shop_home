import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHelmet from '../components/home/HomeHelmet';
import FormUtil, { Fields } from '../utils/FormUtil';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { homePath } from '../utils/RouteUtil';
import useToast from '../components/_hook/useToast';
import { useResetUserPasswordMutation } from '../graphql/mutation/authMutation/ResetUserPasswordMutation';
import { IResetUserPasswordMutationFragmentDefaultFragment } from '../graphql/fragmentType/mutation/authMutation/ResetUserPasswordMutationFragmentInterface';
import { resetUserPasswordMutationFragments } from '../graphql/fragment/mutation/authMutation/ResetUserPasswordMutationFragment';
import useRouter from '../components/_hook/useRouter';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(3)
  },
  buttonResetPassword: {
    marginTop: theme.spacing(2)
  },
  buttonResetPasswordProgress: {
    color: '#fff'
  }
}));

export default function ResetPassword() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { toast } = useToast();

  const resetPasswordFields = [
    {
      field: 'password',
      isCheckEmpty: true,
      emptyMessage: t('please enter password')
    },
    {
      field: 'confirmPassword',
      isCheckEmpty: true,
      emptyMessage: t('please enter confirm password')
    },
    { field: 'token' }
  ];

  const [token, setToken] = useState<string>('');
  const [resetPassword, setResetPassword] = useState<Fields>(
    FormUtil.generateFieldsState(resetPasswordFields)
  );
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
      setResetPassword(
        update(resetPassword, FormUtil.resetFieldsIsValid(resetPasswordFields))
      );

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
      checkResetPasswordField(error);
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

  async function checkResetPasswordField(error?: any) {
    let {
      state: checkedEmptyState,
      isValid: emptyIsValid
    } = FormUtil.generateFieldsEmptyErrorHook(
      resetPasswordFields,
      resetPassword
    );

    let {
      state: checkedErrorState,
      isValid: validationIsValid
    } = FormUtil.validationErrorHandlerHook(
      resetPasswordFields,
      error,
      checkedEmptyState
    );

    setResetPassword(checkedErrorState);

    return emptyIsValid && validationIsValid && isConfirmPasswordValid();
  }

  function isConfirmPasswordValid() {
    if (resetPassword.password.value !== resetPassword.confirmPassword.value) {
      setResetPassword(
        update(resetPassword, {
          confirmPassword: {
            feedback: {
              $set: t('password does not match the confirm password')
            },
            is_valid: { $set: false }
          }
        })
      );
      return false;
    }
    return true;
  }

  async function onClickResetPassword() {
    if (await checkResetPasswordField()) {
      resetUserPasswordMutation({
        variables: {
          token: token,
          password: resetPassword.password.value
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
        <Grid container item xs={10} sm={8} md={6} lg={4}>
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
                  error={!resetPassword.password.is_valid}
                  label={t('password')}
                  value={resetPassword.password.value}
                  onChange={(e: { target: { value: any } }) => {
                    setResetPassword(
                      update(resetPassword, {
                        password: { value: { $set: e.target.value } }
                      })
                    );
                  }}
                  helperText={resetPassword.password.feedback}
                  margin={'dense'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  error={!resetPassword.confirmPassword.is_valid}
                  label={t('confirm password')}
                  value={resetPassword.confirmPassword.value}
                  onChange={(e: { target: { value: any } }) => {
                    setResetPassword(
                      update(resetPassword, {
                        confirmPassword: {
                          value: { $set: e.target.value }
                        }
                      })
                    );
                  }}
                  helperText={resetPassword.confirmPassword.feedback}
                  margin={'dense'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {!resetPassword.token.is_valid && (
                  <FormHelperText error>
                    {resetPassword.token.feedback}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                {isResetingUserPasswordMutation ? (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size={'large'}
                    className={classes.buttonResetPassword}
                  >
                    <CircularProgress
                      size={20}
                      className={classes.buttonResetPasswordProgress}
                    />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size={'large'}
                    className={classes.buttonResetPassword}
                    onClick={onClickResetPassword}
                  >
                    {t('reset password')}
                  </Button>
                )}
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
                  className={classes.buttonResetPassword}
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
