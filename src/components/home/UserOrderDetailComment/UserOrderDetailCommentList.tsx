import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UserOrderDetailCommentCard from './UserOrderDetailCommentCard';
import LazyLoad from 'react-lazyload';
import Pagination from '../../Pagination';
import StarRating from '../../_rating/StarRating';
import { useUserOrderDetailCommentQuery } from '../../../graphql/query/UserOrderDetailCommentQuery';
import { userOrderDetailCommentFragments } from '../../../graphql/fragment/query/UserOrderDetailCommentFragment';
import { IUserOrderDetailCommentFragmentUserOrderDetailCommentList } from '../../../graphql/fragment/interface/UserOrderDetailCommentFragmentInterface';
import { Cursor } from '../../../graphql/query/Query';

interface IProps {
  variables?: any;
  gridProps?: any;
  hideSort?: boolean;
  disableLoadMore?: boolean;
  product_rating?: number;
  one_star_comment_count?: number;
  two_star_comment_count?: number;
  three_star_comment_count?: number;
  four_star_comment_count?: number;
  five_star_comment_count?: number;
}

interface IProps {
  variables?: any;
  gridProps?: any;
  hideSort?: boolean;
  disableLoadMore?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  userOrderDetailCommentActionContainer: {
    width: '100%',
    backgroundColor: '#ebebeb',
    padding: '12px 24px'
  },
  filterButton: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

export default function UserOrderDetailCommentList(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [sortCreatedAt, setSortCreatedAt] = useState<'desc' | 'asc' | ''>('');
  const [whereStar, setWhereStar] = useState<1 | 2 | 3 | 4 | 5 | ''>('');
  const [withImage, setWithImage] = useState<boolean | ''>('');

  let {
    variables = {},
    gridProps,
    hideSort,
    disableLoadMore,
    product_rating,
    one_star_comment_count,
    two_star_comment_count,
    three_star_comment_count,
    four_star_comment_count,
    five_star_comment_count
  } = props;

  function getVariables() {
    let allVariables: any = {};

    let variableKeys = Object.keys(variables);
    variableKeys.forEach((key: string) => {
      if (variables[key]) allVariables[key] = variables[key];
    });
    if (!variableKeys.includes('limit')) {
      allVariables.limit = 1;
    }

    if (!variableKeys.includes('offset')) {
      allVariables.offset = 0;
    }

    if (whereStar) allVariables.star = whereStar;
    if (sortCreatedAt) allVariables.sort_created_at = sortCreatedAt;
    allVariables.withImage = withImage;
    return allVariables;
  }

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

  let allVariables = getVariables();
  const { loading, data, fetchMore, error } = useUserOrderDetailCommentQuery<
    IUserOrderDetailCommentFragmentUserOrderDetailCommentList
  >(userOrderDetailCommentFragments.UserOrderDetailCommentList, {
    variables: allVariables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  function clearFilter() {
    setSortCreatedAt('');
    setWhereStar('');
    setWithImage('');
  }

  let userOrderDetailComments: IUserOrderDetailCommentFragmentUserOrderDetailCommentList[] = [];
  let cursor: Cursor | null = null;
  if (data) {
    userOrderDetailComments = data.userOrderDetailComment.items;
    cursor = data.userOrderDetailComment.cursor;
  }
  let pageSize = allVariables.limit;

  return (
    <Grid container item spacing={1}>
      {!hideSort && (
        <Grid container item xs={12}>
          <Paper
            square
            className={classes.userOrderDetailCommentActionContainer}
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
              <Grid container item xs={12} md={3} lg={2} justify={'center'}>
                <Grid container item xs={12} spacing={1}>
                  {product_rating ? (
                    <>
                      <Grid
                        container
                        item
                        xs={12}
                        justify={'center'}
                        alignItems={'center'}
                      >
                        <Typography
                          component={'span'}
                          color={'primary'}
                          display="inline"
                          align={'center'}
                          variant="h4"
                        >
                          {product_rating} {t('star')}
                        </Typography>
                      </Grid>
                      <Grid container item xs={12} justify={'center'}>
                        <StarRating
                          size={'large'}
                          value={product_rating}
                          precision={0.1}
                          readOnly
                        />
                      </Grid>
                    </>
                  ) : (
                    <Typography variant="subtitle1" align={'center'}>
                      {t('sort by')}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} md={9} lg={10} spacing={2}>
                <Grid item>
                  <Button
                    variant={
                      sortCreatedAt === 'desc' ? 'contained' : 'outlined'
                    }
                    color={'primary'}
                    fullWidth
                    onClick={() => {
                      if (sortCreatedAt !== 'desc') {
                        clearFilter();
                        setSortCreatedAt('desc');
                      }
                    }}
                    className={classes.filterButton}
                  >
                    {t('latest')}
                  </Button>
                </Grid>
                {new Array(5).fill(0).map((element: number, index: number) => {
                  let star: any = index + 1;
                  let starCount = null;

                  if (star === 1 && one_star_comment_count) {
                    starCount = one_star_comment_count;
                  }
                  if (star === 2 && two_star_comment_count) {
                    starCount = two_star_comment_count;
                  }
                  if (star === 3 && three_star_comment_count) {
                    starCount = three_star_comment_count;
                  }
                  if (star === 4 && four_star_comment_count) {
                    starCount = four_star_comment_count;
                  }
                  if (star === 5 && five_star_comment_count) {
                    starCount = five_star_comment_count;
                  }

                  return (
                    <Grid item key={index}>
                      <Button
                        variant={whereStar === star ? 'contained' : 'outlined'}
                        color={'primary'}
                        fullWidth
                        onClick={() => {
                          if (!withImage) {
                            clearFilter();
                            setWhereStar(star);
                          }
                        }}
                        className={classes.filterButton}
                      >
                        {star} {t('star')}&nbsp;
                        {starCount && <>({starCount})</>}
                      </Button>
                    </Grid>
                  );
                })}

                <Grid item>
                  <Button
                    variant={withImage ? 'contained' : 'outlined'}
                    color={'primary'}
                    fullWidth
                    onClick={() => {
                      if (!withImage) {
                        clearFilter();
                        setWithImage(true);
                      }
                    }}
                    className={classes.filterButton}
                  >
                    {t('with image')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
      <Grid container item xs={12}>
        <LazyLoad>
          {error && <>Error!</>}
          {loading && (
            <Grid container item xs={12} spacing={1}>
              {new Array(2).fill(6).map((ele, index) => (
                <Grid container item key={index} {...gridProps}>
                  <UserOrderDetailCommentCard loading />
                </Grid>
              ))}
            </Grid>
          )}
          {!loading && !error && (
            <>
              <Grid container item xs={12} spacing={1}>
                {userOrderDetailComments.map((userOrderDetailComment: any) => (
                  <Grid
                    container
                    item
                    key={userOrderDetailComment.id}
                    {...gridProps}
                  >
                    <UserOrderDetailCommentCard
                      userOrderDetailComment={userOrderDetailComment}
                    />
                  </Grid>
                ))}
                {userOrderDetailComments.length === 0 && (
                  <Grid container item justify="center">
                    <Typography variant="h6">{t('no comment yet')}</Typography>
                  </Grid>
                )}
              </Grid>
              <Grid container item xs={12} justify={'flex-end'}>
                {cursor && (
                  <Pagination
                    total={cursor.total}
                    rowsPerPage={pageSize}
                    changePage={(e, page) => {
                      fetchMore({
                        variables: {
                          offset: page * pageSize
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          prev.userOrderDetailComment.items =
                            fetchMoreResult.userOrderDetailComment.items;
                          prev.userOrderDetailComment.cursor =
                            fetchMoreResult.userOrderDetailComment.cursor;
                          return prev;
                        }
                      });
                    }}
                    page={cursor.currentPage}
                    rowsPerPageOptions={[pageSize]}
                  />
                )}
              </Grid>
            </>
          )}
        </LazyLoad>
      </Grid>
    </Grid>
  );
}
