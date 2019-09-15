import gql, { disableFragmentWarnings } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { WithPagination, SortField } from './Query';

disableFragmentWarnings();

export interface ShopAdminVars {
  offset?: number;
  limit?: number;
  created_at?: String;
  updated_at?: String;
  id?: String;
  shop_id?: String;
  user_id?: String;
  shop_admin_role_id?: String;
  sort_created_at?: SortField;
  sort_updated_at?: SortField;
  sort_id?: SortField;
  sort_shop_id?: SortField;
  sort_user_id?: SortField;
  sort_shop_admin_role_id?: SortField;
  where_like_created_at?: String;
  where_like_updated_at?: String;
  where_like_id?: String;
  where_like_shop_id?: String;
  where_like_user_id?: String;
  where_like_shop_admin_role_id?: String;
  where_like_userName?: String;
  where_like_shop_admin_roleTitle?: String;
}

export function useShopAdminQuery<TData = any>(
  fragment: DocumentNode,
  options?: QueryHookOptions<
    { shopAdmin: WithPagination<TData> },
    ShopAdminVars
  >
) {
  return useQuery<{ shopAdmin: WithPagination<TData> }, ShopAdminVars>(
    shopAdminQuery(fragment),
    options
  );
}

export function shopAdminQuery(fragment: DocumentNode): DocumentNode {
  return gql`
    query ShopAdmin(
      $offset: Int
      $limit: Int
      $created_at: String
      $updated_at: String
      $id: ID
      $shop_id: String
      $user_id: String
      $shop_admin_role_id: String
      $sort_created_at: String
      $sort_updated_at: String
      $sort_id: String
      $sort_shop_id: String
      $sort_user_id: String
      $sort_shop_admin_role_id: String
      $where_like_created_at: String
      $where_like_updated_at: String
      $where_like_id: String
      $where_like_shop_id: String
      $where_like_user_id: String
      $where_like_shop_admin_role_id: String
      $where_like_userName: String
      $where_like_shop_admin_roleTitle: String
    ) {
      shopAdmin(
        offset: $offset
        limit: $limit
        created_at: $created_at
        updated_at: $updated_at
        id: $id
        shop_id: $shop_id
        user_id: $user_id
        shop_admin_role_id: $shop_admin_role_id
        sort_created_at: $sort_created_at
        sort_updated_at: $sort_updated_at
        sort_id: $sort_id
        sort_shop_id: $sort_shop_id
        sort_user_id: $sort_user_id
        sort_shop_admin_role_id: $sort_shop_admin_role_id
        where_like_created_at: $where_like_created_at
        where_like_updated_at: $where_like_updated_at
        where_like_id: $where_like_id
        where_like_shop_id: $where_like_shop_id
        where_like_user_id: $where_like_user_id
        where_like_shop_admin_role_id: $where_like_shop_admin_role_id
        where_like_userName: $where_like_userName
        where_like_shop_admin_roleTitle: $where_like_shop_admin_roleTitle
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

export namespace ShopAdminFragments {
  export interface Admin {
    id: string;
    shop_id: string;
    user_id: string;
    user: {
      id: string;
      username: string;
      name: string;
    };
    shop_admin_role_id: string;
    shop_admin_role: {
      id: string;
      title: string;
      is_shop_owner_role: string;
      permission: string;
    };
    created_at: string;
    updated_at: string;
  }
  export interface ModalCreateEditShopAdmin {
    id: string;
    shop_id: string;
    user_id: string;
    user: {
      id: string;
      username: string;
      name: string;
    };
    shop_admin_role_id: string;
    shop_admin_role: {
      id: string;
      title: string;
      is_shop_owner_role: string;
      permission: string;
    };
    created_at: string;
    updated_at: string;
  }
}
export let shopAdminFragments: any = {
  Admin: gql`
    fragment fragment on ShopAdmin {
      id
      shop_id
      user_id
      user {
        id
        username
        name
      }
      shop_admin_role_id
      shop_admin_role {
        id
        title
        is_shop_owner_role
        permission
      }
      created_at
      updated_at
    }
  `,
  ModalCreateEditShopAdmin: gql`
    fragment fragment on ShopAdmin {
      id
      shop_id
      user_id
      user {
        id
        username
        name
      }
      shop_admin_role_id
      shop_admin_role {
        id
        title
        is_shop_owner_role
        permission
      }
      created_at
      updated_at
    }
  `
};
