import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import {StyledComponentProps} from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import ShopLogo from '../../ShopLogo';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import ShopName from '../../ShopName';

interface IProps extends StyledComponentProps {
  shop?: any;
  loading?: boolean;
}

const useStyles = makeStyles({
  shopCard: {
    height: '150px',
    width: '100%',
    color: 'white',
    position: 'relative'
  },
  shopCardBackground: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    filter: 'brightness(70%)',
    position: 'absolute'
  },
  shopCardInfo: {
    height: '100%'
  },
  shopCardLogo: {
    width: 60,
    height: 60
  },
  shopCardName: {
    zIndex: 1,
    marginTop: '5px'
  }
});

export default function ShopCard(props: IProps) {
  const classes = useStyles();

  const { shop, loading } = props;
  return (
    <Paper className={classes.shopCard} elevation={1}>
      {loading ? (
        <Skeleton variant={'rect'} height={150} />
      ) : (
        <div
          className={classes.shopCardBackground}
          style={{ backgroundImage: `url("${shop.shop_info.banner_large}")` }}
        />
      )}
      <Grid
        container
        item
        direction="column"
        justify={'center'}
        alignItems={'center'}
        className={classes.shopCardInfo}
      >
        {!loading && (
          <ShopLogo shop={shop} className={classes.shopCardLogo} withLink />
        )}
        {!loading && (
          <ShopName
            shop={shop}
            variant="h6"
            gutterBottom
            color={'inherit'}
            className={classes.shopCardName}
            withLink
          />
        )}
      </Grid>
    </Paper>
  );
}
