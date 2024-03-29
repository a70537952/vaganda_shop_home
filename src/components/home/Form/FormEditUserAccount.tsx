import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import update from 'immutability-helper';
import React, { useContext } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { AppContext } from '../../../contexts/Context';
import FormUtil from '../../../utils/FormUtil';
import UserAvatar from '../../UserAvatar';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { useUserQuery } from '../../../graphql/query/UserQuery';
import { useUpdateUserInfoMutation } from '../../../graphql/mutation/userInfoMutation/UpdateUserInfoMutation';
import { useChangeUserAvatarMutation } from '../../../graphql/mutation/userInfoMutation/ChangeUserAvatarMutation';
import { useRemoveUserAvatarMutation } from '../../../graphql/mutation/userInfoMutation/RemoveUserAvatarMutation';
import { IUserFragmentFormEditUserAccount } from '../../../graphql/fragmentType/query/UserFragmentInterface';
import { userFragments } from '../../../graphql/fragment/query/UserFragment';
import useToast from '../../_hook/useToast';
import { updateUserInfoMutationFragments } from '../../../graphql/fragment/mutation/userInfoMutation/UpdateUserInfoMutationFragment';
import { IUpdateUserInfoMutationFragmentFormEditUserAccount } from '../../../graphql/fragmentType/mutation/userInfoMutation/UpdateUserInfoMutationFragmentInterface';
import { IChangeUserAvatarMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/userInfoMutation/ChangeUserAvatarMutationFragmentInterface';
import { changeUserAvatarMutationFragments } from '../../../graphql/fragment/mutation/userInfoMutation/ChangeUserAvatarMutationFragment';
import { RemoveUserAvatarMutationFragments } from '../../../graphql/fragment/mutation/userInfoMutation/RemoveUserAvatarMutationFragment';
import { IRemoveUserAvatarMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/userInfoMutation/RemoveUserAvatarMutationFragmentInterface';
import useForm from '../../_hook/useForm';
import ButtonSubmit from '../../ButtonSubmit';

interface IProps {
  title?: string;
  onUpdated?: () => void;
  className?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  inputUploadAvatar: {
    display: 'none'
  },
  imgUploadAvatar: {
    width: 60,
    height: 60,
    margin: theme.spacing(1)
  },
  btnChangeAvatar: {
    margin: theme.spacing(1)
  },
  btnRemoveAvatar: {
    margin: theme.spacing(1)
  }
}));

