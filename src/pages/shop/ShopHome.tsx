import React, { useState } from 'react';
import HomeHelmet from '../../components/home/HomeHelmet';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import Grid from '@material-ui/core/Grid';
import ShopNotFound from '../../components/home/Shop/ShopNotFound';
import ShopCard from '../../components/home/Shop/ShopCard';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import ListIcon from '@material-ui/icons/List';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ProductList from '../../components/home/Product/ProductList';
import Skeleton from '@material-ui/lab/Skeleton';
import ShopStatistics from '../../components/home/Shop/ShopStatistics';
import Image from '../../components/Image';
import { useShopSettingQuery } from '../../graphql/query/ShopSettingQuery';
import { shopSettingFragments } from '../../graphql/fragment/query/ShopSettingFragment';
import { IShopSettingFragmentShopHome } from '../../graphql/fragmentType/query/ShopSettingFragmentInterface';

interface IProps {}

const useStyles = makeStyles((theme: Theme) => {
  let marginReponsive = {
    [theme.breakpoints.only('xl')]: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5)
    },
    [theme.breakpoints.only('lg')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4)
    },
    [theme.breakpoints.only('md')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.only('xs')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  };
  return {
    header: {
      ...marginReponsive
    },
    tabContent: {
      ...marginReponsive,
      paddingTop: '20px'
    },
    categoryList: {
      '&:first-child': {
        marginTop: theme.spacing(2)
      }
    },
    paperTab: {
      width: '100%'
    },
    paperTabContent: {
      padding: theme.spacing(2),
      width: '100%'
    },
    shopStatisticsPaper: {
      width: '100%',
      padding: theme.spacing(2)
    },
    categoryContainer: {
      marginTop: theme.spacing(2)
    },
    categoryIcon: {
      margin: 0
    },
    selectedListItem: {
      backgroundColor: theme.palette.primary.main + ' !important'
    }
  };
});

