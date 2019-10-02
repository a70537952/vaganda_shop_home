import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useApolloClient } from 'react-apollo';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { useSignUpUserMutation } from '../../../graphql/mutation/authMutation/SignUpUserMutation';
import { userQuery } from '../../../graphql/query/UserQuery';
import { WithPagination } from '../../../graphql/query/Query';
import { IUserFragmentFormSignUp } from '../../../graphql/fragmentType/query/UserFragmentInterface';
import { userFragments } from '../../../graphql/fragment/query/UserFragment';
import { signUpUserMutationFragments } from '../../../graphql/fragment/mutation/authMutation/SignUpUserMutationFragment';
import { ISignUpUserMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/authMutation/SignUpUserMutationFragmentInterface';
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
  },
  containerLogin: {
    marginTop: theme.spacing(2)
  }
}));

export default function FormSignUp(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { toast } = useToast();
  const {
    value,
    error,
    setValue,
    validate,
    checkApolloError,
    setError
  } = useForm({
    username: {
      value: '',
      emptyMessage: t('please enter username')
    },
    email: {
      value: '',
      emptyMessage: t('please enter email')
    },
    password: {
      value: '',
      emptyMessage: t('please enter password')
    },
    confirmPassword: {
      value: '',
      emptyMessage: t('please enter confirm password')
    }
  });

  const [
    signUpUserMutation,
    { loading: isSigningUpUserMutation }
  ] = useSignUpUserMutation<ISignUpUserMutationFragmentDefaultFragment>(
    signUpUserMutationFragments.DefaultFragment,
    {
      onCompleted: () => {
        toast.default(
          t(
            'we have send verification email to your email address. please look for the verification email in your inbox and click the link in that email.'
          ),
          {
            autoHideDuration: 30000
          }
        );
        onLoginClick();
      },
      onError: error => {
        checkApolloError(error);
      }
    }
  );

  async function onClickSignUp() {
    if (await checkSignUpField()) {
      signUpUserMutation({
        variables: {
          username: value.username,
          email: value.email,
          password: value.password
        }
      });
    }
  }

  async function checkSignUpField() {
    let isInfoValid = validate();
    if (isInfoValid) {
      isInfoValid =
        (await isUsernameValid()) &&
        (await isEmailValid()) &&
        (await isConfirmPasswordValid());
    }

    return isInfoValid;
  }

  function isUsernameValid() {
    if (value.username !== '') {
      return client
        .query<{ user: WithPagination<IUserFragmentFormSignUp> }>({
          query: userQuery(userFragments.FormSignUp),
          variables: { username: value.username }
        })
        .then(({ data }) => {
          let isUsernameValid = !(data.user.items.length > 0);
          setError(
            'username',
            isUsernameValid ? '' : t('this username already exists')
          );
          return isUsernameValid;
        });
    }
    return false;
  }

  function isEmailValid() {
    if (value.email !== '') {
      return client
        .query<{ user: WithPagination<IUserFragmentFormSignUp> }>({
          query: userQuery(userFragments.FormSignUp),
          variables: { email: value.email }
        })
        .then(({ data }) => {
          let isEmailValid = !(data.user.items.length > 0);
          setError('email', isEmailValid ? '' : t('this email already exists'));
          return isEmailValid;
        });
    }
    return false;
  }

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

  let { onLoginClick } = props;

  return (
    <Grid container item xs={10} spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6" align={'center'}>
          {t('sign up')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name={'username'}
          error={Boolean(error.username)}
          label={t('username')}
          value={value.username}
          onChange={e => {
            setValue('username', e.target.value);
          }}
          helperText={error.username}
          margin={'dense'}
          fullWidth
          onBlur={isUsernameValid}
        />
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
          onBlur={isEmailValid}
          helperText={error.email}
          margin={'dense'}
          fullWidth
        />
        <FormHelperText error={false}>
          {t(
            'your email will receive notification and used to reset you password when you forgot your account password'
          )}
        </FormHelperText>
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
        <ButtonSubmit
          fullWidth
          onClick={onClickSignUp}
          variant="contained"
          color="primary"
          loading={isSigningUpUserMutation}
          loadingLabel={t('signing up')}
          size={'large'}
          label={t('sign up')}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justify={'center'}
        className={classes.containerLogin}
      >
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
