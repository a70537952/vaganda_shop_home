import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from './Select';
import { PropTypes } from '@material-ui/core';
import {
  ShopAdminRoleFragments,
  shopAdminRoleFragments,
  useShopAdminRoleQuery
} from '../../graphql/query/ShopAdminRoleQuery';

interface IProps {
  onChange: (value: unknown, selectedShopAdminRole: any) => void;
  required?: boolean;
  value: string;
  disabled?: boolean;
  variables?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  margin?: PropTypes.Margin;
}

export default function ShopAdminRoleSelect(props: IProps) {
  const { t } = useTranslation();

  const {
    label,
    required,
    margin,
    error,
    disabled,
    fullWidth,
    helperText,
    value,
    onChange,
    variables
  } = props;

  const { loading, data } = useShopAdminRoleQuery<
    ShopAdminRoleFragments.ShopAdminRoleSelect
  >(shopAdminRoleFragments.ShopAdminRoleSelect, {
    variables: {
      sort_title: 'asc',
      ...variables
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    onChange(value, shopAdminRoles.find((role: any) => role.id === value));
  }, [value]);

  let shopAdminRoles: ShopAdminRoleFragments.ShopAdminRoleSelect[] = [];

  if (!loading && data) {
    shopAdminRoles = data.shopAdminRole.items;
  }

  return (
    <Select
      loading={loading}
      loadingHeight={50}
      label={label || t('global$$shop admin role')}
      fullWidth={fullWidth}
      helperText={helperText}
      required={required}
      margin={margin}
      error={error}
      disabled={disabled}
      value={value}
      onChange={option => {
        onChange(
          option.value,
          shopAdminRoles.find((role: any) => role.id === option.value)
        );
      }}
      options={[
        ...[{ value: '', label: t('global$$none') }],
        ...shopAdminRoles.map((shopAdminRole: any) => ({
          value: shopAdminRole.id,
          label: shopAdminRole.title
        }))
      ]}
    />
  );
}
