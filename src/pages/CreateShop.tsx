import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import { useApolloClient } from 'react-apollo';
import Geolocation from 'react-geolocation';
import Skeleton from '@material-ui/lab/Skeleton';
import CountryPhoneCodeSelect from '../components/_select/CountryPhoneCodeSelect';
import CountrySelect from '../components/_select/CountrySelect';
import CurrencySelect from '../components/_select/CurrencySelect';
import GoogleMap from '../components/GoogleMap';
import GoogleMapMarker from '../components/GoogleMapMarker';
import HomeHelmet from '../components/home/HomeHelmet';
import ShopCategorySelect from '../components/_select/ShopCategorySelect';
import UploadImageMutation from '../components/UploadImageMutation';
import { AppContext } from '../contexts/Context';
import FormUtil from '../utils/FormUtil';
import { useTranslation } from 'react-i18next';
import Image from '../components/Image';
import useToast from '../components/_hook/useToast';
import { shopQuery, ShopVars } from '../graphql/query/ShopQuery';
import { shopFragments } from '../graphql/fragment/query/ShopFragment';
import { IShopFragmentCreateShop } from '../graphql/fragmentType/query/ShopFragmentInterface';
import { WithPagination } from '../graphql/query/Query';
import { useCreateShopMutation } from '../graphql/mutation/shopMutation/CreateShopMutation';
import { createShopMutationFragments } from '../graphql/fragment/mutation/shopMutation/CreateShopMutationFragment';
import { ICreateShopMutationFragmentDefaultFragment } from '../graphql/fragmentType/mutation/shopMutation/CreateShopMutationFragmentInterface';
import useForm from '../components/_hook/useForm';
import ButtonSubmit from '../components/ButtonSubmit';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(3)
  },
  stepper: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  stepButtonContainer: {
    marginTop: theme.spacing(2)
  },
  inputUpload: {
    display: 'none'
  },
  shopLogoContainer: {
    marginTop: theme.spacing(2)
  },
  shopLogo: {
    width: '100%'
  },
  shopBannerContainer: {
    marginTop: theme.spacing(2)
  },
  shopBanner: {
    width: '100%'
  }
}));

