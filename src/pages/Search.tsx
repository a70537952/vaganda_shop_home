import React, {useEffect, useState} from 'react';
import HomeHelmet from '../components/home/HomeHelmet';
import {useTranslation} from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import ProductList from '../components/home/Product/ProductList';
import ShopList from '../components/home/Shop/ShopList';
import useRouter from '../components/_hook/useRouter';

interface IProps {
  setSearchValue: (value: string) => void;
  setSearchType: (type: 'product' | 'shop') => void;
}

export default function Search(props: IProps) {
  const { t } = useTranslation();
  const { match } = useRouter<{
    searchValue: string;
    searchType: 'product' | 'shop';
  }>();

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
