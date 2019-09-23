import React from 'react';
import HomeHelmet from '../components/home/HomeHelmet';
import {useTranslation} from 'react-i18next';
import Grid from '@material-ui/core/Grid';


export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <HomeHelmet
        title={t('')}
        description={''}
        keywords={t('')}
        ogImage="/images/favicon-228.png"
      />
      <Grid container spacing={3}/>
    </>
  );
}
