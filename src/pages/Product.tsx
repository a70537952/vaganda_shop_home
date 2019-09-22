import React, { useContext, useEffect, useState } from 'react';
import HomeHelmet from '../components/home/HomeHelmet';
import { AppContext } from '../contexts/Context';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import Grid from '@material-ui/core/Grid';
import ProductNotFound from '../components/home/Product/ProductNotFound';
import Paper from '@material-ui/core/Paper';
import ReactImageMagnify from 'react-image-magnify';
import NukaCarousel from '../components/NukaCarousel';
import Typography from '@material-ui/core/Typography';
import PRODUCT from '../constant/PRODUCT';
import Button from '@material-ui/core/Button';
import ButtonImage from '../components/ButtonImage';
import InputQuantity from '../components/_input/InputQuantity';
import Tooltip from '@material-ui/core/Tooltip';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ProductList from '../components/home/Product/ProductList';
import HelpIcon from '@material-ui/icons/Help';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import ModalLoginRegister from '../components/home/Modal/ModalLoginRegister';
import update from 'immutability-helper';
import { homePath } from '../utils/RouteUtil';
import queryString from 'query-string';
import Image from '../components/Image';
import UserOrderDetailCommentList from '../components/home/UserOrderDetailComment/UserOrderDetailCommentList';
import ShopCard from '../components/home/Shop/ShopCard';
import ShopStatistics from '../components/home/Shop/ShopStatistics';
import useToast from '../components/_hook/useToast';
import { useAddProductTypeToUserCartMutation } from '../graphql/mutation/userCartMutation/AddProductTypeToUserCartMutation';
import { IAddProductTypeToUserCartMutationFragmentProduct } from '../graphql/fragmentType/mutation/userCartMutation/AddProductTypeToUserCartMutationFragmentInterface';
import { addProductTypeToUserCartMutationFragments } from '../graphql/fragment/mutation/userCartMutation/AddProductTypeToUserCartMutationFragment';
import { useProductQuery } from '../graphql/query/ProductQuery';
import { productFragments } from '../graphql/fragment/query/ProductFragment';
import { IProductFragmentProduct } from '../graphql/fragmentType/query/ProductFragmentInterface';

interface IProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 8px',
    [theme.breakpoints.up('sm')]: {
      padding: '8px 32px'
    }
  },
  paperContainer: {
    width: '100%',
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    }
  },
  paperTitle: {
    width: '100%',
    backgroundColor: '#fafafa',
    padding: theme.spacing(2)
  },
  selectedImageContainer: {
    minHeight: '450px',
    marginBottom: theme.spacing(1)
  },
  paperProductPrice: {
    backgroundColor: '#fafafa',
    padding: theme.spacing(2)
  },
  discountPercentage: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    padding: '2px 8px',
    marginLeft: '15px'
  },
  containerProductOrder: {
    padding: theme.spacing(2)
  },
  buttonAddToCartBuyNow: {
    textTransform: 'capitalize',
    padding: '16px 24px'
  },
  containerProductExtraOption: {
    padding: theme.spacing(3)
  },
  containerProductDescription: {
    padding: theme.spacing(2),
    '&>div': {
      width: '100%'
    },
    '& img': {
      width: '100%'
    }
  },
  containerProductExtraOptionValue: {
    fontWeight: 'bold'
  },
  paperProductStatus: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2)
  },
  productCarouselImage: {
    height: '88px',
    objectFit: 'cover'
  }
}));

