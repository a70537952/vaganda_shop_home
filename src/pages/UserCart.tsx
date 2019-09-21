import React, { useContext, useEffect, useState } from 'react';
import HomeHelmet from '../components/home/HomeHelmet';
import { AppContext } from '../contexts/Context';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import { useApolloClient } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { homePath } from '../utils/RouteUtil';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import InputQuantity from '../components/_input/InputQuantity';
import update from 'immutability-helper';
import classNames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import PRODUCT_SHIPPING from '../constant/PRODUCT_SHIPPING';
import PlaceIcon from '@material-ui/icons/Place';
import Modal from '@material-ui/core/Modal';
import ModalBraintreePayment from '../components/_modal/ModalBraintreePayment';
import ModalPaymentSuccess from '../components/_modal/ModalPaymentSuccess';
import ModalPaymentFailed from '../components/_modal/ModalPaymentFailed';
import ModalEditUserAddress from '../components/home/Modal/ModalEditUserAddress';
import ModalEditUserContact from '../components/home/Modal/ModalEditUserContact';
import ModalEditUserAccount from '../components/home/Modal/ModalEditUserAccount';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import USER_ORDER from '../constant/USER_ORDER';
import queryString from 'query-string';
import Image from '../components/Image';
import ProductTitle from '../components/ProductTitle';
import DialogProcessingUserOrder from '../components/_dialog/DialogProcessingUserOrder';
import { useUserCartQuery } from '../graphql/query/UserCartQuery';
import { IUserCartFragmentUserCart } from '../graphql/fragmentType/query/UserCartFragmentInterface';
import { userCartFragments } from '../graphql/fragment/query/UserCartFragment';
import { IRemoveProductTypeFromUserCartMutationFragmentDefaultFragment } from '../graphql/fragmentType/mutation/userCartMutation/RemoveProductTypeFromUserCartMutationFragmentInterface';
import { removeProductTypeFromUserCartMutationFragments } from '../graphql/fragment/mutation/userCartMutation/RemoveProductTypeFromUserCartMutationFragment';
import { useCurrencyExchangeRateLazyQuery } from '../graphql/query/CurrencyExchangeRateQuery';
import { ICurrencyExchangeRateFragmentUserCart } from '../graphql/fragmentType/query/CurrencyExchangeRateFragmentInterface';
import { currencyExchangeRateFragments } from '../graphql/fragment/query/CurrencyExchangeRateFragment';
import useToast from '../components/_hook/useToast';
import { useCreateUserOrderMutation } from '../graphql/mutation/userOrderMutation/CreateUserOrderMutation';
import { createUserOrderMutationFragments } from '../graphql/fragment/mutation/userOrderMutation/CreateUserOrderMutationFragment';
import { ICeateUserOrderMutationFragmentInterfaceFragmentUserCart } from '../graphql/fragmentType/mutation/userOrderMutation/AddUserOrderDetailCommentMutationFragmentInterface';
import { useSetUserCartQuantityMutation } from '../graphql/mutation/userCartMutation/SetUserCartQuantityMutation';
import { setUserCartQuantityMutationFragments } from '../graphql/fragment/mutation/userCartMutation/SetUserCartQuantityMutationFragment';
import { ISetUserCartQuantityMutationFragmentDefaultFragment } from '../graphql/fragmentType/mutation/userCartMutation/SetUserCartQuantityMutationFragmentInterface';
import UserCartRemoveButton from '../components/home/UserCart/UserCartRemoveButton';

interface IProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 8px',
    [theme.breakpoints.up('sm')]: {
      padding: '8px 32px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '8px 64px'
    }
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
    boxShadow:
      '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    backgroundColor: '#fff'
  },
  checkboxTableCell: {
    //width: '50px'
  },
  productTableCell: {
    minWidth: '340px',
    maxWidth: '340px'
  },
  unitPriceTableCell: {
    minWidth: '200px',
    maxWidth: '200px'
  },
  quantityTableCell: {
    minWidth: '355px',
    maxWidth: '355px'
  },
  totalPriceTableCell: {
    minWidth: '200px',
    maxWidth: '200px'
  },
  actionsTableCell: {
    width: '160px'
  },
  tableContainer: {
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  tableBody: {
    overflowY: 'hidden',
    display: 'block',
    marginTop: '24px',
    '&::before': {
      content: '',
      display: 'block',
      height: theme.spacing(2)
    }
  },
  tableHeadRow: {
    width: '100%',
    display: 'inline-table'
  },
  tableBodyRow: {
    width: '100%',
    display: 'inline-table'
  },
  table: {
    display: 'grid'
  },
  tableShippingRow: {
    height: '80px'
  },
  shippingMenuItem: {},
  tableRowSubtotal: {
    overflow: 'hidden'
  },
  tableRowTotal: {
    height: '60px'
  },
  modal: {
    justifyContent: 'center',
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '10px 0'
  },
  modalContentContainer: {
    height: 'fit-content'
  },
  modalPaper: {
    width: '100%',
    padding: theme.spacing(3),
    height: 'fit-content'
  },
  paperDeliveryAddress: {
    width: '100%',
    padding: theme.spacing(2)
  },
  itemAvailable: {
    color: '#888'
  },
  itemAvailableError: {
    color: theme.palette.primary.main
  }
}));

