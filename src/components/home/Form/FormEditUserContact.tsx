import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import EmailIcon from '@material-ui/icons/Email';
import update from 'immutability-helper';
import React, { useContext } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import CountryPhoneCodeSelect from '../../_select/CountryPhoneCodeSelect';
import blue from '@material-ui/core/colors/blue';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { useUserQuery } from '../../../graphql/query/UserQuery';
import { useUpdateUserContactMutation } from '../../../graphql/mutation/userInfoMutation/UpdateUserContactMutation';
import { IUserFragmentFormEditUserContact } from '../../../graphql/fragmentType/query/UserFragmentInterface';
import { userFragments } from '../../../graphql/fragment/query/UserFragment';
import { AppContext } from '../../../contexts/Context';
import useToast from '../../_hook/useToast';
import { IUpdateUserContactMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/userInfoMutation/UpdateUserContactMutationFragmentInterface';
import { updateUserContactMutationFragments } from '../../../graphql/fragment/mutation/userInfoMutation/UpdateUserContactMutationFragment';
import useForm from '../../_hook/useForm';
import ButtonSubmit from '../../ButtonSubmit';

interface IProps {
  title?: string;
  onUpdated?: () => void;
  className?: any;
}

const useStyles = makeStyles({
  textFieldName: {
    minWidth: 230
  },
  buttonUpdateProgress: {
    color: '#fff'
  },
  emailVerifiedChip: {
    width: '100%'
  },
  emailUnverifiedChip: {
    width: '100%',
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700]
    }
  }
});

export default function FormEditUserContact(props: IProps) {
  const classes = useStyles();
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { toast } = useToast();
  const { value, error, setValue, validate, checkApolloError } = useForm({
    is_sign_up_user: {
      value: ''
    },
    email_verified_at: {
      value: ''
    },
    email: {
      value: ''
    },
    phoneCountryCode: {
      value: '',
      emptyMessage: t('please enter phone country code')
    },
    phone: {
      value: '',
      emptyMessage: t('please enter phone')
    }
  });

  const [
    updateUserContactMutation,
    { loading: isUpdatingUserContactMutation }
  ] = useUpdateUserContactMutation<
    IUpdateUserContactMutationFragmentDefaultFragment
  >(updateUserContactMutationFragments.DefaultFragment, {
    onCompleted: () => {
      toast.default(t('your contact has been successfully updated'));
      if (props.onUpdated) {
        props.onUpdated();
      }
      context.getContext();
    },
    onError: error => {
      checkApolloError(error);
    }
  });

  const { loading } = useUserQuery<IUserFragmentFormEditUserContact>(
    userFragments.FormEditUserContact,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: context.user.id
      },
      onCompleted: data => {
        let newUser = data.user.items[0];
        setValue('is_sign_up_user', newUser.is_sign_up_user);
        setValue('email_verified_at', newUser.email_verified_at);
        setValue('email', newUser.email || '');
        setValue(
          'phoneCountryCode',
          newUser.user_info.phone_country_code || ''
        );
        setValue('phone', newUser.user_info.phone || '');
      }
    }
  );

  function onClickUpdateUserContact() {
    if (
      (!value.phoneCountryCode && !value.phone) ||
      (validate('phoneCountryCode') && validate('phone'))
    ) {
      updateUserContactMutation({
        variables: {
          phoneCountryCode: value.phoneCountryCode,
          phone: value.phone
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
      {!loading ? (
        <>
          {Boolean(value.is_sign_up_user) && (
            <Grid item xs={12}>
              <TextField
                disabled
                error={Boolean(error.email)}
                label={t('email')}
                value={value.email}
                onChange={e => {
                  setValue('email', e.target.value);
                }}
                helperText={error.email}
                margin="normal"
                fullWidth
              />
              <FormHelperText error={false}>
                {t(
                  'your email address will be used to receive notification, reset password, receive order invoice and etc'
                )}
              </FormHelperText>
              <FormHelperText error={false}>
                {t(
                  'if you update your email address, you will need to verify your new email address'
                )}
              </FormHelperText>
            </Grid>
          )}
        </>
      ) : (
        <Grid item xs={12}>
          <Skeleton height={50} />
        </Grid>
      )}
      {!loading &&
        Boolean(value.is_sign_up_user) &&
        value.email &&
        value.email_verified_at && (
          <Grid item xs={12}>
            <Chip
              className={classes.emailVerifiedChip}
              icon={<EmailIcon />}
              label={t('email verified')}
              color="primary"
              onDelete={() => {}}
              deleteIcon={<DoneIcon />}
            />
          </Grid>
        )}
      <Grid item xs={12} sm={12} md={6}>
        {!loading ? (
          <CountryPhoneCodeSelect
            error={Boolean(error.phoneCountryCode)}
            helperText={error.phoneCountryCode}
            value={value.phoneCountryCode}
            onChange={(value: unknown) => {
              setValue('phoneCountryCode', value);
            }}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        {!loading ? (
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {value.phoneCountryCode}
                </InputAdornment>
              )
            }}
            error={Boolean(error.phone)}
            label={t('phone')}
            value={value.phone}
            onChange={e => {
              setValue('phone', e.target.value);
            }}
            helperText={error.phone}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid container item justify="flex-end">
        {!loading ? (
          <ButtonSubmit
            onClick={onClickUpdateUserContact}
            variant="contained"
            color="primary"
            loading={isUpdatingUserContactMutation}
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