export default function FormEditUserAccount(props: IProps) {
  const classes = useStyles();
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { toast } = useToast();
  const { value, error, setValue, validate, checkApolloError } = useForm({
    username: {
      value: ''
    },
    name: {
      value: '',
      emptyMessage: t('please enter name')
    },
    gender: {
      value: ''
    }
  });

  const [
    updateUserInfoMutation,
    { loading: isUpdatingUserInfoMutation }
  ] = useUpdateUserInfoMutation<
    IUpdateUserInfoMutationFragmentFormEditUserAccount
  >(updateUserInfoMutationFragments.FormEditUserAccount, {
    onCompleted: () => {
      toast.default(t('your profile has been successfully updated'));
      if (props.onUpdated) {
        props.onUpdated();
      }
      context.getContext();
    },
    onError: error => {
      checkApolloError(error);
    }
  });
  const [
    changeUserAvatarMutation,
    { loading: isChangingUserAvatarMutation }
  ] = useChangeUserAvatarMutation<
    IChangeUserAvatarMutationFragmentDefaultFragment
  >(changeUserAvatarMutationFragments.DefaultFragment, {
    onCompleted: () => {
      context.getContext();
    },
    onError: error => {
      let errorMessage = FormUtil.getValidationErrorByField(
        'userAvatar',
        error
      );
      toast.error(errorMessage);
    }
  });
  const [removeUserAvatarMutation] = useRemoveUserAvatarMutation<
    IRemoveUserAvatarMutationFragmentDefaultFragment
  >(RemoveUserAvatarMutationFragments.DefaultFragment, {
    onCompleted: () => {
      context.getContext();
    }
  });

  const { loading } = useUserQuery<IUserFragmentFormEditUserAccount>(
    userFragments.FormEditUserAccount,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: context.user.id
      },
      onCompleted: data => {
        let newUser = data.user.items[0];
        setValue('username', newUser.username || '');
        setValue('name', newUser.name || '');
        setValue('gender', newUser.user_info.gender || '');
      }
    }
  );

  function onClickUpdateUserInfo() {
    if (validate()) {
      updateUserInfoMutation({
        variables: {
          name: value.name,
          gender: value.gender === '' ? null : value.gender
        }
      });
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
      spacing={3}
      className={className}
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
      <Grid
        container
        item
        direction="row"
        justify="center"
        alignItems="center"
        xs={12}
      >
        {!loading ? (
          <>
            {isChangingUserAvatarMutation ? (
              <CircularProgress className={classes.imgUploadAvatar} />
            ) : (
              <UserAvatar
                user={context.user}
                className={classes.imgUploadAvatar}
              />
            )}
          </>
        ) : (
          <Grid className={classes.imgUploadAvatar}>
            <Skeleton variant={'circle'} height={60} width={60} />
          </Grid>
        )}
        {!loading ? (
          <>
            <input
              multiple={false}
              onChange={e => {
                if (e.target.files) {
                  changeUserAvatarMutation({
                    variables: {
                      userAvatar: e.target.files[0]
                    }
                  });
                }
                e.target.value = '';
              }}
              id="changeAvatarImage"
              accept="image/*"
              type="file"
              className={classes.inputUploadAvatar}
            />
            <label className="label-upload" htmlFor="changeAvatarImage">
              <Button
                className={classes.btnChangeAvatar}
                size="small"
                variant="outlined"
                component="span"
                color="primary"
              >
                {t('change avatar')}
              </Button>
            </label>

            {context.user.user_info.avatar !== null && (
              <label
                onClick={() => {
                  removeUserAvatarMutation();
                }}
              >
                <Button
                  className={classes.btnRemoveAvatar}
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  {t('remove avatar')}
                </Button>
              </label>
            )}
          </>
        ) : (
          <>
            <Grid className={classes.btnChangeAvatar}>
              <Skeleton variant={'rect'} height={40} width={130} />
            </Grid>
            <Grid className={classes.btnChangeAvatar}>
              <Skeleton variant={'rect'} height={40} width={130} />
            </Grid>
          </>
        )}
      </Grid>
      <Grid item xs={10}>
        {!loading ? (
          <TextField
            disabled={true}
            error={Boolean(error.username)}
            label={t('username')}
            value={value.username}
            helperText={error.username}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={10}>
        {!loading ? (
          <TextField
            error={Boolean(error.name)}
            label={t('name')}
            value={value.name}
            onChange={e => {
              setValue('name', e.target.value);
            }}
            helperText={error.name}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={10}>
        {!loading ? (
          <FormControl fullWidth error={Boolean(error.gender)}>
            <InputLabel htmlFor="gender">{t('gender')}</InputLabel>
            <Select
              value={value.gender}
              onChange={e => {
                setValue('gender', e.target.value);
              }}
              inputProps={{
                name: 'gender',
                id: 'gender'
              }}
            >
              <MenuItem value="">
                <em>{t('unspecified')}</em>
              </MenuItem>
              <MenuItem value={1}>{t('male')}</MenuItem>
              <MenuItem value={0}>{t('female')}</MenuItem>
            </Select>
            <FormHelperText>{error.gender}</FormHelperText>
          </FormControl>
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid container item justify="flex-end">
        {!loading ? (
          <ButtonSubmit
            onClick={onClickUpdateUserInfo}
            variant="contained"
            color="primary"
            loading={isUpdatingUserInfoMutation}
            loadingLabel={t('updating')}
            label={t('update')}
          />
        ) : (
          <Skeleton variant={'rect'} height={50} width={100} />
        )}
      </Grid>
    </Grid>
  );
}