function UserCart(props: IProps & RouteComponentProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { toast } = useToast();
  const context = useContext(AppContext);
  const client = useApolloClient();

  const [selectedCartIDs, setSelectedCartIDs] = useState<Set<number>>(
    new Set()
  );
  const [modal, setModal] = useState<{
    editUserAddress: boolean;
    editUserContact: boolean;
    editUserAccount: boolean;
    braintreePayment: boolean;
    confirmOrder: boolean;
    paymentSuccess: boolean;
    paymentFailed: boolean;
  }>({
    editUserAddress: false,
    editUserContact: false,
    editUserAccount: false,
    braintreePayment: false,
    confirmOrder: false,
    paymentSuccess: false,
    paymentFailed: false
  });
  const [userCarts, setUserCarts] = useState<any[]>([]);
  const [isMakingPayment, setIsMakingPayment] = useState<boolean>(false);
  const [isCheckingUserContact, setIsCheckingUserContact] = useState<boolean>(
    false
  );

  function toggleModalPaymentSuccess() {
    setModal(modal =>
      update(modal, {
        paymentSuccess: { $set: !modal.paymentSuccess }
      })
    );
  }

  function toggleModalPaymentFailed() {
    setModal(modal =>
      update(modal, {
        paymentFailed: { $set: !modal.paymentFailed }
      })
    );
  }

  function toggleModalConfirmOrder() {
    setModal(modal =>
      update(modal, {
        confirmOrder: { $set: !modal.confirmOrder }
      })
    );
  }

  function toggleModalBraintreePayment() {
    setModal(modal =>
      update(modal, {
        braintreePayment: { $set: !modal.braintreePayment }
      })
    );
  }

  function toggleModalEditUserAddress() {
    setModal(modal =>
      update(modal, {
        editUserAddress: { $set: !modal.editUserAddress }
      })
    );
  }

  function toggleModalEditUserContact() {
    setModal(modal =>
      update(modal, {
        editUserContact: { $set: !modal.editUserContact }
      })
    );
  }

  function toggleModalEditUserAccount() {
    setModal(modal =>
      update(modal, {
        editUserAccount: { $set: !modal.editUserAccount }
      })
    );
  }

  const [setUserCartQuantityMutation] = useSetUserCartQuantityMutation<
    ISetUserCartQuantityMutationFragmentDefaultFragment
  >(setUserCartQuantityMutationFragments.DefaultFragment, {
    onError: () => {
      toast.error(
        t(
          'update product quantity failed. please refresh the page and try again.'
        )
      );
    }
  });

  const [
    createUserOrderMutation,
    { loading: isCreatingUserOrderMutation }
  ] = useCreateUserOrderMutation<
    ICeateUserOrderMutationFragmentInterfaceFragmentUserCart
  >(createUserOrderMutationFragments.UserCart, {
    onCompleted: data => {
      let order = data.createUserOrderMutation;
      setIsMakingPayment(false);
      toggleModalConfirmOrder();
      if (order.order_status === USER_ORDER.ORDER_STATUS.PAID) {
        toggleModalPaymentSuccess();
      } else {
        toggleModalPaymentFailed();
      }
      refetchUserCart();
    },
    onError: () => {
      toast.error(
        t('something went wrong. please refresh the page and try again.')
      );
    }
  });

  function onChangeCheckOrUncheckAll(e: any) {
    if (e.target.checked) {
      setSelectedCartIDs(new Set(userCarts.map((cart: any) => cart.id)));
    } else {
      setSelectedCartIDs(new Set());
    }
  }

  function calculateSubtotal() {
    let checkedCart = getCheckedCart();
    let subtotalMap: Map<string, any> = new Map();

    checkedCart.forEach((cart: any) => {
      let currency = cart.product_type.currency;
      let currencyObj = subtotalMap.get(currency) || {};
      currencyObj.currency = currency;
      currencyObj.shipping_currency = currency;
      currencyObj.quantity = currencyObj.quantity
        ? Number(currencyObj.quantity) + Number(cart.quantity)
        : cart.quantity;

      let totalPrice = cart.product_type.final_price * cart.quantity;
      currencyObj.totalPrice = currencyObj.totalPrice
        ? Number(currencyObj.totalPrice) + Number(totalPrice)
        : totalPrice;

      let totalPriceUSD =
        Number(
          convertToUSD(
            currencyObj.currency,
            cart.product_type.final_price
          ).toFixed(2)
        ) * cart.quantity;
      currencyObj.totalPriceUSD = currencyObj.totalPriceUSD
        ? Number(currencyObj.totalPriceUSD) + Number(totalPriceUSD)
        : totalPriceUSD;

      currencyObj.totalShippingFee = currencyObj.totalShippingFee || 0;
      currencyObj.totalShippingFeeUSD = currencyObj.totalShippingFeeUSD || 0;

      if (cart.selectedProductShipping) {
        let totalShippingFee = Number(
          cart.quantity * cart.selectedProductShipping.shipping_fee
        );
        currencyObj.totalShippingFee =
          Number(currencyObj.totalShippingFee) + Number(totalShippingFee);

        let totalShippingFeeUSD =
          Number(
            convertToUSD(
              currencyObj.shipping_currency,
              cart.selectedProductShipping.shipping_fee
            ).toFixed(2)
          ) * cart.quantity;
        currencyObj.totalShippingFeeUSD =
          Number(currencyObj.totalShippingFeeUSD) + Number(totalShippingFeeUSD);
      }
      subtotalMap.set(currency, currencyObj);

      if (currencyObj.totalPrice <= 0) {
        subtotalMap.delete(currency);
      }
    });

    return subtotalMap;
  }

  const [
    loadCurrencyExchangeRate,
    { data: currencyExchangeRateData }
  ] = useCurrencyExchangeRateLazyQuery<ICurrencyExchangeRateFragmentUserCart>(
    currencyExchangeRateFragments.UserCart
  );

  const {
    data: userCartData,
    refetch: refetchUserCart,
    loading: isUserCartLoading,
    error: userCartError
  } = useUserCartQuery<IUserCartFragmentUserCart>(userCartFragments.UserCart, {
    variables: {
      sort_created_at: 'desc'
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (!isUserCartLoading && userCartData) {
      let newUserCarts: IUserCartFragmentUserCart[] =
        userCartData.userCart.items;
      setUserCarts(newUserCarts);

      loadCurrencyExchangeRate({
        variables: {
          where_base: 'USD',
          where_in_target: Array.from(
            new Set(newUserCarts.map((cart: any) => cart.product_type.currency))
          )
        }
      });

      let queryParams: any = queryString.parse(props.location.search);
      if (
        queryParams.cartID &&
        newUserCarts.find((cart: any) => cart.id === queryParams.cartID)
      ) {
        setSelectedCartIDs(new Set([queryParams.cartID]));
      }
    }
  }, [isUserCartLoading]);

  let exchangeRates: ICurrencyExchangeRateFragmentUserCart[] = [];

  if (currencyExchangeRateData) {
    exchangeRates = currencyExchangeRateData.currencyExchangeRate.items;
  }

  function convertToUSD(baseCurrency: string, price: number): number {
    let exchangeRate = exchangeRates.find(
      exchangeRate => exchangeRate.target === baseCurrency
    );
    let priceInUSD;

    if (exchangeRate) {
      priceInUSD = price / parseFloat(exchangeRate.rate);
    } else {
      priceInUSD = 0;
    }

    return Number(priceInUSD);
  }

  function getCheckedCart() {
    return userCarts.filter((cart: any) => selectedCartIDs.has(cart.id));
  }

  async function checkout() {
    if (await isUserContactValid()) {
      let checkedCart = getCheckedCart();
      let noSelectProductShippingCart = checkedCart.find(
        cart => !cart.selectedProductShipping
      );
      let invalidQuantityCartIDs = checkedCart
        .filter(cart => cart.quantity > cart.product_type.quantity)
        .map(cart => cart.id);

      if (noSelectProductShippingCart) {
        toast.default(
          t('please select a shipping method for {{title}}', {
            title:
              noSelectProductShippingCart.product_type.product.title +
              ` (${noSelectProductShippingCart.product_type.title})`
          })
        );
      } else if (invalidQuantityCartIDs.length) {
        setUserCarts(
          userCarts.map(cart => {
            if (invalidQuantityCartIDs.includes(cart.id)) {
              cart.errorQuantity = true;
            }
            return cart;
          })
        );
      } else {
        toggleModalConfirmOrder();
      }
    }
  }

  async function isUserContactValid() {
    setIsCheckingUserContact(true);
    let { data } = await client.query({
      query: gql`
        query User {
          user {
            items {
              id
              user_info {
                id
                phone_country_code
                phone
              }
              user_address {
                id
                address_1
                address_2
                address_3
                city
                state
                postal_code
                country
              }
            }
          }
        }
      `
    });

    let user = data.user.items[0];
    let userInfo = user.user_info;
    let userAddress = user.user_address;
    let isPhoneValid = userInfo.phone_country_code && userInfo.phone;
    let isAddressValid =
      userAddress.address_1 &&
      userAddress.address_2 &&
      userAddress.city &&
      userAddress.state &&
      userAddress.postal_code &&
      userAddress.country;

    if (!isPhoneValid) {
      toast.default(t('please update your phone number'));
    }

    if (!isAddressValid) {
      toast.default(t('please update your address'));
    }

    setIsCheckingUserContact(false);

    return isPhoneValid && isAddressValid;
  }

  function submitOrder(nonce: string) {
    toggleModalBraintreePayment();
    setIsMakingPayment(true);
    let checkedCart = getCheckedCart();
    let userOrderInputs = checkedCart.map((cart: any) => ({
      cartId: cart.id,
      shippingMethodId: cart.selectedProductShipping.id,
      message: cart.message || ''
    }));

    createUserOrderMutation({
      variables: {
        paymentNonce: nonce,
        userOrderInputs: userOrderInputs
      }
    });
  }

  const { history } = props;
  let isCheckAllCart = selectedCartIDs.size === userCarts.length;
  let subtotalArray = Array.from(calculateSubtotal().values());
  let totalCheckedQuantity = subtotalArray.reduce(
    (total: number, subtotal: any) => total + Number(subtotal.quantity),
    0
  );
  let totalCheckedPriceUSD = subtotalArray.reduce(
    (total: number, subtotal: any) => total + subtotal.totalPriceUSD,
    0
  );

  let totalCheckedShippingFeeUSD = subtotalArray.reduce(
    (total: number, subtotal: any) => total + subtotal.totalShippingFeeUSD,
    0
  );

  let disabledInput: boolean = isMakingPayment || modal.braintreePayment;
  let checkedCart = getCheckedCart();
  return (
    <Grid container item className={classes.root} spacing={4}>
      <HomeHelmet
        title={t('shopping cart')}
        description={t('shopping cart')}
        keywords={t('shopping cart')}
      />
      <ModalPaymentSuccess
        isOpen={modal.paymentSuccess}
        toggle={toggleModalPaymentSuccess}
        confirmButtonText={t('go to {{target}}', {
          target: t('my order')
        })}
        onClickConfirmButton={() => {
          history.push(homePath('myOrderShip'));
        }}
      />
      <ModalPaymentFailed
        isOpen={modal.paymentFailed}
        toggle={toggleModalPaymentFailed}
      />
      <ModalEditUserAddress
        isOpen={modal.editUserAddress}
        toggle={toggleModalEditUserAddress}
      />
      <ModalEditUserContact
        isOpen={modal.editUserContact}
        toggle={toggleModalEditUserContact}
      />
      <ModalEditUserAccount
        isOpen={modal.editUserAccount}
        toggle={toggleModalEditUserAccount}
      />

      {isCreatingUserOrderMutation ? (
        <DialogProcessingUserOrder open={true} />
      ) : (
        <ModalBraintreePayment
          onConfirmed={(nonce: string) => {
            submitOrder(nonce);
          }}
          toggle={toggleModalBraintreePayment}
          isOpen={modal.braintreePayment}
        />
      )}

      <Modal
        open={modal.confirmOrder}
        onClose={toggleModalConfirmOrder}
        className={classes.modal}
      >
        <Grid
          container
          item
          direction="row"
          xs={12}
          sm={10}
          md={9}
          lg={8}
          xl={7}
          className={classes.modalContentContainer}
        >
          <Paper className={classes.modalPaper}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  component="p"
                  variant="h6"
                  color="inherit"
                  align="center"
                  style={{ textTransform: 'capitalize' }}
                >
                  {t('confirm your order')}
                </Typography>
              </Grid>
              <Grid
                container
                item
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
                spacing={3}
              >
                <Grid
                  container
                  item
                  spacing={2}
                  className={classes.tableContainer}
                >
                  <Table>
                    <TableHead>
                      <TableRow style={{ textTransform: 'capitalize' }}>
                        <TableCell>{t('product')}</TableCell>
                        <TableCell align="center">
                          {t('unit price')} X {t('quantity')}
                        </TableCell>
                        <TableCell align="center">{t('total price')}</TableCell>
                        <TableCell align="center">{t('message')}</TableCell>
                        <TableCell align="center">
                          {t('shipping method')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {checkedCart.map((userCart: any) => {
                        let finalPriceInUSD: number = Number(
                          convertToUSD(
                            userCart.product_type.currency,
                            userCart.product_type.final_price
                          ).toFixed(2)
                        );
                        let shippingFeeInUSD: number = 0;
                        if (userCart.selectedProductShipping) {
                          shippingFeeInUSD = Number(
                            convertToUSD(
                              userCart.selectedProductShipping
                                .shipping_currency,
                              userCart.selectedProductShipping.shipping_fee
                            ).toFixed(2)
                          );
                        }
                        return (
                          <React.Fragment key={userCart.id}>
                            <TableRow>
                              <TableCell style={{ minWidth: '260px' }}>
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <Typography
                                      align="left"
                                      variant="subtitle1"
                                    >
                                      {userCart.product_type.product.title}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      {t('variation')}:{' '}
                                      {userCart.product_type.title}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </TableCell>
                              <TableCell
                                align="center"
                                className={classes.unitPriceTableCell}
                              >
                                <Typography variant="subtitle1">
                                  USD {finalPriceInUSD} X {userCart.quantity}
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="center"
                                className={classes.totalPriceTableCell}
                              >
                                <Typography variant="subtitle1" color="primary">
                                  USD{' '}
                                  {(
                                    finalPriceInUSD * userCart.quantity
                                  ).toFixed(2)}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Grid item>
                                  {userCart.message ? userCart.message : '-'}
                                </Grid>
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ minWidth: '200px' }}
                              >
                                <Grid item>
                                  <List>
                                    <ListItem
                                      disabled={true}
                                      button
                                      aria-haspopup="true"
                                    >
                                      {userCart.selectedProductShipping ? (
                                        <ListItemText
                                          primary={
                                            userCart.selectedProductShipping
                                              .shipping_method
                                          }
                                          secondary={
                                            Number(
                                              userCart.selectedProductShipping
                                                .shipping_fee
                                            ) !== 0
                                              ? `USD ${(
                                                  shippingFeeInUSD *
                                                  userCart.quantity
                                                ).toFixed(2)}` +
                                                ` (USD ${shippingFeeInUSD} / ${t(
                                                  'item'
                                                )})`
                                              : t('free shipping')
                                          }
                                          secondaryTypographyProps={{
                                            color: 'primary'
                                          }}
                                        />
                                      ) : (
                                        <ListItemText
                                          primary={t('select shipping method')}
                                        />
                                      )}
                                    </ListItem>
                                  </List>
                                </Grid>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                    {subtotalArray.length !== 0 && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="right" colSpan={6}>
                            <Grid
                              container
                              item
                              spacing={1}
                              justify="flex-end"
                              alignItems="center"
                            >
                              <Grid
                                container
                                item
                                justify="flex-end"
                                alignItems="center"
                                spacing={2}
                              >
                                <Grid item xs={3}>
                                  <Typography
                                    variant="subtitle1"
                                    color="inherit"
                                    display="inline"
                                  >
                                    {t('total')}
                                    &nbsp; ({totalCheckedQuantity}
                                    &nbsp;{t('items')}
                                    ):&nbsp;
                                  </Typography>
                                </Grid>
                                <Grid item style={{ minWidth: '150px' }}>
                                  <Typography
                                    variant="h4"
                                    color="primary"
                                    display="inline"
                                    align="right"
                                  >
                                    USD&nbsp;
                                    {(
                                      totalCheckedPriceUSD +
                                      totalCheckedShippingFeeUSD
                                    ).toFixed(2)}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    display="inline"
                                    align="left"
                                  >
                                    &nbsp;est.&nbsp;
                                    <Tooltip
                                      title={t(
                                        'the final payment amount might be slightly different, depends on current exchange rate'
                                      )}
                                      placement="right"
                                    >
                                      <HelpIcon
                                        color="primary"
                                        fontSize="small"
                                      />
                                    </Tooltip>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </Grid>
                <Grid
                  container
                  item
                  justify="flex-end"
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item>
                    <Button onClick={toggleModalConfirmOrder} color="primary">
                      {t('cancel')}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={toggleModalBraintreePayment}
                    >
                      {t('submit')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Modal>

      <Grid container item xs={12}>
        <Paper className={classes.paperDeliveryAddress}>
          <Grid container>
            <Grid container item xs={12} alignItems="center">
              <Grid item>
                <PlaceIcon fontSize="small" color="primary" />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  component="p"
                  color="primary"
                  style={{ textTransform: 'capitalize' }}
                >
                  {t('delivery address')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                display="inline"
                variant="subtitle1"
                color="initial"
                gutterBottom
                style={{ textTransform: 'uppercase', fontWeight: 500 }}
              >
                {context.user.name}
              </Typography>
              <Button
                variant="text"
                onClick={toggleModalEditUserAccount}
                color="primary"
              >
                {t('change')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {Boolean(context.user.user_info.phone_country_code) ? (
                <Typography
                  display="inline"
                  variant="subtitle1"
                  color="initial"
                  gutterBottom
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}
                >
                  {Boolean(context.user.user_info.phone_country_code)
                    ? `(${context.user.user_info.phone_country_code}) ${context.user.user_info.phone}`
                    : '-'}
                </Typography>
              ) : (
                <Typography
                  display="inline"
                  variant="subtitle1"
                  color="initial"
                  gutterBottom
                  style={{ fontStyle: 'italic', fontWeight: 500 }}
                >
                  {t('please update your phone number')}
                </Typography>
              )}

              <Button
                variant="text"
                onClick={toggleModalEditUserContact}
                color="primary"
              >
                {t('change')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {!Boolean(context.user.user_address.address_1) &&
                !Boolean(context.user.user_address.address_2) &&
                !Boolean(context.user.user_address.address_3) && (
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="initial"
                    gutterBottom
                    style={{ fontStyle: 'italic', fontWeight: 500 }}
                  >
                    {t('please update your address')}
                  </Typography>
                )}
              <Typography
                display="inline"
                variant="subtitle1"
                color="initial"
                gutterBottom
              >
                {context.user.user_address.address_1
                  ? context.user.user_address.address_1 + ', '
                  : ''}
                {context.user.user_address.address_2
                  ? context.user.user_address.address_2 + ', '
                  : ''}
                {context.user.user_address.address_3
                  ? context.user.user_address.address_3 + ', '
                  : ''}
                {context.user.user_address.city
                  ? context.user.user_address.city + ', '
                  : ''}
                {context.user.user_address.state
                  ? context.user.user_address.state + ', '
                  : ''}
                {context.user.user_address.postal_code
                  ? context.user.user_address.postal_code + ', '
                  : ''}
                {context.user.user_address.country
                  ? context.user.user_address.country
                  : ''}
              </Typography>

              <Button
                variant="text"
                onClick={toggleModalEditUserAddress}
                color="primary"
              >
                {t('change')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid container item spacing={3} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.paper}>
            <TableRow
              className={classes.tableHeadRow}
              style={{ textTransform: 'capitalize' }}
            >
              <TableCell
                padding="checkbox"
                align="left"
                className={classes.checkboxTableCell}
              >
                <Checkbox
                  color="primary"
                  disabled={disabledInput}
                  checked={isCheckAllCart}
                  onChange={onChangeCheckOrUncheckAll}
                />
              </TableCell>
              <TableCell className={classes.productTableCell}>
                {t('product')}
              </TableCell>
              <TableCell align="center" className={classes.unitPriceTableCell}>
                {t('unit price')}
              </TableCell>
              <TableCell align="center" className={classes.quantityTableCell}>
                {t('quantity')}
              </TableCell>
              <TableCell align="center" className={classes.totalPriceTableCell}>
                {t('total price')}
              </TableCell>
              <TableCell align="center" className={classes.actionsTableCell}>
                {t('actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          {isUserCartLoading && (
            <TableBody>
              <TableRow style={{ width: '100%', display: 'inline-table' }}>
                <TableCell align="center" rowSpan={6}>
                  <Grid
                    container
                    item
                    xs={12}
                    justify={'center'}
                    style={{ marginTop: '24px' }}
                  >
                    <CircularProgress />
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!userCartError && !isUserCartLoading && !Boolean(userCarts.length) && (
            <Grid
              container
              xs={12}
              justify="center"
              alignItems="center"
              direction="column"
              spacing={1}
            >
              <Grid item>
                <Typography variant="h5" component="h2" gutterBottom>
                  {t('your shopping cart is empty')}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  {...({
                    component: Link,
                    to: homePath('home')
                  } as any)}
                  color="primary"
                >
                  {t('go shopping now')}
                </Button>
              </Grid>
            </Grid>
          )}

          {userCartError && <>Error!</>}

          {!userCartError && !isUserCartLoading && Boolean(userCarts.length) && (
            <>
              <TableBody
                className={classNames(classes.paper, classes.tableBody)}
              >
                {userCarts.map((userCart: any, index: number) => {
                  let isChecked = selectedCartIDs.has(userCart.id);

                  return (
                    <React.Fragment key={userCart.id}>
                      <TableRow className={classes.tableBodyRow}>
                        <TableCell
                          padding="checkbox"
                          className={classes.checkboxTableCell}
                        >
                          <Checkbox
                            color="primary"
                            disabled={disabledInput}
                            checked={isChecked}
                            onChange={e => {
                              let array = Array.from(selectedCartIDs);
                              if (e.target.checked) {
                                array.push(userCart.id);
                                setSelectedCartIDs(new Set(array));
                              } else {
                                array = array.filter(
                                  (id: number) => id !== userCart.id
                                );
                                setSelectedCartIDs(new Set(array));
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.productTableCell}>
                          <Grid container spacing={1}>
                            <Grid item>
                              <Link
                                to={homePath('product', {
                                  productId: userCart.product_type.product.id
                                })}
                              >
                                <Image
                                  useLazyLoad
                                  alt={userCart.product_type.product.title}
                                  src={
                                    userCart.product_type.product
                                      .product_image[0].image_small
                                  }
                                  style={{
                                    width: '110px',
                                    height: '85px'
                                  }}
                                />
                              </Link>
                            </Grid>
                            <Grid item>
                              <ProductTitle
                                variant="subtitle1"
                                color={'inherit'}
                                align="left"
                                withLink
                                product={userCart.product_type.product}
                              />
                              <Typography variant="subtitle2">
                                {t('variation')}: {userCart.product_type.title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.unitPriceTableCell}
                        >
                          {userCart.product_type.discount && (
                            <Typography
                              variant="subtitle1"
                              style={{
                                textDecoration: 'line-through',
                                color: '#929292'
                              }}
                            >
                              {userCart.product_type.currency}{' '}
                              {userCart.product_type.price}
                            </Typography>
                          )}
                          <Typography variant="subtitle1">
                            {userCart.product_type.currency}{' '}
                            {userCart.product_type.final_price}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.quantityTableCell}
                        >
                          <Grid container justify="center" spacing={1}>
                            <Grid item xs={12}>
                              <InputQuantity
                                error={userCart.errorQuantity}
                                disabled={disabledInput}
                                value={userCart.quantity}
                                onChange={value => {
                                  setUserCarts(
                                    update(userCarts, {
                                      [index]: {
                                        quantity: {
                                          $set: value
                                        },
                                        errorQuantity: {
                                          $set: false
                                        }
                                      }
                                    })
                                  );
                                  setUserCartQuantityMutation({
                                    variables: {
                                      user_cart_id: userCart.id,
                                      quantity: value
                                    }
                                  });
                                }}
                                min={1}
                                step={1}
                                max={userCart.product_type.quantity}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body2"
                                align="center"
                                className={
                                  userCart.errorQuantity
                                    ? classes.itemAvailableError
                                    : classes.itemAvailable
                                }
                                style={{
                                  textTransform: 'lowercase'
                                }}
                              >
                                {userCart.product_type.quantity}{' '}
                                {t('piece available')}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.totalPriceTableCell}
                        >
                          <Typography variant="subtitle1" color="primary">
                            {userCart.product_type.currency}{' '}
                            {(
                              userCart.product_type.final_price *
                              userCart.quantity
                            ).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.actionsTableCell}
                        >
                          <UserCartRemoveButton<
                            IRemoveProductTypeFromUserCartMutationFragmentDefaultFragment
                          >
                            userCart={userCart}
                            fragment={
                              removeProductTypeFromUserCartMutationFragments.DefaultFragment
                            }
                            disabled={disabledInput}
                            onCompleted={data => {
                              toast.default(
                                t('product successfully remove from cart')
                              );
                              setUserCarts(
                                update(userCarts, {
                                  $splice: [
                                    [
                                      userCarts.findIndex(
                                        (cart: any) =>
                                          cart.id ===
                                          data
                                            .removeProductTypeFromUserCartMutation[0]
                                            .id
                                      ),
                                      1
                                    ]
                                  ]
                                })
                              );
                            }}
                            onError={() => {
                              toast.error(
                                t(
                                  'update product quantity failed. please refresh the page and try again.'
                                )
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      {isChecked && (
                        <TableRow
                          className={classNames(
                            classes.tableBodyRow,
                            classes.tableShippingRow
                          )}
                        >
                          <TableCell
                            padding="checkbox"
                            className={classes.checkboxTableCell}
                          >
                            <div style={{ width: '13px' }} />
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              spacing={4}
                              alignItems="center"
                              justify="flex-start"
                            >
                              <Grid item xs={7}>
                                <TextField
                                  disabled={disabledInput}
                                  label={t('message')}
                                  value={userCart.message}
                                  onChange={(e: { target: { value: any } }) => {
                                    setUserCarts(
                                      update(userCarts, {
                                        [index]: {
                                          message: {
                                            $set: e.target.value
                                          }
                                        }
                                      })
                                    );
                                  }}
                                  placeholder={`(${t('optional')}) ${t(
                                    'leave a message to seller'
                                  )}`}
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <Typography
                                  align="right"
                                  variant="subtitle1"
                                  color="primary"
                                  style={{
                                    textTransform: 'capitalize'
                                  }}
                                >
                                  {t('shipping option')}:
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <List>
                                  <ListItem
                                    disabled={disabledInput}
                                    button
                                    aria-haspopup="true"
                                    onClick={e => {
                                      setUserCarts(
                                        update(userCarts, {
                                          [index]: {
                                            shippingAnchorEl: {
                                              $set: e.currentTarget
                                            }
                                          }
                                        })
                                      );
                                    }}
                                  >
                                    {userCart.selectedProductShipping ? (
                                      <ListItemText
                                        primary={
                                          userCart.selectedProductShipping
                                            .shipping_method
                                        }
                                        secondary={
                                          Number(
                                            userCart.selectedProductShipping
                                              .shipping_fee
                                          ) !== 0
                                            ? `${
                                                userCart.selectedProductShipping
                                                  .shipping_currency
                                              } ${(
                                                userCart.selectedProductShipping
                                                  .shipping_fee *
                                                userCart.quantity
                                              ).toFixed(2)}` +
                                              ` (${
                                                userCart.selectedProductShipping
                                                  .shipping_currency
                                              } ${
                                                userCart.selectedProductShipping
                                                  .shipping_fee
                                              } / ${t('item')})`
                                            : t('free shipping')
                                        }
                                        secondaryTypographyProps={{
                                          color: 'primary'
                                        }}
                                      />
                                    ) : (
                                      <ListItemText
                                        primary={t('select shipping method')}
                                      />
                                    )}
                                  </ListItem>
                                </List>
                                <Menu
                                  anchorEl={userCart.shippingAnchorEl}
                                  open={Boolean(userCart.shippingAnchorEl)}
                                  onClose={() => {
                                    setUserCarts(
                                      update(userCarts, {
                                        [index]: {
                                          shippingAnchorEl: {
                                            $set: null
                                          }
                                        }
                                      })
                                    );
                                  }}
                                >
                                  {userCart.product_type.product.product_shipping.map(
                                    (productShipping: any) => {
                                      let isDisabled =
                                        productShipping.is_disabled ||
                                        (productShipping.shipping_country !==
                                          PRODUCT_SHIPPING.DEFAULT_SHIPPING_COUNTRY &&
                                          productShipping.shipping_country !==
                                            context.user.user_address.country);

                                      if (isDisabled) return null;

                                      return (
                                        <MenuItem
                                          key={productShipping.id}
                                          disabled={isDisabled}
                                          className={classNames(
                                            classes.shippingMenuItem
                                          )}
                                          selected={
                                            userCart.selectedProductShipping &&
                                            userCart.selectedProductShipping
                                              .id === productShipping.id
                                          }
                                          onClick={() => {
                                            setUserCarts(
                                              update(userCarts, {
                                                [index]: {
                                                  selectedProductShipping: {
                                                    $set: productShipping
                                                  }
                                                }
                                              })
                                            );
                                          }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="initial"
                                            display="inline"
                                          >
                                            {productShipping.shipping_method}
                                          </Typography>

                                          <Typography
                                            variant="subtitle2"
                                            color="primary"
                                            display="inline"
                                          >
                                            &nbsp;(
                                            {Number(
                                              productShipping.shipping_fee
                                            ) !== 0 ? (
                                              <>
                                                {
                                                  productShipping.shipping_currency
                                                }{' '}
                                                {productShipping.shipping_fee}
                                              </>
                                            ) : (
                                              t('free shipping')
                                            )}
                                            )
                                          </Typography>
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Menu>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
              <TableBody
                className={classNames(classes.paper, classes.tableBody)}
              >
                <TableRow
                  className={classNames(
                    classes.tableBodyRow,
                    classes.tableRowSubtotal
                  )}
                >
                  <TableCell
                    padding="checkbox"
                    className={classes.checkboxTableCell}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          disabled={disabledInput}
                          checked={isCheckAllCart}
                          onChange={onChangeCheckOrUncheckAll}
                        />
                      }
                      label={t('select all')}
                      style={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Grid
                      container
                      item
                      spacing={1}
                      justify="flex-end"
                      alignItems="center"
                    >
                      {subtotalArray.map((subtotal: any) => (
                        <React.Fragment key={subtotal.currency}>
                          <Grid
                            container
                            item
                            justify="flex-end"
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid item xs={3}>
                              <Typography
                                variant="subtitle1"
                                color="inherit"
                                display="inline"
                              >
                                ({subtotal.currency})&nbsp;
                                {t('subtotal')}
                                &nbsp; ({subtotal.quantity}&nbsp;
                                {t('items')}):&nbsp;
                              </Typography>
                            </Grid>
                            <Grid item style={{ minWidth: '180px' }}>
                              <Typography
                                variant="h5"
                                color="primary"
                                display="inline"
                                align="right"
                              >
                                {subtotal.currency}{' '}
                                {subtotal.totalPrice.toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item style={{ minWidth: '120px' }}>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                display="inline"
                                align="right"
                              >
                                &nbsp;(USD {subtotal.totalPriceUSD.toFixed(2)})
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            justify="flex-end"
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid item xs={3}>
                              <Typography
                                variant="subtitle1"
                                color="inherit"
                                display="inline"
                              >
                                ({subtotal.currency})&nbsp;
                                {t('shipping fee')}
                                &nbsp; ({subtotal.quantity}&nbsp;
                                {t('items')}):&nbsp;
                              </Typography>
                            </Grid>
                            <Grid item style={{ minWidth: '180px' }}>
                              <Typography
                                variant="h5"
                                color="primary"
                                display="inline"
                                align="right"
                              >
                                {subtotal.shipping_currency}{' '}
                                {subtotal.totalShippingFee.toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item style={{ minWidth: '120px' }}>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                display="inline"
                                align="right"
                              >
                                &nbsp;(USD{' '}
                                {subtotal.totalShippingFeeUSD.toFixed(2)})
                              </Typography>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      ))}
                      {subtotalArray.length === 0 && (
                        <>
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            display="inline"
                          >
                            {t('subtotal')}
                            &nbsp; (0&nbsp;{t('items')}):&nbsp;
                          </Typography>
                          <Typography
                            variant="h5"
                            color="primary"
                            display="inline"
                          >
                            0.00
                          </Typography>
                        </>
                      )}
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
              {subtotalArray.length !== 0 && (
                <TableBody
                  className={classNames(classes.paper, classes.tableBody)}
                >
                  <TableRow
                    className={classNames(
                      classes.tableBodyRow,
                      classes.tableRowTotal
                    )}
                  >
                    <TableCell align="right">
                      <Grid
                        container
                        item
                        spacing={1}
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Grid
                          container
                          item
                          justify="flex-end"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item xs={3}>
                            <Typography
                              variant="subtitle1"
                              color="inherit"
                              display="inline"
                            >
                              {t('total')}
                              &nbsp; ({totalCheckedQuantity}
                              &nbsp;{t('items')}
                              ):&nbsp;
                            </Typography>
                          </Grid>
                          <Grid item style={{ minWidth: '150px' }}>
                            <Typography
                              variant="h4"
                              color="primary"
                              display="inline"
                              align="right"
                            >
                              USD&nbsp;
                              {(
                                totalCheckedPriceUSD +
                                totalCheckedShippingFeeUSD
                              ).toFixed(2)}
                            </Typography>
                            <Typography
                              variant="body2"
                              display="inline"
                              align="left"
                            >
                              &nbsp;est.&nbsp;
                              <Tooltip
                                title={t(
                                  'the final payment amount might be slightly different, depends on current exchange rate'
                                )}
                                placement="right"
                              >
                                <HelpIcon color="primary" fontSize="small" />
                              </Tooltip>
                            </Typography>
                          </Grid>
                          <Grid item>
                            {isCheckingUserContact ? (
                              <Button
                                disabled
                                variant="contained"
                                size="large"
                                color="primary"
                              >
                                {t('checkout')}
                              </Button>
                            ) : (
                              <Button
                                disabled={disabledInput}
                                onClick={checkout}
                                variant="contained"
                                size="large"
                                color="primary"
                              >
                                {t('checkout')}
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </>
          )}
        </Table>
      </Grid>
    </Grid>
  );
}

export default withRouter(UserCart);
