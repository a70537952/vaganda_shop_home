import React, { useEffect, useState } from 'react';
import HomeHelmet from '../components/home/HomeHelmet';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Grid from '@material-ui/core/Grid';
import ProductList from '../components/home/Product/ProductList';
import ShopList from '../components/home/Shop/ShopList';

interface IProps {
  setSearchValue: (value: string) => void;
  setSearchType: (type: 'product' | 'shop') => void;
}

function Search(
  props: IProps &
    RouteComponentProps<{ searchValue: string; searchType: 'product' | 'shop' }>
) {
  const { t } = useTranslation();
  const { match } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchType, setSearchType] = useState<'product' | 'shop'>('product');

  useEffect(() => {
    props.setSearchValue(searchValue);
    props.setSearchType(searchType);
  }, [searchValue, searchType]);

  useEffect(() => {
    setSearchValue(match.params.searchValue);
    setSearchType(match.params.searchType);
  }, [match.params.searchValue, match.params.searchType]);

  return (
    <>
      <HomeHelmet
        title={t('')}
        description={''}
        keywords={t('')}
        ogImage="/images/favicon-228.png"
      />
      <Grid container spacing={1}>
        {searchType === 'product' && (
          <ProductList
            variables={{
              where_like_title: searchValue,
              sort_created_at: 'desc'
            }}
          />
        )}

        {searchType === 'shop' && (
          <ShopList
            variables={{
              where_like_name: searchValue
            }}
          />
        )}
      </Grid>
    </>
  );
}

export default withRouter(Search);
