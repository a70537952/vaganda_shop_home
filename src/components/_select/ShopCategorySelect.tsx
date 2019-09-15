import Select from './Select';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShopCategoryFragments,
  shopCategoryFragments,
  useShopCategoryQuery
} from '../../graphql/query/ShopCategoryQuery';
import { PropTypes } from '@material-ui/core';

interface IProps {
  onChange: (value: unknown) => void;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  error?: boolean;
  helperText?: string;
  margin?: PropTypes.Margin;
}

export default function ShopCategorySelect(props: IProps) {
  const { t } = useTranslation();

  const { loading, data } = useShopCategoryQuery<
    ShopCategoryFragments.ShopCategorySelect
  >(shopCategoryFragments.ShopCategorySelect, {
    variables: { sort_title: 'asc' }
  });

  const {
    label,
    required,
    margin,
    error,
    disabled,
    fullWidth,
    helperText,
    value,
    onChange
  } = props;

  let shopCategories: ShopCategoryFragments.ShopCategorySelect[] = [];

  if (!loading && data) {
    shopCategories = data.shopCategory;
  }

  return (
    <Select
      loading={loading}
      loadingHeight={50}
      label={label || t('global$$shop category')}
      margin={margin}
      error={error}
      helperText={helperText}
      disabled={disabled}
      required={required}
      value={value}
      onChange={option => {
        onChange(option.value);
      }}
      options={[
        ...[{ value: '', label: t('global$$none') }],
        ...shopCategories.map((shopCategory: any) => ({
          value: shopCategory.id,
          label: t('global$$shopCategory::' + shopCategory.title)
        }))
      ]}
      fullWidth={fullWidth}
    />
  );
}