export default function CreateShop() {
  const classes = useStyles();
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { toast } = useToast();
  const client = useApolloClient();

  const {
    value: shopSetupValue,
    error: shopSetupError,
    setValue: shopSetupSetValue,
    validate: shopSetupValidate,
    checkApolloError: shopSetupCheckApolloError,
    setError: shopSetupSetError
  } = useForm({
    name: {
      value: '',
      validationField: 'shopSetupName',
      emptyMessage: t('please enter shop name')
    },
    shop_category: {
      value: '',
      validationField: 'shopSetupShopCategory',
      emptyMessage: t('please select shop category')
    },
    shop_currency: {
      value: 'MYR',
      validationField: 'shopSetupShopCurrency',
      emptyMessage: t('please select shop currency')
    },
    has_physical_shop: {
      validationField: 'shopSetupHasPhysicalShop',
      value: true
    }
  });

  const {
    value: shopInfoValue,
    error: shopInfoError,
    setValue: shopInfoSetValue,
    checkApolloError: shopInfoCheckApolloError
  } = useForm({
    summary: {
      value: '',
      validationField: 'shopInfoSummary'
    },
    logo: {
      value: '',
      validationField: 'shopInfoLogo'
    },
    banner: {
      value: '',
      validationField: 'shopInfoBanner'
    }
  });

  const {
    value: shopAddressValue,
    error: shopAddressError,
    setValue: shopAddressSetValue,
    validate: shopAddressValidate,
    checkApolloError: shopAddressCheckApolloError
  } = useForm({
    address_1: {
      value: '',
      validationField: 'shopAddressAddress1',
      emptyMessage: t('please enter shop address')
    },
    address_2: {
      value: '',
      validationField: 'shopAddressAddress2'
    },
    address_3: {
      value: '',
      validationField: 'shopAddressAddress3'
    },
    city: {
      value: '',
      validationField: 'shopAddressCity',
      emptyMessage: t('please enter city')
    },
    state: {
      value: '',
      validationField: 'shopAddressState',
      emptyMessage: t('please enter state')
    },
    postal_code: {
      value: '',
      validationField: 'shopAddressPostalCode',
      emptyMessage: t('please enter postal code')
    },
    country: {
      value: '',
      validationField: 'shopAddressCountry',
      emptyMessage: t('please select country')
    },
    latitude: {
      value: '',
      validationField: 'shopAddressLatitude',
      emptyMessage: t('please mark your shop location')
    },
    longitude: {
      value: '',
      validationField: 'shopAddressLongitude',
      emptyMessage: t('please mark your shop location')
    }
  });

  const {
    value: shopContactValue,
    error: shopContactError,
    setValue: shopContactSetValue,
    validate: shopContactValidate,
    checkApolloError: shopContactCheckApolloError
  } = useForm({
    email: {
      value: '',
      validationField: 'shopContactEmail',
      emptyMessage: t('please enter shop email')
    },
    website: {
      value: '',
      validationField: 'shopContactWebsite'
    },
    telephone_country_code: {
      value: '',
      validationField: 'shopContactTelephoneCountryCode'
    },
    telephone: {
      value: '',
      validationField: 'shopContactTelephone'
    },
    phone_country_code: {
      value: '',
      validationField: 'shopContactPhoneCountryCode'
    },
    phone: {
      value: '',
      validationField: 'shopContactPhone',
      emptyMessage: t('please enter shop phone')
    }
  });

  const [steps] = useState<
    ['shop setup', 'shop info', 'shop address', 'shop contact']
  >(['shop setup', 'shop info', 'shop address', 'shop contact']);
  const [activeStep, setActiveStep] = useState<number>(0);

  const [uploadingLogoCount, setUploadingLogoCount] = useState<number>(0);
  const [uploadingBannerCount, setUploadingBannerCount] = useState<number>(0);

  function setStep(
    step: 'shop setup' | 'shop info' | 'shop address' | 'shop contact'
  ) {
    setActiveStep(steps.indexOf(step));
  }

  async function checkSectionSetupField() {
    let isValid = shopSetupValidate();

    if (await isShopNameExist()) {
      shopSetupSetError('name', t('this shop name already been used'));
      isValid = false;
    }

    if (!isValid) await setStep('shop setup');
    return isValid;
  }

  async function checkSectionInfoField() {
    let isValid = true;
    if (uploadingLogoCount > 0 || uploadingBannerCount > 0) {
      toast.default(t('please wait until image upload complete'));
      isValid = false;
    }

    if (!isValid) await setStep('shop info');
    return isValid;
  }

  async function checkSectionAddressField() {
    if (!shopSetupValue.has_physical_shop) {
      return true;
    }

    let isValid = shopAddressValidate();

    if (!isValid) await setStep('shop address');
    return isValid;
  }

  async function checkSectionContactField() {
    let isValid = shopContactValidate();

    if (!isValid) await setStep('shop contact');
    return isValid;
  }

  async function onClickCreateShop() {
    if (
      [
        await checkSectionContactField(),
        await checkSectionAddressField(),
        await checkSectionInfoField(),
        await checkSectionSetupField()
      ].every(valid => valid)
    ) {
      createShopMutation({
        variables: {
          shopSetupName: shopSetupValue.name,
          shopSetupShopCategory: shopSetupValue.shop_category,
          shopSetupShopCurrency: shopSetupValue.shop_currency,
          shopSetupHasPhysicalShop: shopSetupValue.has_physical_shop,

          shopInfoSummary: shopInfoValue.summary,
          shopInfoLogo: shopInfoValue.logo ? shopInfoValue.logo.path : null,
          shopInfoBanner: shopInfoValue.banner
            ? shopInfoValue.banner.path
            : null,

          shopAddressAddress1: shopAddressValue.address_1,
          shopAddressAddress2: shopAddressValue.address_2,
          shopAddressAddress3: shopAddressValue.address_3,
          shopAddressCity: shopAddressValue.city,
          shopAddressState: shopAddressValue.state,
          shopAddressPostalCode: shopAddressValue.postal_code,
          shopAddressCountry: shopAddressValue.country,
          shopAddressLatitude: shopAddressValue.latitude,
          shopAddressLongitude: shopAddressValue.longitude,

          shopContactEmail: shopContactValue.email,
          shopContactWebsite: shopContactValue.website,
          shopContactTelephoneCountryCode:
            shopContactValue.telephone_country_code,
          shopContactTelephone: shopContactValue.telephone,
          shopContactPhoneCountryCode: shopContactValue.phone_country_code,
          shopContactPhone: shopContactValue.phone
        }
      });
    }
  }

  async function isShopNameExist() {
    if (shopSetupValue.name.trim() !== '') {
      return client
        .query<{ shop: WithPagination<IShopFragmentCreateShop> }, ShopVars>({
          query: shopQuery(shopFragments.CreateShop),
          variables: { name: shopSetupValue.name }
        })
        .then(({ data }) => {
          return data.shop.items.length > 0;
        });
    }
  }

  const [
    createShopMutation,
    { loading: isCreatingShopMutation }
  ] = useCreateShopMutation<ICreateShopMutationFragmentDefaultFragment>(
    createShopMutationFragments.DefaultFragment,
    {
      onCompleted: () => {
        window.location.replace('//' + process.env.REACT_APP_SELLER_DOMAIN);
        context.getContext();
      },
      onError: async error => {
        if (await shopContactCheckApolloError(error)) {
          setStep('shop contact');
        }
        if (await shopAddressCheckApolloError(error)) {
          setStep('shop address');
        }
        if (await shopInfoCheckApolloError(error)) {
          setStep('shop info');
        }
        if (await shopSetupCheckApolloError(error)) {
          setStep('shop setup');
        }
      }
    }
  );

  function uploadLogo(files: any, uploadImageMutation: any) {
    if (files) {
      setUploadingLogoCount(uploadingLogoCount => uploadingLogoCount + 1);
      uploadImageMutation({
        variables: {
          images: files
        }
      });
    }
  }

  function uploadLogoCompletedHandler(data: any) {
    let tempImageData = data.uploadImageMutation;
    setUploadingLogoCount(
      uploadingLogoCount => uploadingLogoCount - tempImageData.length
    );

    shopInfoSetValue('logo', tempImageData[0]);
  }

  function uploadLogoErrorHandler(error: any) {
    FormUtil.getAllValidationErrorMessage(error).forEach(message => {
      toast.error(message);
    });
    setUploadingLogoCount(uploadingLogoCount => uploadingLogoCount - 1);
  }

  function uploadBanner(files: any, uploadImageMutation: any) {
    if (files) {
      setUploadingBannerCount(uploadingBannerCount => uploadingBannerCount + 1);
      uploadImageMutation({
        variables: {
          images: files
        }
      });
    }
  }

  function uploadBannerCompletedHandler(data: any) {
    let tempImageData = data.uploadImageMutation;

    setUploadingBannerCount(
      uploadingBannerCount => uploadingBannerCount - tempImageData.length
    );

    shopInfoSetValue('banner', tempImageData[0]);
  }

  function uploadBannerErrorHandler(error: any) {
    FormUtil.getAllValidationErrorMessage(error).forEach(message => {
      toast.error(message);
    });

    setUploadingBannerCount(uploadingBannerCount => uploadingBannerCount - 1);
  }

  function removeUploadedLogo() {
    shopInfoSetValue('logo', null);
  }

  function removeUploadedBanner() {
    shopInfoSetValue('banner', null);
  }

  return (
    <>
      <HomeHelmet title={t('create shop')} description={''} ogImage={''} />
      <Grid container item direction="row" justify="center" xs={12}>
        <Grid container item direction="row" justify="center" xs={12} sm={10}>
          <Paper className={classes.paper}>
            <Grid container item direction="row" justify="center" xs={12}>
              <Grid container item direction="column" justify="center" xs={12}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  align="center"
                >
                  {t('create your shop')}
                </Typography>
                <Typography component="p" gutterBottom align="center">
                  {t('all you need is just follow and complete these steps')}
                </Typography>
              </Grid>
              <Stepper
                className={classes.stepper}
                alternativeLabel
                nonLinear
                activeStep={activeStep}
              >
                {steps.map((step, index) => (
                  <Step key={step}>
                    <StepButton
                      onClick={() => setStep(step)}
                      completed={activeStep > index}
                    >
                      {t(step)}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <React.Fragment>
                  <Grid container item xs={12} sm={8} md={6} lg={4} spacing={3}>
                    <TextField
                      required
                      error={Boolean(shopSetupError.name)}
                      label={t('shop name')}
                      value={shopSetupValue.name}
                      onChange={e => {
                        shopSetupSetValue('name', e.target.value);
                      }}
                      helperText={shopSetupError.name}
                      margin="normal"
                      fullWidth
                    />
                    <ShopCategorySelect
                      margin="normal"
                      fullWidth
                      label={t('shop category')}
                      error={Boolean(shopSetupError.shop_category)}
                      helperText={shopSetupError.shop_category}
                      required
                      value={shopSetupValue.shop_category}
                      onChange={(value: unknown) => {
                        shopSetupSetValue('shop_category', value);
                      }}
                    />
                    <FormHelperText error={false}>
                      {t(
                        'shop category wont limit your product category, you can change this in future'
                      )}
                    </FormHelperText>
                    <CurrencySelect
                      fullWidth
                      margin={'normal'}
                      label={t('shop currency')}
                      error={Boolean(shopSetupError.shop_currency)}
                      helperText={shopSetupError.shop_currency}
                      required
                      value={shopSetupValue.shop_currency}
                      onChange={(value: unknown) => {
                        shopSetupSetValue('shop_currency', value);
                      }}
                    />
                    <FormHelperText error={false}>
                      {t(
                        "all of your product price will use this currency as price currency, you can't change this in future"
                      )}
                    </FormHelperText>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(shopSetupError.has_physical_shop)}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={shopSetupValue.has_physical_shop}
                              onChange={e => {
                                shopSetupSetValue(
                                  'has_physical_shop',
                                  e.target.checked
                                );
                              }}
                              color="primary"
                            />
                          }
                          label={t('do you have physical shop?')}
                        />
                      </FormGroup>
                      {Boolean(shopSetupError.has_physical_shop) && (
                        <FormHelperText>
                          {shopSetupError.has_physical_shop}
                        </FormHelperText>
                      )}
                      <FormHelperText error={false}>
                        {' '}
                        {t(
                          'if you have physical shop, you will need to fill up your shop address in shop address step'
                        )}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    item
                    justify="flex-end"
                    xs={12}
                    className={classes.stepButtonContainer}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        if (await checkSectionSetupField())
                          setStep('shop info');
                      }}
                    >
                      {t('next')}
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
              {activeStep === 1 && (
                <React.Fragment>
                  <Grid container item xs={12} sm={8} md={6} lg={4} spacing={3}>
                    <TextField
                      error={Boolean(shopInfoError.summary)}
                      label={t('shop summary')}
                      value={shopInfoValue.summary}
                      onChange={e => {
                        shopInfoSetValue('summary', e.target.value);
                      }}
                      helperText={shopInfoError.summary}
                      margin="normal"
                      placeholder={t('describe your shop...')}
                      fullWidth
                      multiline
                      rows="3"
                      rowsMax="8"
                    />
                    <Grid container spacing={1}>
                      <Grid item>
                        <FormControl
                          margin="normal"
                          error={Boolean(shopInfoError.logo)}
                        >
                          <UploadImageMutation
                            onCompleted={uploadLogoCompletedHandler}
                            onError={uploadLogoErrorHandler}
                            uploadImage={uploadLogo}
                            multiple={false}
                            id={'uploadLogo'}
                            className={classes.inputUpload}
                          />
                          <label htmlFor="uploadLogo">
                            <Button
                              size={'small'}
                              variant="contained"
                              color="primary"
                              component={'span'}
                            >
                              {t('upload shop logo')}
                            </Button>
                          </label>
                          {Boolean(shopInfoError.logo) && (
                            <FormHelperText>
                              {shopInfoError.logo}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {uploadingLogoCount === 0 && shopInfoValue.logo && (
                        <Grid item>
                          <FormControl margin="normal">
                            <Button
                              size={'small'}
                              variant="contained"
                              color="primary"
                              onClick={removeUploadedLogo}
                            >
                              {t('remove shop logo')}
                            </Button>
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                    <Paper className={classes.shopLogoContainer} elevation={0}>
                      {uploadingLogoCount === 0 && shopInfoValue.logo && (
                        <GridList cols={1} cellHeight={'auto'}>
                          <GridListTile cols={1}>
                            <Image
                              className={classes.shopLogo}
                              src={shopInfoValue.logo.image_large}
                              title={t('shop logo')}
                            />
                          </GridListTile>
                        </GridList>
                      )}
                    </Paper>
                    {uploadingLogoCount > 0 && (
                      <Grid item xs={12}>
                        <Skeleton variant={'rect'} height={160} />
                      </Grid>
                    )}
                    <Grid container spacing={1}>
                      <Grid item>
                        <FormControl
                          margin="normal"
                          error={Boolean(shopInfoError.banner)}
                        >
                          <UploadImageMutation
                            onCompleted={uploadBannerCompletedHandler}
                            onError={uploadBannerErrorHandler}
                            uploadImage={uploadBanner}
                            multiple={false}
                            id={'uploadBanner'}
                            className={classes.inputUpload}
                          />
                          <label htmlFor="uploadBanner">
                            <Button
                              size={'small'}
                              variant="contained"
                              color="primary"
                              component={'span'}
                            >
                              {t('upload shop banner')}
                            </Button>
                          </label>
                          {Boolean(shopInfoError.banner) && (
                            <FormHelperText>
                              {shopInfoError.banner}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {uploadingBannerCount === 0 && shopInfoValue.banner && (
                        <Grid item>
                          <FormControl margin="normal">
                            <Button
                              size={'small'}
                              variant="contained"
                              color="primary"
                              onClick={removeUploadedBanner}
                            >
                              {t('remove shop banner')}
                            </Button>
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                    <Paper
                      className={classes.shopBannerContainer}
                      elevation={0}
                    >
                      {uploadingBannerCount === 0 && shopInfoValue.banner && (
                        <GridList cols={1} cellHeight={'auto'}>
                          <GridListTile cols={1}>
                            <Image
                              className={classes.shopBanner}
                              src={shopInfoValue.banner.image_large}
                              title={t('shop banner')}
                            />
                          </GridListTile>
                        </GridList>
                      )}
                    </Paper>
                    {uploadingBannerCount > 0 && (
                      <Grid item xs={12}>
                        <Skeleton variant={'rect'} height={160} />
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    className={classes.stepButtonContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setStep('shop setup');
                        }}
                      >
                        {t('back')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          if (await checkSectionInfoField())
                            setStep('shop address');
                        }}
                      >
                        {t('next')}
                      </Button>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              {activeStep === 2 && (
                <React.Fragment>
                  <Grid container item xs={12} sm={8} md={6} lg={4} spacing={3}>
                    {!shopSetupValue.has_physical_shop && (
                      <Grid item xs={12}>
                        <Typography component="p">
                          {t(
                            "from your shop setup, seems like you don't have a physical shop, you could continue to the next step"
                          )}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        required={shopSetupValue.has_physical_shop}
                        error={Boolean(shopAddressError.address_1)}
                        label={t('address 1')}
                        value={shopAddressValue.address_1}
                        onChange={e => {
                          shopAddressSetValue('address_1', e.target.value);
                        }}
                        helperText={shopAddressError.address_1}
                        margin="normal"
                        disabled={!shopSetupValue.has_physical_shop}
                        fullWidth
                      />
                      <TextField
                        error={Boolean(shopAddressError.address_2)}
                        label={t('address 2')}
                        value={shopAddressValue.address_2}
                        onChange={e => {
                          shopAddressSetValue('address_2', e.target.value);
                        }}
                        helperText={shopAddressError.address_2}
                        margin="normal"
                        disabled={!shopSetupValue.has_physical_shop}
                        fullWidth
                      />
                      <TextField
                        error={Boolean(shopAddressError.address_3)}
                        label={t('address 3')}
                        value={shopAddressValue.address_3}
                        onChange={e => {
                          shopAddressSetValue('address_3', e.target.value);
                        }}
                        helperText={shopAddressError.address_3}
                        margin="normal"
                        disabled={!shopSetupValue.has_physical_shop}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required={shopSetupValue.has_physical_shop}
                        error={Boolean(shopAddressError.city)}
                        label={t('city')}
                        value={shopAddressValue.city}
                        onChange={e => {
                          shopAddressSetValue('city', e.target.value);
                        }}
                        helperText={shopAddressError.city}
                        margin="normal"
                        disabled={!shopSetupValue.has_physical_shop}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required={shopSetupValue.has_physical_shop}
                        error={Boolean(shopAddressError.state)}
                        label={t('state')}
                        value={shopAddressValue.state}
                        onChange={e => {
                          shopAddressSetValue('state', e.target.value);
                        }}
                        helperText={shopAddressError.state}
                        margin="normal"
                        disabled={!shopSetupValue.has_physical_shop}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required={shopSetupValue.has_physical_shop}
                        error={Boolean(shopAddressError.postal_code)}
                        label={t('postal code')}
                        value={shopAddressValue.postal_code}
                        onChange={e => {
                          shopAddressSetValue('postal_code', e.target.value);
                        }}
                        helperText={shopAddressError.postal_code}
                        margin="normal"
                        disabled={!shopSetupValue.has_physical_shop}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CountrySelect
                        required={shopSetupValue.has_physical_shop}
                        label={t('country')}
                        error={Boolean(shopAddressError.country)}
                        helperText={shopAddressError.country}
                        value={shopAddressValue.country}
                        onChange={(value: unknown) => {
                          shopAddressSetValue('country', value);
                        }}
                        margin="normal"
                        fullWidth
                        disabled={!shopSetupValue.has_physical_shop}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                      {shopSetupValue.has_physical_shop && (
                        <FormControl margin="normal" fullWidth>
                          <div style={{ height: '400px', width: '100%' }}>
                            <Geolocation
                              render={(geoData: any) => {
                                let { position } = geoData;

                                let latitude =
                                  position &&
                                  position.coords &&
                                  position.coords.latitude
                                    ? position.coords.latitude
                                    : null;

                                let longitude =
                                  position &&
                                  position.coords &&
                                  position.coords.longitude
                                    ? position.coords.longitude
                                    : null;

                                return (
                                  <GoogleMap
                                    latitude={latitude}
                                    longitude={longitude}
                                    onClick={(data: any) => {
                                      let { lat, lng } = data;

                                      shopAddressSetValue('latitude', lat);
                                      shopAddressSetValue('longitude', lng);
                                    }}
                                  >
                                    {Boolean(shopAddressValue.latitude) &&
                                      Boolean(shopAddressValue.longitude) && (
                                        <GoogleMapMarker
                                          lat={shopAddressValue.latitude}
                                          lng={shopAddressValue.longitude}
                                        />
                                      )}
                                  </GoogleMap>
                                );
                              }}
                            />
                          </div>
                        </FormControl>
                      )}
                      <div>
                        {Boolean(shopAddressError.latitude) && (
                          <FormHelperText error>
                            {shopAddressError.latitude}
                          </FormHelperText>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    className={classes.stepButtonContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setStep('shop info');
                        }}
                      >
                        {t('back')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          if (await checkSectionAddressField())
                            setStep('shop contact');
                        }}
                      >
                        {t('next')}
                      </Button>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              {activeStep === 3 && (
                <React.Fragment>
                  <Grid container item xs={12} sm={8} md={6} lg={4} spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        error={Boolean(shopContactError.email)}
                        label={t('shop email')}
                        value={shopContactValue.email}
                        onChange={e => {
                          shopContactSetValue('email', e.target.value);
                        }}
                        helperText={shopContactError.email}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(shopContactError.website)}
                        label={t('shop website')}
                        value={shopContactValue.website}
                        onChange={e => {
                          shopContactSetValue('website', e.target.value);
                        }}
                        helperText={shopContactError.website}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <CountryPhoneCodeSelect
                        label={t('shop telephone code')}
                        error={Boolean(shopContactError.telephone_country_code)}
                        helperText={shopContactError.telephone_country_code}
                        value={shopContactValue.telephone_country_code}
                        onChange={(value: unknown) => {
                          shopContactSetValue('telephone_country_code', value);
                        }}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {shopContactValue.telephone_country_code}
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(shopContactError.telephone)}
                        label={t('shop telephone')}
                        value={shopContactValue.telephone}
                        onChange={e => {
                          shopContactSetValue('telephone', e.target.value);
                        }}
                        helperText={shopContactError.telephone}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <CountryPhoneCodeSelect
                        required
                        label={t('shop phone code')}
                        error={Boolean(shopContactError.phone_country_code)}
                        helperText={shopContactError.phone_country_code}
                        value={shopContactValue.phone_country_code}
                        onChange={(value: unknown) => {
                          shopContactSetValue('phone_country_code', value);
                        }}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {shopContactValue.phone_country_code}
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(shopContactError.phone)}
                        label={t('shop phone')}
                        value={shopContactValue.phone}
                        onChange={e => {
                          shopContactSetValue('phone', e.target.value);
                        }}
                        helperText={shopContactError.phone}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    className={classes.stepButtonContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setStep('shop address');
                        }}
                      >
                        {t('back')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <ButtonSubmit
                        onClick={onClickCreateShop}
                        variant="contained"
                        color="primary"
                        loading={isCreatingShopMutation}
                        loadingLabel={t('creating')}
                        label={t('create')}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
