import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppContext } from '../../../contexts/Context';
import { homePath } from '../../../utils/RouteUtil';
import { useUserCartQuery } from '../../../graphql/query/UserCartQuery';
import { userCartFragments } from '../../../graphql/fragment/query/UserCartFragment';
import { IUserCartFragmentUserCartButton } from '../../../graphql/fragmentType/query/UserCartFragmentInterface';
import UserCartCard from './UserCartCard';

const useStyles = makeStyles((theme: Theme) => ({
  cartButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  cartPaper: {
    padding: theme.spacing(1)
  }
}));

export default function UserCartButton() {
  const classes = useStyles();
  const { t } = useTranslation();
  const context = useContext(AppContext);

  const [cartPopoverAnchorEl, setCartPopoverAnchorEl] = useState<any>(null);

  function handleCartPopoverOpen(event?: any) {
    setCartPopoverAnchorEl(event ? event.currentTarget : cartPopoverAnchorEl);
    refetch();
  }

  function handleCartPopoverClose() {
    setCartPopoverAnchorEl(null);
  }

  const { loading, data, error, refetch } = useUserCartQuery<
    IUserCartFragmentUserCartButton
  >(userCartFragments.UserCartButton, {
    variables: {
      user_id: context.user.id,
      limit: 5,
      sort_created_at: 'desc'
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  let userCarts: IUserCartFragmentUserCartButton[] = [];

  if (data) {
    userCarts = data.userCart.items;
  }

  const isCartPopoverOpen = Boolean(cartPopoverAnchorEl);
  return (
    <>
      <Button
        variant="text"
        aria-owns={isCartPopoverOpen ? 'cart-popover' : undefined}
        aria-haspopup="true"
        className={classes.cartButton}
        onMouseEnter={handleCartPopoverOpen}
        onMouseLeave={handleCartPopoverClose}
        {...({
          component: Link,
          to: homePath('userCart')
        } as any)}
      >
        <ShoppingCartIcon />
      </Button>
      <Popover
        id="cart-popover"
        open={isCartPopoverOpen}
        anchorEl={cartPopoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          style: {
            width: '480px'
          }
        }}
        onMouseEnter={handleCartPopoverOpen}
        onClose={handleCartPopoverClose}
        disableRestoreFocus
      >
        <Paper elevation={0} className={classes.cartPaper}>
          <Grid container spacing={1}>
            <Grid container item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                paragraph
                style={{ textTransform: 'capitalize' }}
              >
                {t('recently added product')}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              {error && <>Error!</>}
              {loading && (
                <Grid container justify={'center'}>
                  <CircularProgress size={35} />
                </Grid>
              )}
              {!error && !loading && (
                <Grid container item xs={12} spacing={1}>
                  {userCarts.map(
                    (userCart: IUserCartFragmentUserCartButton) => (
                      <UserCartCard
                        key={userCart.id}
                        userCart={userCart}
                        onRemoved={refetch}
                      />
                    )
                  )}
                  {userCarts.length === 0 && (
                    <Grid container item xs={12} justify="center">
                      <Typography
                        variant="subtitle1"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {t('no products yet')}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
            <Grid container item xs={12} justify={'flex-end'}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                {...({
                  component: Link,
                  to: homePath('userCart')
                } as any)}
              >
                {t('view cart')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
}
