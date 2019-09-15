import gql, { disableFragmentWarnings } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { WithPagination, SortField } from './Query';

disableFragmentWarnings();

export interface ShopVars {
  offset?: number;
  limit?: number;
  created_at?: String;
  updated_at?: String;
  id?: String;
  user_id?: String;
  shop_category_id?: String;
  name?: String;
  has_physical_shop?: String;
  sort_created_at?: SortField;
  sort_updated_at?: SortField;
  sort_id?: SortField;
  sort_user_id?: SortField;
  sort_shop_category_id?: SortField;
  sort_name?: SortField;
  sort_has_physical_shop?: SortField;
  where_like_created_at?: String;
  where_like_updated_at?: String;
  where_like_id?: String;
  where_like_user_id?: String;
  where_like_shop_category_id?: String;
  where_like_name?: String;
  where_like_has_physical_shop?: String;
}

export function useShopQuery<TData = any>(
  fragment: DocumentNode,
  options?: QueryHookOptions<{ shop: WithPagination<TData> }, ShopVars>
) {
  return useQuery<{ shop: WithPagination<TData> }, ShopVars>(
    shopQuery(fragment),
    options
  );
}

export function shopQuery(fragment: DocumentNode): DocumentNode {
  return gql`
    query Shop(
      $offset: Int
      $limit: Int
      $created_at: String
      $updated_at: String
      $id: ID
      $user_id: String
      $shop_category_id: String
      $name: String
      $has_physical_shop: String
      $sort_created_at: String
      $sort_updated_at: String
      $sort_id: String
      $sort_user_id: String
      $sort_shop_category_id: String
      $sort_name: String
      $sort_has_physical_shop: String
      $where_like_created_at: String
      $where_like_updated_at: String
      $where_like_id: String
      $where_like_user_id: String
      $where_like_shop_category_id: String
      $where_like_name: String
      $where_like_has_physical_shop: String
    ) {
      shop(
        offset: $offset
        limit: $limit
        created_at: $created_at
        updated_at: $updated_at
        id: $id
        user_id: $user_id
        shop_category_id: $shop_category_id
        name: $name
        has_physical_shop: $has_physical_shop
        sort_created_at: $sort_created_at
        sort_updated_at: $sort_updated_at
        sort_id: $sort_id
        sort_user_id: $sort_user_id
        sort_shop_category_id: $sort_shop_category_id
        sort_name: $sort_name
        sort_has_physical_shop: $sort_has_physical_shop
        where_like_created_at: $where_like_created_at
        where_like_updated_at: $where_like_updated_at
        where_like_id: $where_like_id
        where_like_user_id: $where_like_user_id
        where_like_shop_category_id: $where_like_shop_category_id
        where_like_name: $where_like_name
        where_like_has_physical_shop: $where_like_has_physical_shop
      ) {
        items {
          ...fragment
        }
        cursor {
          total
          perPage
          currentPage
          hasPages
        }
      }
    }
    ${fragment}
  `;
}

// ['Annotation Ignore Below For generate tsQuery tool']

export namespace ShopFragments {
  export interface ShopList {
    id: string;
    user_id: string;
    shop_category_id: string;
    name: string;
    has_physical_shop: string;
    created_at: string;
    updated_at: string;
    shop_info: {
      id: string;
      summary: string;
      logo: string;
      logo_medium: string;
      logo_large: string;
      banner: string;
      banner_medium: string;
      banner_large: string;
    };
    shop_product_category: {
      id: string;
      shop_id: string;
      title: string;
    };
    shop_setting: {
      id: string;
      title: string;
      value: string;
    };
  }
}
export let shopFragments: any = {
  ShopList: gql`
    fragment fragment on Shop {
      id
      user_id
      shop_category_id
      name
      has_physical_shop
      created_at
      updated_at
      shop_info {
        id
        summary
        logo
        logo_medium
        logo_large
        banner
        banner_medium
        banner_large
      }
      shop_product_category {
        id
        shop_id
        title
      }
      shop_setting {
        id
        title
        value
      }
    }
  `
};
