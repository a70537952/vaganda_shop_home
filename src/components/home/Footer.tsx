import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
  root: {
    bottom: 0,
    color: 'grey',
    padding: '20px 30px'
  }
});

export default function Footer() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container item className={classes.root}>
      <hr />
      <Grid container item>
        <Typography variant="caption" style={{ textTransform: 'capitalize' }}>
          ©&nbsp;{new Date().getFullYear()} {t('vaganda shop')}.&nbsp;
          {t('all rights reserved')}
        </Typography>
      </Grid>
    </Grid>
  );
}
