import gql, { disableFragmentWarnings } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { WithPagination, SortField } from './Query';

disableFragmentWarnings();

export interface UserVars {
  offset?: number;
  limit?: number;
  created_at?: String;
  updated_at?: String;
  id?: String;
  username?: String;
  name?: String;
  password?: String;
  email?: String;
  role_id?: String;
  ip?: String;
  last_login_at?: String;
  email_verified_at?: String;
  remember_token?: String;
  sort_created_at?: SortField;
  sort_updated_at?: SortField;
  sort_id?: SortField;
  sort_username?: SortField;
  sort_name?: SortField;
  sort_password?: SortField;
  sort_email?: SortField;
  sort_role_id?: SortField;
  sort_ip?: SortField;
  sort_last_login_at?: SortField;
  sort_email_verified_at?: SortField;
  sort_remember_token?: SortField;
  where_like_created_at?: String;
  where_like_updated_at?: String;
  where_like_id?: String;
  where_like_username?: String;
  where_like_name?: String;
  where_like_password?: String;
  where_like_email?: String;
  where_like_role_id?: String;
  where_like_ip?: String;
  where_like_last_login_at?: String;
  where_like_email_verified_at?: String;
  where_like_remember_token?: String;
  except_self?: boolean;
}

export function useUserQuery<TData = any>(
  fragment: DocumentNode,
  options?: QueryHookOptions<{ user: WithPagination<TData> }, UserVars>
) {
  return useQuery<{ user: WithPagination<TData> }, UserVars>(
    userQuery(fragment),
    options
  );
}

export function userQuery(fragment: DocumentNode): DocumentNode {
  return gql`
    query User(
      $offset: Int
      $limit: Int
      $created_at: String
      $updated_at: String
      $id: ID
      $username: String
      $name: String
      $password: String
      $email: String
      $role_id: String
      $ip: String
      $last_login_at: String
      $email_verified_at: String
      $remember_token: String
      $sort_created_at: String
      $sort_updated_at: String
      $sort_id: String
      $sort_username: String
      $sort_name: String
      $sort_password: String
      $sort_email: String
      $sort_role_id: String
      $sort_ip: String
      $sort_last_login_at: String
      $sort_email_verified_at: String
      $sort_remember_token: String
      $where_like_created_at: String
      $where_like_updated_at: String
      $where_like_id: String
      $where_like_username: String
      $where_like_name: String
      $where_like_password: String
      $where_like_email: String
      $where_like_role_id: String
      $where_like_ip: String
      $where_like_last_login_at: String
      $where_like_email_verified_at: String
      $where_like_remember_token: String
      $except_self: Boolean
    ) {
      user(
        offset: $offset
        limit: $limit
        created_at: $created_at
        updated_at: $updated_at
        id: $id
        username: $username
        name: $name
        password: $password
        email: $email
        role_id: $role_id
        ip: $ip
        last_login_at: $last_login_at
        email_verified_at: $email_verified_at
        remember_token: $remember_token
        sort_created_at: $sort_created_at
        sort_updated_at: $sort_updated_at
        sort_id: $sort_id
        sort_username: $sort_username
        sort_name: $sort_name
        sort_password: $sort_password
        sort_email: $sort_email
        sort_role_id: $sort_role_id
        sort_ip: $sort_ip
        sort_last_login_at: $sort_last_login_at
        sort_email_verified_at: $sort_email_verified_at
        sort_remember_token: $sort_remember_token
        where_like_created_at: $where_like_created_at
        where_like_updated_at: $where_like_updated_at
        where_like_id: $where_like_id
        where_like_username: $where_like_username
        where_like_name: $where_like_name
        where_like_password: $where_like_password
        where_like_email: $where_like_email
        where_like_role_id: $where_like_role_id
        where_like_ip: $where_like_ip
        where_like_last_login_at: $where_like_last_login_at
        where_like_email_verified_at: $where_like_email_verified_at
        where_like_remember_token: $where_like_remember_token
        except_self: $except_self
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

export namespace UserFragments {
  export interface FormEditUserAccount {
    id: string;
    username: string;
    name: string;
    user_info: {
      id: string;
      gender: number;
      avatar_original: string;
      avatar_small: string;
      avatar_medium: string;
      avatar_large: string;
    };
  }

  export interface FormEditUserContact {
    id: string;
    email: string;
    email_verified_at: string;
    is_sign_up_user: number;
    user_info: {
      id: string;
      phone_country_code: string;
      phone: string;
    };
  }

  export interface FormSignUp {
    id: string;
    username: string;
    email: string;
  }

  export interface Index {
    id: string;
    name: string;
    email: string;
    email_verified_at: string;
    is_sign_up_user: string;
    user_info: {
      id: string;
      avatar: string;
      avatar_original: string;
      avatar_small: string;
      avatar_medium: string;
      avatar_large: string;
      phone_country_code: string;
      phone: string;
    };
    user_address: {
      id: string;
      user_id: string;
      address_1: string;
      address_2: string;
      address_3: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    shop_admins: {
      id: string;
      shop_id: string;
    };
  }
}

export let userFragments: any = {
  FormEditUserAccount: gql`
    fragment fragment on User {
      id
      username
      name
      user_info {
        id
        gender
        avatar_original
        avatar_small
        avatar_medium
        avatar_large
      }
    }
  `,
  FormEditUserContact: gql`
    fragment fragment on User {
      id
      email
      email_verified_at
      is_sign_up_user
      user_info {
        id
        phone_country_code
        phone
      }
    }
  `,
  FormSignUp: gql`
    fragment fragment on User {
      id
      username
      email
    }
  `,
  Index: gql`
    fragment fragment on User {
      id
      name
      email
      email_verified_at
      is_sign_up_user
      user_info {
        id
        avatar
        avatar_original
        avatar_small
        avatar_medium
        avatar_large
        phone_country_code
        phone
      }
      user_address {
        id
        user_id
        address_1
        address_2
        address_3
        city
        state
        postal_code
        country
      }
      shop_admins {
        id
        shop_id
      }
    }
  `
};
