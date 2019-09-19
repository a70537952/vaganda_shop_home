import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { homePath } from '../../../utils/RouteUtil';
import HomeHelmet from '../HomeHelmet';
import { makeStyles } from '@material-ui/core';

interface IProps {}

const useStyles = makeStyles({
  cardContainer: {
    minHeight: '50vh'
  }
});

export default function ProductNotFound(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <HomeHelmet title={t('product not found')} />
      <Grid
        container
        item
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.cardContainer}
        xs={12}
      >
        <Grid item xs={10} sm={8} md={6} lg={5} xl={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {t('product not found')}
              </Typography>
              <br />
              <Typography component="p">
                {t("we can't find the product you're looking for.")}
              </Typography>
            </CardContent>
            <Grid container justify="flex-end">
              <CardActions>
                <Button
                  size="small"
                  {...({ component: Link, to: homePath('home') } as any)}
                  color="primary"
                >
                  {t('back to home')}
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
