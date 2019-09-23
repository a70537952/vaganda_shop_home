import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import update from 'immutability-helper';
import React, {useContext, useState} from 'react';
import {useApolloClient} from 'react-apollo';
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
import {AppContext} from '../contexts/Context';
import FormUtil, {Fields} from '../utils/FormUtil';
import {useTranslation} from 'react-i18next';
import Image from '../components/Image';
import useToast from '../components/_hook/useToast';
import {shopQuery, ShopVars} from '../graphql/query/ShopQuery';
import {shopFragments} from '../graphql/fragment/query/ShopFragment';
import {IShopFragmentCreateShop} from '../graphql/fragmentType/query/ShopFragmentInterface';
import {WithPagination} from '../graphql/query/Query';
import {useCreateShopMutation} from '../graphql/mutation/shopMutation/CreateShopMutation';
import {createShopMutationFragments} from '../graphql/fragment/mutation/shopMutation/CreateShopMutationFragment';
import {ICreateShopMutationFragmentDefaultFragment} from '../graphql/fragmentType/mutation/shopMutation/CreateShopMutationFragmentInterface';


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
  },
  buttonCreateProgress: {
    color: '#fff'
  }
}));

export default function CreateShop() {
  const classes = useStyles();
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { toast } = useToast();
  const client = useApolloClient();

  let shopSetupFields = [
    {
      field: 'name',
      validationField: 'shopSetupName',
      isCheckEmpty: true,
      emptyMessage: t('please enter shop name')
    },
    {
      field: 'shop_category',
      validationField: 'shopSetupShopCategory',
      isCheckEmpty: true,
      emptyMessage: t('please select shop category')
    },
    {
      field: 'shop_currency',
      validationField: 'shopSetupShopCurrency',
      value: 'MYR',
      isCheckEmpty: true,
      emptyMessage: t('please select shop currency')
    },
    {
      field: 'has_physical_shop',
      validationField: 'shopSetupHasPhysicalShop',
      value: true
    }
  ];

  let shopInfoFields = [
    { field: 'summary', validationField: 'shopInfoSummary' },
    { field: 'logo', validationField: 'shopInfoLogo' },
    { field: 'banner', validationField: 'shopInfoBanner' }
  ];

  let shopAddressFields = [
    {
      field: 'address_1',
      validationField: 'shopAddressAddress1',
      isCheckEmpty: true,
      emptyMessage: t('please enter shop address')
    },
    { field: 'address_2', validationField: 'shopAddressAddress2' },
    { field: 'address_3', validationField: 'shopAddressAddress3' },
    {
      field: 'city',
      validationField: 'shopAddressCity',
      isCheckEmpty: true,
      emptyMessage: t('please enter city')
    },
    {
      field: 'state',
      validationField: 'shopAddressState',
      isCheckEmpty: true,
      emptyMessage: t('please enter state')
    },
    {
      field: 'postal_code',
      validationField: 'shopAddressPostalCode',
      isCheckEmpty: true,
      emptyMessage: t('please enter postal code')
    },
    {
      field: 'country',
      validationField: 'shopAddressCountry',
      isCheckEmpty: true,
      emptyMessage: t('please select country')
    },
    {
      field: 'latitude',
      validationField: 'shopAddressLatitude',
      isCheckEmpty: true,
      emptyMessage: t('please mark your shop location')
    },
    {
      field: 'longitude',
      validationField: 'shopAddressLongitude',
      isCheckEmpty: true,
      emptyMessage: t('please mark your shop location')
    }
  ];

  let shopContactFields = [
    {
      field: 'email',
      validationField: 'shopContactEmail',
      isCheckEmpty: true,
      emptyMessage: t('please enter shop email')
    },
    { field: 'website', validationField: 'shopContactWebsite' },
    {
      field: 'telephone_country_code',
      validationField: 'shopContactTelephoneCountryCode'
    },
    { field: 'telephone', validationField: 'shopContactTelephone' },
    {
      field: 'phone_country_code',
      validationField: 'shopContactPhoneCountryCode'
    },
    {
      field: 'phone',
      validationField: 'shopContactPhone',
      isCheckEmpty: true,
      emptyMessage: t('please enter shop phone')
    }
  ];

  const [steps] = useState<
    ['shop setup', 'shop info', 'shop address', 'shop contact']
  >(['shop setup', 'shop info', 'shop address', 'shop contact']);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [shopSetup, setShopSetup] = useState<Fields>(
    FormUtil.generateFieldsState(shopSetupFields)
  );
  const [shopInfo, setShopInfo] = useState<Fields>(
    FormUtil.generateFieldsState(shopInfoFields)
  );
  const [shopAddress, setShopAddress] = useState<Fields>(
    FormUtil.generateFieldsState(shopAddressFields)
  );
  const [shopContact, setShopContact] = useState<Fields>(
    FormUtil.generateFieldsState(shopContactFields)
  );

  const [uploadingLogoCount, setUploadingLogoCount] = useState<number>(0);
  const [uploadingBannerCount, setUploadingBannerCount] = useState<number>(0);

  function setStep(
    step: 'shop setup' | 'shop info' | 'shop address' | 'shop contact'
  ) {
    setActiveStep(steps.indexOf(step));
  }

  async function checkSectionSetupField(error?: any) {
    let {
      state: checkedEmptyState,
      isValid: emptyIsValid
    } = FormUtil.generateFieldsEmptyErrorHook(shopSetupFields, shopSetup);

    let {
      state: checkedErrorState,
      isValid: validationIsValid
    } = FormUtil.validationErrorHandlerHook(
      shopSetupFields,
      error,
      checkedEmptyState
    );

    let isValid = emptyIsValid && validationIsValid;

    if (await isShopNameExist()) {
      checkedErrorState = update(checkedErrorState, {
        name: {
          feedback: { $set: t('this shop name already been used') },
          is_valid: { $set: false }
        }
      });
      isValid = false;
    }

    setShopSetup(checkedErrorState);
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

  async function checkSectionAddressField(error?: any) {
    if (!shopSetup.has_physical_shop.value) {
      return true;
    }

    let {
      state: checkedEmptyState,
      isValid: emptyIsValid
    } = FormUtil.generateFieldsEmptyErrorHook(shopAddressFields, shopAddress);

    let {
      state: checkedErrorState,
      isValid: validationIsValid
    } = FormUtil.validationErrorHandlerHook(
      shopAddressFields,
      error,
      checkedEmptyState
    );

    let isValid = emptyIsValid && validationIsValid;

    setShopAddress(checkedErrorState);
    if (!isValid) await setStep('shop address');
    return isValid;
  }

  async function checkSectionContactField(error?: any) {
    let {
      state: checkedEmptyState,
      isValid: emptyIsValid
    } = FormUtil.generateFieldsEmptyErrorHook(shopContactFields, shopContact);

    let {
      state: checkedErrorState,
      isValid: validationIsValid
    } = FormUtil.validationErrorHandlerHook(
      shopContactFields,
      error,
      checkedEmptyState
    );

    let isValid = emptyIsValid && validationIsValid;

    setShopContact(checkedErrorState);

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
          shopSetupName: shopSetup.name.value,
          shopSetupShopCategory: shopSetup.shop_category.value,
          shopSetupShopCurrency: shopSetup.shop_currency.value,
          shopSetupHasPhysicalShop: shopSetup.has_physical_shop.value,

          shopInfoSummary: shopInfo.summary.value,
          shopInfoLogo: shopInfo.logo.value ? shopInfo.logo.value.path : null,
          shopInfoBanner: shopInfo.banner.value
            ? shopInfo.banner.value.path
            : null,

          shopAddressAddress1: shopAddress.address_1.value,
          shopAddressAddress2: shopAddress.address_2.value,
          shopAddressAddress3: shopAddress.address_3.value,
          shopAddressCity: shopAddress.city.value,
          shopAddressState: shopAddress.state.value,
          shopAddressPostalCode: shopAddress.postal_code.value,
          shopAddressCountry: shopAddress.country.value,
          shopAddressLatitude: shopAddress.latitude.value,
          shopAddressLongitude: shopAddress.longitude.value,

          shopContactEmail: shopContact.email.value,
          shopContactWebsite: shopContact.website.value,
          shopContactTelephoneCountryCode:
            shopContact.telephone_country_code.value,
          shopContactTelephone: shopContact.telephone.value,
          shopContactPhoneCountryCode: shopContact.phone_country_code.value,
          shopContactPhone: shopContact.phone.value
        }
      });
    }
  }

  async function isShopNameExist() {
    if (shopSetup.name.value.trim() !== '') {
      return client
        .query<{ shop: WithPagination<IShopFragmentCreateShop> }, ShopVars>({
          query: shopQuery(shopFragments.CreateShop),
          variables: { name: shopSetup.name.value }
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
        await checkSectionContactField(error);
        await checkSectionAddressField(error);
        await checkSectionInfoField();
        await checkSectionSetupField(error);
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

    setShopInfo(shopInfo =>
      update(shopInfo, {
        logo: {
          value: { $set: tempImageData[0] }
        }
      })
    );
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

    setShopInfo(shopInfo =>
      update(shopInfo, {
        banner: {
          value: { $set: tempImageData[0] }
        }
      })
    );
  }

  function uploadBannerErrorHandler(error: any) {
    FormUtil.getAllValidationErrorMessage(error).forEach(message => {
      toast.error(message);
    });

    setUploadingBannerCount(uploadingBannerCount => uploadingBannerCount - 1);
  }

  function removeUploadedLogo() {
    setShopInfo(
      update(shopInfo, {
        logo: {
          value: { $set: null }
        }
      })
    );
  }

  function removeUploadedBanner() {
    setShopInfo(
      update(shopInfo, {
        banner: {
          value: { $set: null }
        }
      })
    );
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
                      error={!shopSetup.name.is_valid}
                      label={t('shop name')}
                      value={shopSetup.name.value}
                      onChange={e => {
                        setShopSetup(
                          update(shopSetup, {
                            name: { value: { $set: e.target.value } }
                          })
                        );
                      }}
                      helperText={shopSetup.name.feedback}
                      margin="normal"
                      fullWidth
                    />
                    <ShopCategorySelect
                      margin="normal"
                      fullWidth
                      label={t('shop category')}
                      error={!shopSetup.shop_category.is_valid}
                      helperText={shopSetup.shop_category.feedback}
                      required
                      value={shopSetup.shop_category.value}
                      onChange={(value: unknown) => {
                        setShopSetup(
                          update(shopSetup, {
                            shop_category: { value: { $set: value } }
                          })
                        );
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
                      error={!shopSetup.shop_currency.is_valid}
                      helperText={shopSetup.shop_currency.feedback}
                      required
                      value={shopSetup.shop_currency.value}
                      onChange={(value: unknown) => {
                        setShopSetup(
                          update(shopSetup, {
                            shop_currency: { value: { $set: value } }
                          })
                        );
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
                      error={!shopSetup.has_physical_shop.is_valid}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={shopSetup.has_physical_shop.value}
                              onChange={e => {
                                setShopSetup(
                                  update(shopSetup, {
                                    has_physical_shop: {
                                      value: { $set: e.target.checked }
                                    }
                                  })
                                );
                              }}
                              color="primary"
                            />
                          }
                          label={t('do you have physical shop?')}
                        />
                      </FormGroup>
                      {shopSetup.has_physical_shop.feedback && (
                        <FormHelperText>
                          {shopSetup.has_physical_shop.feedback}
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
                      error={!shopInfo.summary.is_valid}
                      label={t('shop summary')}
                      value={shopInfo.summary.value}
                      onChange={(e: { target: { value: any } }) => {
                        setShopInfo(
                          update(shopInfo, {
                            summary: { value: { $set: e.target.value } }
                          })
                        );
                      }}
                      helperText={shopInfo.summary.feedback}
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
                          error={!shopInfo.logo.is_valid}
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
                          {shopInfo.logo.feedback && (
                            <FormHelperText>
                              {shopInfo.logo.feedback}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {uploadingLogoCount === 0 && shopInfo.logo.value && (
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
                      {uploadingLogoCount === 0 && shopInfo.logo.value && (
                        <GridList cols={1} cellHeight={'auto'}>
                          <GridListTile cols={1}>
                            <Image
                              className={classes.shopLogo}
                              src={shopInfo.logo.value.image_large}
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
                          error={!shopInfo.banner.is_valid}
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
                          {shopInfo.banner.feedback && (
                            <FormHelperText>
                              {shopInfo.banner.feedback}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {uploadingBannerCount === 0 && shopInfo.banner.value && (
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
                      {uploadingBannerCount === 0 && shopInfo.banner.value && (
                        <GridList cols={1} cellHeight={'auto'}>
                          <GridListTile cols={1}>
                            <Image
                              className={classes.shopBanner}
                              src={shopInfo.banner.value.image_large}
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
                    {!shopSetup.has_physical_shop.value && (
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
                        required={shopSetup.has_physical_shop.value}
                        error={!shopAddress.address_1.is_valid}
                        label={t('address 1')}
                        value={shopAddress.address_1.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopAddress(
                            update(shopAddress, {
                              address_1: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopAddress.address_1.feedback}
                        margin="normal"
                        disabled={!shopSetup.has_physical_shop.value}
                        fullWidth
                      />
                      <TextField
                        error={!shopAddress.address_2.is_valid}
                        label={t('address 2')}
                        value={shopAddress.address_2.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopAddress(
                            update(shopAddress, {
                              address_2: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopAddress.address_2.feedback}
                        margin="normal"
                        disabled={!shopSetup.has_physical_shop.value}
                        fullWidth
                      />
                      <TextField
                        error={!shopAddress.address_3.is_valid}
                        label={t('address 3')}
                        value={shopAddress.address_3.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopAddress(
                            update(shopAddress, {
                              address_3: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopAddress.address_3.feedback}
                        margin="normal"
                        disabled={!shopSetup.has_physical_shop.value}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required={shopSetup.has_physical_shop.value}
                        error={!shopAddress.city.is_valid}
                        label={t('city')}
                        value={shopAddress.city.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopAddress(
                            update(shopAddress, {
                              city: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopAddress.city.feedback}
                        margin="normal"
                        disabled={!shopSetup.has_physical_shop.value}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required={shopSetup.has_physical_shop.value}
                        error={!shopAddress.state.is_valid}
                        label={t('state')}
                        value={shopAddress.state.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopAddress(
                            update(shopAddress, {
                              state: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopAddress.state.feedback}
                        margin="normal"
                        disabled={!shopSetup.has_physical_shop.value}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required={shopSetup.has_physical_shop.value}
                        error={!shopAddress.postal_code.is_valid}
                        label={t('postal code')}
                        value={shopAddress.postal_code.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopAddress(
                            update(shopAddress, {
                              postal_code: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopAddress.postal_code.feedback}
                        margin="normal"
                        disabled={!shopSetup.has_physical_shop.value}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CountrySelect
                        required={shopSetup.has_physical_shop.value}
                        label={t('country')}
                        error={!shopAddress.country.is_valid}
                        helperText={shopAddress.country.feedback}
                        value={shopAddress.country.value}
                        onChange={(value: unknown) => {
                          setShopAddress(
                            update(shopAddress, {
                              country: { value: { $set: value } }
                            })
                          );
                        }}
                        margin="normal"
                        fullWidth
                        disabled={!shopSetup.has_physical_shop.value}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                      {shopSetup.has_physical_shop.value && (
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

                                      setShopAddress(
                                        update(shopAddress, {
                                          latitude: { value: { $set: lat } },
                                          longitude: { value: { $set: lng } }
                                        })
                                      );
                                    }}
                                  >
                                    {Boolean(shopAddress.latitude.value) &&
                                      Boolean(shopAddress.longitude.value) && (
                                        <GoogleMapMarker
                                          lat={shopAddress.latitude.value}
                                          lng={shopAddress.longitude.value}
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
                        {shopAddress.latitude.is_valid === false &&
                          shopAddress.latitude.feedback !== '' && (
                            <FormHelperText error>
                              {shopAddress.latitude.feedback}
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
                    <Grid item>
                      <TextField
                        required
                        error={!shopContact.email.is_valid}
                        label={t('shop email')}
                        value={shopContact.email.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopContact(
                            update(shopContact, {
                              email: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopContact.email.feedback}
                        margin="normal"
                        fullWidth
                      />
                      <TextField
                        error={!shopContact.website.is_valid}
                        label={t('shop website')}
                        value={shopContact.website.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopContact(
                            update(shopContact, {
                              website: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopContact.website.feedback}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <CountryPhoneCodeSelect
                        label={t('shop telephone code')}
                        error={!shopContact.telephone_country_code.is_valid}
                        helperText={shopContact.telephone_country_code.feedback}
                        value={shopContact.telephone_country_code.value}
                        onChange={(value: unknown) => {
                          setShopContact(
                            update(shopContact, {
                              telephone_country_code: { value: { $set: value } }
                            })
                          );
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
                              {shopContact.telephone_country_code.value}
                            </InputAdornment>
                          )
                        }}
                        error={!shopContact.telephone.is_valid}
                        label={t('shop telephone')}
                        value={shopContact.telephone.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopContact(
                            update(shopContact, {
                              telephone: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopContact.telephone.feedback}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <CountryPhoneCodeSelect
                        required
                        label={t('shop phone code')}
                        error={!shopContact.phone_country_code.is_valid}
                        helperText={shopContact.phone_country_code.feedback}
                        value={shopContact.phone_country_code.value}
                        onChange={(value: unknown) => {
                          setShopContact(
                            update(shopContact, {
                              phone_country_code: { value: { $set: value } }
                            })
                          );
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
                              {shopContact.phone_country_code.value}
                            </InputAdornment>
                          )
                        }}
                        error={!shopContact.phone.is_valid}
                        label={t('shop phone')}
                        value={shopContact.phone.value}
                        onChange={(e: { target: { value: any } }) => {
                          setShopContact(
                            update(shopContact, {
                              phone: { value: { $set: e.target.value } }
                            })
                          );
                        }}
                        helperText={shopContact.phone.feedback}
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
                      {isCreatingShopMutation ? (
                        <Button variant="contained" color="primary">
                          <CircularProgress
                            size={20}
                            className={classes.buttonCreateProgress}
                          />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={async () => {
                            if (await checkSectionContactField())
                              onClickCreateShop();
                          }}
                        >
                          {t('create')}
                        </Button>
                      )}
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
