import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ShopCard from './ShopCard';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useShopQuery } from '../../../graphql/query/ShopQuery';
import { shopFragments } from '../../../graphql/fragment/query/ShopFragment';
import ProductCard from '../Product/ProductCard';
import { IShopFragmentShopList } from '../../../graphql/fragment/interface/query/ShopFragmentInterface';

interface IProps {
  variables?: any;
  gridProps?: any;
  hideSort?: boolean;
  disableLoadMore?: boolean;
}

export default function ShopList(props: IProps) {
  const { t } = useTranslation();

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

    if (sortCreatedAt) allVariables.sort_created_at = sortCreatedAt;

    return allVariables;
  }

  let { variables = {}, gridProps, disableLoadMore } = props;

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

  const { loading, data, fetchMore, error } = useShopQuery<
    IShopFragmentShopList
  >(shopFragments.ShopList, {
    variables: getVariables(),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
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

  let shops: IShopFragmentShopList[] = data.shop.items;

  return (
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
              offset: data.shop.items.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              prev.shop.items = prev.shop.items.concat(
                fetchMoreResult.shop.items
              );
              prev.shop.cursor = fetchMoreResult.shop.cursor;
              return prev;
            }
          });
        }}
        hasMore={!disableLoadMore && data.shop.cursor.hasPages}
        loader={
          <Grid container item justify="center">
            <CircularProgress />
          </Grid>
        }
      >
        <Grid container item xs={12} spacing={1}>
          {shops.map((shop: any) => (
            <Grid container item key={shop.id} {...gridProps}>
              <ShopCard shop={shop} />
            </Grid>
          ))}
          {shops.length === 0 && (
            <Grid container item justify="center">
              <Typography variant="h6">
                {t("we can't find the product you're looking for.")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
    </Grid>
  );
}
