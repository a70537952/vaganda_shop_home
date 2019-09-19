import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ProductCard from './ProductCard';
import { useProductQuery } from '../../../graphql/query/ProductQuery';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import { productFragments } from '../../../graphql/fragment/query/ProductFragment';
import { IProductFragmentProductList } from '../../../graphql/fragment/interface/ProductFragmentInterface';
import { useTranslation } from 'react-i18next';

interface IProps {
  variables?: any;
  gridProps?: any;
  hideSort?: boolean;
  disableLoadMore?: boolean;
}

const useStyles = makeStyles({
  productActionContainer: {
    width: '100%',
    height: '60px',
    backgroundColor: '#ebebeb',
    padding: '12px 24px'
  }
});

export default function ProductList(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [sortPrice, setSortPrice] = useState<'desc' | 'asc' | ''>('');
  const [sortCreatedAt, setSortCreatedAt] = useState<'desc' | 'asc' | ''>('');

  function getVariables() {
    let allVariables: any = {};

    let variableKeys = Object.keys(variables);
    variableKeys.forEach((key: string) => {
      if (variables[key]) allVariables[key] = variables[key];
    });
    if (!variableKeys.includes('limit')) {
      allVariables.limit = 30;
    }

    if (!variableKeys.includes('offset')) {
      allVariables.offset = 0;
    }

    if (sortPrice) allVariables.sort_price = sortPrice;
    if (sortCreatedAt) allVariables.sort_created_at = sortCreatedAt;

    return allVariables;
  }

  let { variables = {}, gridProps, hideSort, disableLoadMore } = props;

  gridProps = gridProps
    ? {
        xs: gridProps['xs'] || 12,
        sm: gridProps['sm'] || 6,
        md: gridProps['md'] || 4,
        lg: gridProps['lg'] || 2,
        xl: gridProps['xl'] || 2
      }
    : {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 2,
        xl: 2
      };

  const { loading, data, fetchMore, error } = useProductQuery<
    IProductFragmentProductList
  >(productFragments.ProductList, {
    variables: getVariables(),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache'
  });

  if (error) return <>Error!</>;
  if (loading && !data)
    return (
      <Grid container item xs={12} spacing={1}>
        {new Array(6).fill(6).map((ele, index) => (
          <Grid container item key={index} {...gridProps}>
            <ProductCard loading />
          </Grid>
        ))}
      </Grid>
    );

  if (!data) {
    return null;
  }

  let products: IProductFragmentProductList[] = data.product.items;

  return (
    <>
      {!hideSort && (
        <Grid container item xs={12}>
          <Paper
            square
            className={classes.productActionContainer}
            elevation={0}
          >
            <Grid
              container
              item
              xs={12}
              alignItems="center"
              spacing={2}
              style={{ height: '100%' }}
            >
              <Grid item xs={4} md={1}>
                <Typography variant="subtitle1">{t('sort by')}</Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Button
                  variant="contained"
                  color={sortCreatedAt === 'desc' ? 'primary' : 'default'}
                  fullWidth
                  onClick={() => {
                    setSortCreatedAt('desc');
                  }}
                >
                  {t('latest')}
                </Button>
              </Grid>
              <Grid item xs={4} md={3}>
                <Select
                  fullWidth
                  displayEmpty
                  value={sortCreatedAt}
                  onChange={(e: any) => {
                    setSortPrice(e.target.value);
                  }}
                  inputProps={{
                    name: 'price',
                    id: 'price'
                  }}
                >
                  <MenuItem value="">
                    <em>{t('price')}</em>
                  </MenuItem>
                  <MenuItem value={'asc'}>{t('price: low to high')}</MenuItem>
                  <MenuItem value={'desc'}>{t('price: high to low')}</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
      <Grid container item xs={12}>
        <InfiniteScroll
          style={{ width: '100%' }}
          pageStart={0}
          initialLoad={false}
          threshold={300}
          loadMore={() => {
            if (loading) return;
            fetchMore({
              variables: {
                offset: data.product.items.length
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                prev.product.items = prev.product.items.concat(
                  fetchMoreResult.product.items
                );
                prev.product.cursor = fetchMoreResult.product.cursor;
                return prev;
              }
            });
          }}
          hasMore={!disableLoadMore && data.product.cursor.hasPages}
          loader={
            <Grid container item justify="center">
              <CircularProgress />
            </Grid>
          }
        >
          <Grid container item xs={12} spacing={1}>
            {products.map((product: any) => (
              <Grid container item key={product.id} {...gridProps}>
                <ProductCard product={product} />
              </Grid>
            ))}
            {products.length === 0 && (
              <Grid container item justify="center">
                <Typography variant="h6">
                  {t("we can't find the product you're looking for.")}
                </Typography>
              </Grid>
            )}
          </Grid>
        </InfiniteScroll>
      </Grid>
    </>
  );
}
