import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserOrderDetailCard from './UserOrderDetailCard';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useUserOrderDetailQuery} from '../../../graphql/query/UserOrderDetailQuery';
import {userOrderDetailFragments} from '../../../graphql/fragment/query/UserOrderDetailFragment';
import ProductCard from '../Product/ProductCard';
import {IUserOrderDetailFragmentUserOrderDetailList} from '../../../graphql/fragmentType/query/UserOrderDetailFragmentInterface';

interface IProps {
  variables?: any;
  gridProps?: any;
  hideSort?: boolean;
  disableLoadMore?: boolean;
}

export default function UserOrderDetailList(props: IProps) {
  const { t } = useTranslation();

  const [sortCreatedAt, setSortCreatedAt] = useState<'desc' | 'asc' | ''>('');

  function getVariables() {
    let allVariables: any = {};

    let variableKeys = Object.keys(variables);
    variableKeys.forEach((key: string) => {
      if (variables[key]) allVariables[key] = variables[key];
    });
    if (!variableKeys.includes('limit')) {
      allVariables.limit = 10;
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
        sm: gridProps['sm'] || 12,
        md: gridProps['md'] || 12,
        lg: gridProps['lg'] || 12,
        xl: gridProps['xl'] || 12
      }
    : {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      };

  const { loading, data, fetchMore, error } = useUserOrderDetailQuery<
    IUserOrderDetailFragmentUserOrderDetailList
  >(userOrderDetailFragments.UserOrderDetailList, {
    variables: getVariables(),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  if (error) return <>Error!</>;
  if (loading && !data)
    return (
      <Grid container item xs={12} spacing={1}>
        {new Array(3).fill(6).map((ele, index) => (
          <Grid container item key={index} {...gridProps}>
            <ProductCard loading />
          </Grid>
        ))}
      </Grid>
    );

  if (!data) {
    return null;
  }

  let userOrderDetails: IUserOrderDetailFragmentUserOrderDetailList[] =
    data.userOrderDetail.items;

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
              offset: data.userOrderDetail.items.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              prev.userOrderDetail.items = prev.userOrderDetail.items.concat(
                fetchMoreResult.userOrderDetail.items
              );
              prev.userOrderDetail.cursor =
                fetchMoreResult.userOrderDetail.cursor;
              return prev;
            }
          });
        }}
        hasMore={!disableLoadMore && data.userOrderDetail.cursor.hasPages}
        loader={
          <Grid container item justify="center">
            <CircularProgress />
          </Grid>
        }
      >
        <Grid container item xs={12} spacing={1}>
          {userOrderDetails.map((userOrderDetail: any) => (
            <Grid container item key={userOrderDetail.id} {...gridProps}>
              <UserOrderDetailCard userOrderDetail={userOrderDetail} />
            </Grid>
          ))}
          {userOrderDetails.length === 0 && (
            <Grid container item justify="center">
              <Typography variant="h6">
                {t("we can't find any order.")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
    </Grid>
  );
}
