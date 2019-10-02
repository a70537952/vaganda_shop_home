import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import update from 'immutability-helper';
import React, { useContext } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { AppContext } from '../../../contexts/Context';
import CountrySelect from '../../_select/CountrySelect';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useUpdateUserAddressMutation } from '../../../graphql/mutation/userAddressMutation/UpdateUserAddressMutation';
import { useUserAddressQuery } from '../../../graphql/query/UserAddressQuery';
import { IUserAddressFragmentFormEditUserAddress } from '../../../graphql/fragmentType/query/UserAddressFragmentInterface';
import { userAddressFragments } from '../../../graphql/fragment/query/UserAddressFragment';
import useToast from '../../_hook/useToast';
import useForm from '../../_hook/useForm';
import ButtonSubmit from '../../ButtonSubmit';

interface IProps {
  title?: string;
  onUpdated?: () => void;
  className?: any;
}

export default function FormEditUserAddress(props: IProps) {
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { toast } = useToast();
  const { value, error, setValue, checkApolloError } = useForm({
    address_1: {
      value: ''
    },
    address_2: {
      value: ''
    },
    address_3: {
      value: ''
    },
    city: {
      value: ''
    },
    state: {
      value: ''
    },
    postal_code: {
      value: ''
    },
    country: {
      value: ''
    }
  });

  const [
    updateUserAddressMutation,
    { loading: isUpdatingUserAddressMutation }
  ] = useUpdateUserAddressMutation<IUserAddressFragmentFormEditUserAddress>(
    userAddressFragments.FormEditUserAddress,
    {
      onCompleted: () => {
        toast.default(t('your address has been successfully updated'));
        if (props.onUpdated) {
          props.onUpdated();
        }
        context.getContext();
      },
      onError: error => {
        checkApolloError(error);
      }
    }
  );

  const { loading } = useUserAddressQuery<
    IUserAddressFragmentFormEditUserAddress
  >(userAddressFragments.FormEditUserAddress, {
    fetchPolicy: 'network-only',
    variables: {
      user_id: context.user.id
    },
    onCompleted: data => {
      let newUserAddress = data.userAddress.items[0];
      setValue('address_1', newUserAddress.address_1 || '');
      setValue('address_2', newUserAddress.address_2 || '');
      setValue('address_3', newUserAddress.address_3 || '');
      setValue('city', newUserAddress.city || '');
      setValue('state', newUserAddress.state || '');
      setValue('postal_code', newUserAddress.postal_code || '');
      setValue('country', newUserAddress.country || '');
    }
  });

  function onClickUpdateUserAddress() {
    updateUserAddressMutation({
      variables: {
        address_1: value.address_1,
        address_2: value.address_2,
        address_3: value.address_3,
        city: value.city,
        state: value.state,
        postal_code: value.postal_code,
        country: value.country
      }
    });
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
      <Grid item xs={12}>
        {!loading ? (
          <TextField
            error={Boolean(error.address_1)}
            label={t('address 1')}
            value={value.address_1}
            onChange={e => {
              setValue('address_1', e.target.value);
            }}
            helperText={error.address_1}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={12}>
        {!loading ? (
          <TextField
            error={Boolean(error.address_2)}
            label={t('address 2')}
            value={value.address_2}
            onChange={e => {
              setValue('address_2', e.target.value);
            }}
            helperText={error.address_2}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={12}>
        {!loading ? (
          <TextField
            error={Boolean(error.address_3)}
            label={t('address 3')}
            value={value.address_3}
            onChange={e => {
              setValue('address_3', e.target.value);
            }}
            helperText={error.address_3}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>

      <Grid item xs={12} sm={6}>
        {!loading ? (
          <TextField
            error={Boolean(error.city)}
            label={t('city')}
            value={value.city}
            onChange={e => {
              setValue('city', e.target.value);
            }}
            helperText={error.city}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {!loading ? (
          <TextField
            error={Boolean(error.state)}
            label={t('state')}
            value={value.state}
            onChange={e => {
              setValue('state', e.target.value);
            }}
            helperText={error.state}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>

      <Grid item xs={12} sm={6}>
        {!loading ? (
          <TextField
            error={Boolean(error.postal_code)}
            label={t('postal code')}
            value={value.postal_code}
            onChange={e => {
              setValue('postal_code', e.target.value);
            }}
            helperText={error.postal_code}
            margin="normal"
            fullWidth
          />
        ) : (
          <Skeleton height={50} />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {!loading ? (
          <CountrySelect
            error={Boolean(error.country)}
            label={t('country')}
            helperText={error.country}
            value={value.country}
            onChange={(value: unknown) => {
              setValue('country', value);
            }}
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
            onClick={onClickUpdateUserAddress}
            variant="contained"
            color="primary"
            loading={isUpdatingUserAddressMutation}
            loadingLabel={t('updating')}
            label={t('update')}
          />
        ) : (
          <Skeleton variant={'rect'} width={150} height={50} />
        )}
      </Grid>
    </Grid>
  );
}