function Product(props: IProps & RouteComponentProps<{ productId: string }>) {
  const classes = useStyles();
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { toast } = useToast();
  const { match, history } = props;

  const [modal, setModal] = useState<{
    loginRegister: boolean;
  }>({
    loginRegister: false
  });

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedProductType, setSelectedProductType] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setSelectedImage(null);
    setSelectedProductType(null);
    setQuantity(1);
  }, [match.params.productId]);

  const { loading, data, error } = useProductQuery<IProductFragmentProduct>(
    productFragments.Product,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: match.params.productId
      },
      onCompleted: data => {
        if (data.product.items.length) {
          setSelectedImage(data.product.items[0].product_image[0]);
        }
        setTimeout(() => {
          dispatchEvent(new Event('resize'));
        }, 1500);
      }
    }
  );

  const [
    addProductTypeToUserCartMutation,
    { loading: isAddingProductTypeToUserCartMutation }
  ] = useAddProductTypeToUserCartMutation<
    IAddProductTypeToUserCartMutationFragmentProduct
  >(addProductTypeToUserCartMutationFragments.Product, {
    onCompleted: () => {
      toast.default(t('product successfully added to cart'));
    },
    onError: () => {
      toast.error(
        t('something went wrong. please refresh the page and try again.')
      );
    }
  });

  const [
    addProductTypeToUserCartMutationBuyNow,
    { loading: isAddingProductTypeToUserCartMutationBuyNow }
  ] = useAddProductTypeToUserCartMutation<
    IAddProductTypeToUserCartMutationFragmentProduct
  >(addProductTypeToUserCartMutationFragments.Product, {
    onCompleted: data => {
      toast.default(t('product successfully added to cart'));
      history.push({
        pathname: homePath('userCart'),
        search:
          '?' +
          queryString.stringify({
            cartID: data.addProductTypeToUserCartMutation.id
          })
      });
    },
    onError: () => {
      toast.error(
        t('something went wrong. please refresh the page and try again.')
      );
    }
  });

  function toggleModalLoginRegister() {
    setModal(modal =>
      update(modal, {
        loginRegister: { $set: !modal.loginRegister }
      })
    );
  }

  function renderPrice(productTypes: any[]) {
    let sortProductType = productTypes.sort(
      (a: any, b: any) => a.final_price - b.final_price
    );
    let productType = sortProductType[0];
    let priceString = productType.currency + ' ' + productType.final_price;
    let isMultipleProductType = !!sortProductType[1];
    if (
      isMultipleProductType &&
      productType.final_price !==
        sortProductType[sortProductType.length - 1].final_price
    ) {
      // multiple product type
      priceString +=
        ' ~ ' +
        sortProductType[sortProductType.length - 1].currency +
        ' ' +
        sortProductType[sortProductType.length - 1].final_price;
      return (
        <Typography variant="h5" color="primary">
          {priceString}
        </Typography>
      );
    } else {
      if (productType.discount_amount > 0) {
        // has discount
        return (
          <>
            <Typography
              variant="subtitle1"
              display="inline"
              style={{ textDecoration: 'line-through', color: '#929292' }}
            >
              {productType.currency + ' ' + productType.price}
            </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography variant="h4" display="inline" color="primary">
              {priceString}
            </Typography>
            &nbsp;
            {productType.discount_unit === PRODUCT.DISCOUNT_UNIT.PERCENTAGE && (
              <Typography
                variant="body2"
                className={classes.discountPercentage}
              >
                {productType.discount}% {t('OFFER')}
              </Typography>
            )}
            {productType.discount_unit === PRODUCT.DISCOUNT_UNIT.PRICE && (
              <Typography
                variant="body2"
                className={classes.discountPercentage}
              >
                {productType.currency} {productType.discount_amount}{' '}
                {t('OFFER')}
              </Typography>
            )}
          </>
        );
      } else {
        return (
          <Typography variant="h5" color="primary">
            {priceString}
          </Typography>
        );
      }
    }
  }

  function onClickAddProductTypeToUserCart(mutation: any) {
    if (context.user) {
      if (!selectedProductType) {
        toast.default(t('please select product variation'));
      } else if (quantity <= 0) {
        toast.default(t('please enter valid quantity'));
      } else {
        mutation({
          variables: {
            product_type_id: selectedProductType.id,
            quantity: quantity
          }
        });
      }
    } else {
      toggleModalLoginRegister();
    }
  }

  function onClickSelectProductType(product: any, productType: any) {
    let isSelected =
      selectedProductType && selectedProductType.id === productType.id;
    let isOutOfStock = productType.quantity <= 0;

    if (isSelected) {
      if (productType.product_type_image.length > 0) {
        setSelectedImage(product.product_image[0]);
      }
      setSelectedProductType(null);
      setQuantity(1);
    } else {
      if (productType.product_type_image.length > 0) {
        setSelectedImage(product.product_type_image[0]);
      }

      if (!isOutOfStock) {
        setSelectedProductType(productType);
        setQuantity(1);
      }
    }
  }

  if (error) return <>Error!</>;
  if (loading) return null;
  if (!data) return null;

  let product: IProductFragmentProduct = data.product.items[0];

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <>
      <ModalLoginRegister
        toggle={toggleModalLoginRegister}
        isOpen={modal.loginRegister}
      />
      <Grid container item className={classes.root}>
        <HomeHelmet
          title={product.title}
          description={product.description}
          keywords={product.title}
          ogImage={product.product_image[0].image_medium}
        />
        <Grid container spacing={3}>
          {!loading && !product.is_publish && (
            <Grid container item xs={12}>
              <Paper square className={classes.paperProductStatus}>
                <Grid container item spacing={1} xs={12} alignItems="center">
                  <Typography variant="subtitle1" style={{ color: 'white' }}>
                    {t('this product is unpublished product')}
                  </Typography>
                  &nbsp;
                  <Tooltip
                    title={t(
                      'only shop admin with view product permission can view this product'
                    )}
                    placement="right"
                  >
                    <HelpIcon style={{ color: '#fff' }} fontSize="small" />
                  </Tooltip>
                </Grid>
              </Paper>
            </Grid>
          )}
          <Grid container item xs={12}>
            <Paper square className={classes.paperContainer}>
              <Grid container item spacing={1} xs={12}>
                <Grid container item xs={12} md={6} lg={5}>
                  {loading ? (
                    <Skeleton variant={'rect'} height={540} width={'100%'} />
                  ) : (
                    <>
                      <Grid
                        container
                        item
                        alignItems="center"
                        justify="center"
                        className={classes.selectedImageContainer}
                        style={{ backgroundColor: '#000' }}
                      >
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: product.title,
                              isFluidWidth: true,
                              src: selectedImage
                                ? selectedImage.image_extra
                                : ''
                            },
                            largeImage: {
                              alt: product.title,
                              width: 1200,
                              height: 1200,
                              src: selectedImage
                                ? selectedImage.image_original
                                : ''
                            }
                          }}
                          enlargedImagePosition={'over'}
                        />
                      </Grid>
                      <NukaCarousel slidesToShow={5} heightMode="first">
                        {product.product_image.map(image => (
                          <Image
                            useLazyLoad
                            className={classes.productCarouselImage}
                            key={image.id}
                            src={image.image_small}
                            onClick={() => {
                              setSelectedImage(image);
                            }}
                          />
                        ))}
                      </NukaCarousel>
                    </>
                  )}
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <Grid item xs={12}>
                    {loading ? (
                      <Skeleton height={50} width={300} />
                    ) : (
                      <Typography variant="h5" gutterBottom>
                        {product.title}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      square
                      className={classes.paperProductPrice}
                      elevation={0}
                    >
                      {loading ? (
                        <Skeleton height={45} width={380} />
                      ) : (
                        <Grid container alignItems="center">
                          {selectedProductType
                            ? renderPrice([selectedProductType])
                            : renderPrice(product.product_type)}
                        </Grid>
                      )}
                    </Paper>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={4}
                    className={classes.containerProductOrder}
                  >
                    {loading ? (
                      <Grid
                        container
                        item
                        xs={12}
                        spacing={2}
                        alignItems="center"
                      >
                        <Skeleton height={60} width={320} />
                      </Grid>
                    ) : (
                      <Grid
                        container
                        item
                        xs={12}
                        spacing={2}
                        alignItems="center"
                      >
                        <Grid container item xs={12} sm={2} md={3} lg={2}>
                          <Typography variant="subtitle1">
                            {t('variation')}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          sm={10}
                          md={9}
                          lg={10}
                          spacing={1}
                          alignItems="center"
                        >
                          {product.product_type.map((productType: any) => {
                            let isSelected =
                              selectedProductType &&
                              selectedProductType.id === productType.id;
                            let isOutOfStock = productType.quantity <= 0;
                            return (
                              <Grid item key={productType.id}>
                                <Tooltip
                                  placement="top"
                                  title={
                                    isOutOfStock
                                      ? t('out of stock')
                                      : productType.title
                                  }
                                >
                                  <div>
                                    {!isOutOfStock &&
                                    productType.product_type_image.length >
                                      0 ? (
                                      <ButtonImage
                                        isSelected={isSelected}
                                        onClick={() => {
                                          onClickSelectProductType(
                                            product,
                                            productType
                                          );
                                        }}
                                        image={
                                          productType.product_type_image[0]
                                        }
                                        width={'80px'}
                                        height={'45px'}
                                      />
                                    ) : (
                                      <Button
                                        color={
                                          isSelected ? 'primary' : 'default'
                                        }
                                        variant={
                                          isSelected ? 'contained' : 'outlined'
                                        }
                                        size="large"
                                        disabled={isOutOfStock}
                                        onClick={() => {
                                          onClickSelectProductType(
                                            product,
                                            productType
                                          );
                                        }}
                                      >
                                        {productType.title}
                                      </Button>
                                    )}
                                  </div>
                                </Tooltip>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Grid>
                    )}
                    {loading ? (
                      <Grid
                        container
                        item
                        xs={12}
                        spacing={2}
                        alignItems="center"
                      >
                        <Skeleton height={55} width={380} />
                      </Grid>
                    ) : (
                      <Grid
                        container
                        item
                        xs={12}
                        spacing={2}
                        alignItems="center"
                      >
                        <Grid container item xs={12} sm={2} md={3} lg={2}>
                          <Typography variant="subtitle1">
                            {t('quantity')}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          sm={10}
                          md={9}
                          lg={10}
                          spacing={2}
                          alignItems="center"
                        >
                          <Grid item>
                            <InputQuantity
                              value={quantity}
                              onChange={value => {
                                setQuantity(value);
                              }}
                              min={1}
                              step={1}
                              max={
                                selectedProductType
                                  ? selectedProductType.quantity
                                  : undefined
                              }
                            />
                          </Grid>

                          {selectedProductType && (
                            <Grid item>
                              <Typography
                                variant="subtitle1"
                                style={{
                                  textTransform: 'lowercase',
                                  color: '#888'
                                }}
                              >
                                {selectedProductType.quantity}{' '}
                                {t('piece available')}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    )}
                    {loading ? (
                      <Grid container item xs={12} lg={8} spacing={2}>
                        <Skeleton variant={'rect'} height={85} width={430} />
                      </Grid>
                    ) : (
                      <Grid
                        container
                        item
                        xs={12}
                        lg={8}
                        alignItems={'center'}
                        spacing={2}
                      >
                        <Grid item xs={6}>
                          {isAddingProductTypeToUserCartMutation ? (
                            <Button
                              size="large"
                              variant="outlined"
                              color="primary"
                              fullWidth
                              className={classes.buttonAddToCartBuyNow}
                            >
                              <CircularProgress size={20} />
                            </Button>
                          ) : (
                            <Button
                              size="large"
                              variant="outlined"
                              color="primary"
                              fullWidth
                              className={classes.buttonAddToCartBuyNow}
                              onClick={() => {
                                onClickAddProductTypeToUserCart(
                                  addProductTypeToUserCartMutation
                                );
                              }}
                            >
                              <AddShoppingCartIcon fontSize="small" />
                              &nbsp;
                              {t('add to cart')}
                            </Button>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          {isAddingProductTypeToUserCartMutationBuyNow ? (
                            <Button
                              size="large"
                              variant="contained"
                              color="primary"
                              fullWidth
                              className={classes.buttonAddToCartBuyNow}
                            >
                              <CircularProgress size={20} color={'inherit'} />
                            </Button>
                          ) : (
                            <Button
                              size="large"
                              variant="contained"
                              color="primary"
                              fullWidth
                              className={classes.buttonAddToCartBuyNow}
                              onClick={() => {
                                onClickAddProductTypeToUserCart(
                                  addProductTypeToUserCartMutationBuyNow
                                );
                              }}
                            >
                              {t('buy now')}
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {!loading && (
            <>
              <Grid container item xs={12} spacing={1}>
                <Grid container item xs={12} md={4}>
                  <ShopCard shop={product.shop} />
                </Grid>
                <Grid container item xs={12} md={8}>
                  <ShopStatistics shop={product.shop} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Paper square className={classes.paperContainer}>
                  <Grid container item xs={12}>
                    <Paper square className={classes.paperTitle} elevation={0}>
                      <Grid container alignItems="center">
                        <Typography
                          variant="h6"
                          style={{ textTransform: 'capitalize' }}
                        >
                          {t('product specifications')}
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    className={classes.containerProductExtraOption}
                  >
                    <Grid container item xs={12} sm={6} spacing={2}>
                      <Grid container item xs={4} md={2}>
                        <Typography variant="body1">{t('length')}</Typography>
                      </Grid>
                      <Grid container item xs={8} md={10}>
                        <Typography
                          variant="body1"
                          className={classes.containerProductExtraOptionValue}
                        >
                          {product.length} {product.length_unit}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} spacing={2}>
                      <Grid container item xs={4} md={2}>
                        <Typography variant="body1">{t('width')}</Typography>
                      </Grid>
                      <Grid container item xs={8} md={10}>
                        <Typography
                          variant="body1"
                          className={classes.containerProductExtraOptionValue}
                        >
                          {product.width} {product.width_unit}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} spacing={2}>
                      <Grid container item xs={4} md={2}>
                        <Typography variant="body1">{t('height')}</Typography>
                      </Grid>
                      <Grid container item xs={8} md={10}>
                        <Typography
                          variant="body1"
                          className={classes.containerProductExtraOptionValue}
                        >
                          {product.height} {product.height_unit}
                        </Typography>
                      </Grid>
                    </Grid>
                    {product.extra_option.map((option: any, index: number) => (
                      <Grid
                        container
                        item
                        xs={12}
                        md={6}
                        key={index}
                        spacing={2}
                      >
                        <Grid container item xs={4} md={2}>
                          <Typography variant="body1">{option.key}</Typography>
                        </Grid>
                        <Grid container item xs={8} md={10}>
                          <Typography
                            variant="body1"
                            className={classes.containerProductExtraOptionValue}
                          >
                            {option.value}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container item xs={12}>
                    <Paper square className={classes.paperTitle} elevation={0}>
                      <Grid container alignItems="center">
                        <Typography
                          variant="h6"
                          style={{ textTransform: 'capitalize' }}
                        >
                          {t('product description')}
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    className={classes.containerProductDescription}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description
                      }}
                    />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper square className={classes.paperContainer}>
                  <Grid container spacing={1}>
                    <Grid container item xs={12}>
                      <Paper
                        square
                        className={classes.paperTitle}
                        elevation={0}
                      >
                        <Grid container alignItems="center">
                          <Typography
                            variant="h6"
                            style={{
                              textTransform: 'capitalize'
                            }}
                          >
                            {t('product comment')}
                          </Typography>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                      <UserOrderDetailCommentList
                        variables={{
                          product_id: product.id,
                          sort_created_at: 'desc'
                        }}
                        gridProps={{
                          xs: 12,
                          sm: 12,
                          md: 12,
                          lg: 12
                        }}
                        product_rating={product.product_rating}
                        one_star_comment_count={product.one_star_comment_count}
                        two_star_comment_count={product.two_star_comment_count}
                        three_star_comment_count={
                          product.three_star_comment_count
                        }
                        four_star_comment_count={
                          product.four_star_comment_count
                        }
                        five_star_comment_count={
                          product.five_star_comment_count
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid container alignItems="center">
                  <Typography
                    variant="h6"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {t('product from the same shop')}
                  </Typography>
                </Grid>
                <ProductList
                  variables={{
                    shop_id: product.shop_id,
                    limit: 6,
                    sort_created_at: 'desc',
                    where_not_id: product.id
                  }}
                  gridProps={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 2
                  }}
                  hideSort
                  disableLoadMore
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(Product);