function ShopHome(props: IProps & RouteComponentProps<{ account: string }>) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [categoryTabValue, setCategoryTabValue] = useState<number>(0);
  const [whereShopProductCategoryId, setWhereShopProductCategoryId] = useState<
    string
  >('');

  const { match } = props;
  const { loading, data, error } = useShopSettingQuery<
    IShopSettingFragmentShopHome
  >(shopSettingFragments.ShopHome, {
    variables: {
      title: 'account',
      value: match.params.account
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });
  if (error) return <>Error!</>;
  if (loading) return null;
  if (!data) return null;

  let shopSetting: IShopSettingFragmentShopHome = data.shopSetting.items[0];

  if (!shopSetting) {
    return <ShopNotFound />;
  }

  return (
    <Grid container item spacing={2}>
      <>
        {loading ? (
          <Skeleton variant={'rect'} height={180} />
        ) : (
          <>
            <HomeHelmet
              title={shopSetting.shop.name}
              description={shopSetting.shop.shop_info.summary}
              keywords={shopSetting.shop.shop_info.summary}
              ogImage={shopSetting.shop.shop_info.logo_large}
            />
            <Grid container item className={classes.header} spacing={1}>
              <Grid container item xs={12} md={4}>
                <ShopCard shop={shopSetting.shop} />
              </Grid>
              <Grid container item xs={12} md={8}>
                <ShopStatistics shop={shopSetting.shop} />
              </Grid>
            </Grid>
          </>
        )}

        <Grid container item xs={12}>
          {loading ? (
            <Skeleton variant={'rect'} height={60} />
          ) : (
            <Paper square className={classes.paperTab}>
              <Tabs
                value={categoryTabValue}
                onChange={(event, value) => {
                  setCategoryTabValue(value);
                }}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label={t('home')} />
                <Tab label={t('all products')} />
                {shopSetting.shop.shop_product_category.map((category: any) => (
                  <Tab key={category.id} label={category.title} />
                ))}
              </Tabs>
            </Paper>
          )}

          <Grid container className={classes.tabContent}>
            {loading ? (
              <Skeleton variant={'rect'} height={400} />
            ) : (
              <>
                {categoryTabValue === 0 && (
                  <>
                    <Paper className={classes.paperTabContent}>
                      <Grid container item spacing={3}>
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle2"
                            style={{ textTransform: 'uppercase' }}
                          >
                            {t('about shop')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={4}>
                          <Image
                            useLazyLoad
                            src={shopSetting.shop.shop_info.banner_medium}
                            style={{ width: '100%' }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={7} lg={8}>
                          <Typography
                            color="primary"
                            variant="subtitle1"
                            style={{ textTransform: 'uppercase' }}
                          >
                            {shopSetting.shop.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            {shopSetting.shop.shop_info.summary}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    {shopSetting.shop.shop_product_category.map(
                      (category, index: number) => (
                        <React.Fragment key={category.id}>
                          {categoryTabValue === 1 + index + 1 && (
                            <Typography
                              component="div"
                              style={{ padding: 8 * 3 }}
                            >
                              {category.title}
                            </Typography>
                          )}
                        </React.Fragment>
                      )
                    )}
                    <Grid container item xs={12} spacing={2}>
                      {shopSetting.shop.shop_product_category.map(category => (
                        <Grid
                          key={category.id}
                          container
                          item
                          xs={12}
                          className={classes.categoryList}
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              textTransform: 'uppercase'
                            }}
                          >
                            {category.title}
                          </Typography>
                          <Grid container item xs={12} spacing={1}>
                            <ProductList
                              variables={{
                                shop_id: shopSetting.shop_id,
                                where_shop_product_category_id: category.id,
                                limit: 6,
                                offset: 0,
                                sort_created_at: 'desc'
                              }}
                              hideSort
                              gridProps={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 2
                              }}
                              disableLoadMore
                            />
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      className={classes.categoryContainer}
                    >
                      <Grid item xs={12} sm={3}>
                        <Grid container item xs={12}>
                          <ListIcon />
                          <Typography variant="subtitle1" component="span">
                            &nbsp;{t('category')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <List dense={false}>
                            {[
                              ...[
                                {
                                  id: '',
                                  title: t('all product')
                                }
                              ],
                              ...shopSetting.shop.shop_product_category
                            ].map(category => {
                              let isSelected =
                                whereShopProductCategoryId === category.id;

                              return (
                                <ListItem
                                  classes={{
                                    selected: classes.selectedListItem
                                  }}
                                  button
                                  key={category.id}
                                  onClick={() => {
                                    setWhereShopProductCategoryId(category.id);
                                  }}
                                  selected={isSelected}
                                >
                                  <ListItemText
                                    primary={category.title}
                                    primaryTypographyProps={{
                                      style: {
                                        color: isSelected ? '#fff' : 'inherit'
                                      }
                                    }}
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} sm={9} spacing={1}>
                        <ProductList
                          variables={{
                            shop_id: shopSetting.shop_id,
                            where_shop_product_category_id: whereShopProductCategoryId
                          }}
                          gridProps={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3
                          }}
                          disableLoadMore
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                {categoryTabValue === 1 && (
                  <Grid container item xs={12} spacing={1}>
                    <ProductList
                      variables={{
                        shop_id: shopSetting.shop_id,
                        sort_created_at: 'desc'
                      }}
                      gridProps={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 2
                      }}
                    />
                  </Grid>
                )}

                {shopSetting.shop.shop_product_category.map(
                  (category, index: number) => (
                    <React.Fragment key={category.id}>
                      {categoryTabValue === index + 2 && (
                        <Grid container item xs={12} spacing={1}>
                          <ProductList
                            variables={{
                              shop_id: shopSetting.shop_id,
                              where_shop_product_category_id: category.id,
                              sort_created_at: 'desc'
                            }}
                            gridProps={{
                              xs: 12,
                              sm: 6,
                              md: 4,
                              lg: 2
                            }}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  )
                )}
              </>
            )}
          </Grid>
        </Grid>
      </>
    </Grid>
  );
}

export default withRouter(ShopHome);
