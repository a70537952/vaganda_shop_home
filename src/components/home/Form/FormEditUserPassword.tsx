import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import update from 'immutability-helper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useUpdateUserPasswordMutation } from '../../../graphql/mutation/userMutation/UpdateUserPasswordMutation';
import { updateUserPasswordMutationFragments } from '../../../graphql/fragment/mutation/userMutation/UpdateUserPasswordMutationFragment';
import { IUpdateUserPasswordMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/userMutation/UpdateUserPasswordMutationFragmentInterface';
import useToast from '../../_hook/useToast';
import useForm from '../../_hook/useForm';
import ButtonSubmit from '../../ButtonSubmit';

interface IProps {
  title?: string;
  onUpdated?: () => void;
  className?: any;
}

export default function FormEditUserPassword(props: IProps) {
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
    currentPassword: {
      value: '',
      emptyMessage: t('please enter your current password')
    },
    newPassword: {
      value: '',
      emptyMessage: t('please enter your new password')
    },
    confirmPassword: {
      value: '',
      emptyMessage: t('please enter your confirm password')
    }
  });

  const [
    updateUserPasswordMutation,
    { loading: isUpdatingUserPasswordMutation }
  ] = useUpdateUserPasswordMutation<
    IUpdateUserPasswordMutationFragmentDefaultFragment
  >(updateUserPasswordMutationFragments.DefaultFragment, {
    onCompleted: () => {
      toast.default(t('your password has been successfully updated'));
      if (props.onUpdated) {
        props.onUpdated();
      }
    },
    onError: error => {
      checkApolloError(error);
    }
  });

  function onClickUpdateUserPassword() {
    if (validate()) {
      if (value.newPassword !== value.confirmPassword) {
        setError(
          'confirmPassword',
          t('confirm password does not match new password')
        );
      } else {
        updateUserPasswordMutation({
          variables: {
            currentPassword: value.currentPassword,
            newPassword: value.newPassword
          }
        });
      }
    }
  }

  const { title, className } = props;

  return (
    <Grid
      container
      item
      direction="row"
      justify="center"
      alignItems="center"
      xs={12}
      className={className}
      spacing={3}
    >
      {title && (
        <Grid item xs={12}>
          <Typography
            component="p"
            variant="h6"
            color="inherit"
            align="center"
            style={{ textTransform: 'capitalize' }}
          >
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          type="password"
          error={Boolean(error.currentPassword)}
          label={t('current password')}
          value={value.currentPassword}
          onChange={e => {
            setValue('currentPassword', e.target.value);
          }}
          helperText={error.currentPassword}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="password"
          error={Boolean(error.newPassword)}
          label={t('new password')}
          value={value.newPassword}
          onChange={e => {
            setValue('newPassword', e.target.value);
          }}
          helperText={error.newPassword}
          margin="normal"
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
          margin="normal"
          fullWidth
        />
      </Grid>

      <Grid container item justify="flex-end">
        <ButtonSubmit
          onClick={onClickUpdateUserPassword}
          variant="contained"
          color="primary"
          loading={isUpdatingUserPasswordMutation}
          loadingLabel={t('updating')}
          label={t('update')}
        />
      </Grid>
    </Grid>
  );
}
