import {makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import {StyledComponentProps} from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocaleMoment from '../../LocaleMoment';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {useTranslation} from 'react-i18next';

interface IProps extends StyledComponentProps {
  shop?: any;
  hideProductCount?: boolean;
  hideCreatedAt?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  shopStatisticsPaper: {
    width: '100%',
    padding: theme.spacing(2)
  }
}));

export default function ShopStatistics(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  let { shop, hideProductCount, hideCreatedAt } = props;
  return (
    <Paper elevation={1} className={classes.shopStatisticsPaper}>
      <Grid container item xs={12} spacing={2}>
        {!hideProductCount && shop.product_count !== undefined && (
          <Grid container item xs={5} md={4}>
            <LocalMallIcon fontSize="small" />
            &nbsp;
            <Typography variant="body1">{t('products')}:&nbsp;</Typography>
            <Typography variant="body1" color="primary">
              {shop.product_count}
            </Typography>
          </Grid>
        )}
        {!hideCreatedAt && shop.created_at !== undefined && (
          <Grid container item xs={7} md={4}>
            <HowToRegIcon fontSize="small" />
            &nbsp;
            <Typography variant="body1">{t('joined')}:&nbsp;</Typography>
            <Typography
              variant="body1"
              color="primary"
              style={{ textTransform: 'capitalize' }}
            >
              <LocaleMoment showAll fromNow>
                {shop.created_at}
              </LocaleMoment>
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
