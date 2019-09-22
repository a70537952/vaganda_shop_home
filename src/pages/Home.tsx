import React from 'react';
import HomeHelmet from '../components/home/HomeHelmet';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

interface IProps {}

export default function Home(props: IProps) {
  const { t } = useTranslation();

  return (
    <>
      <HomeHelmet
        title={t('')}
        description={''}
        keywords={t('')}
        ogImage="/images/favicon-228.png"
      />
      <Grid container spacing={3}></Grid>
    </>
  );
}
