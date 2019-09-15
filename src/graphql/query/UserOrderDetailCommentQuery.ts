import gql, { disableFragmentWarnings } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { WithPagination, SortField } from './Query';

disableFragmentWarnings();

export interface UserOrderDetailCommentVars {
  offset?: number;
  limit?: number;
  created_at?: String;
  updated_at?: String;
  id?: String;
  user_order_detail_id?: String;
  user_id?: String;
  shop_id?: String;
  product_id?: String;
  comment?: String;
  star?: String;
  sort_created_at?: SortField;
  sort_updated_at?: SortField;
  sort_id?: SortField;
  sort_user_order_detail_id?: SortField;
  sort_user_id?: SortField;
  sort_shop_id?: SortField;
  sort_product_id?: SortField;
  sort_comment?: SortField;
  sort_star?: SortField;
  where_like_created_at?: String;
  where_like_updated_at?: String;
  where_like_id?: String;
  where_like_user_order_detail_id?: String;
  where_like_user_id?: String;
  where_like_shop_id?: String;
  where_like_product_id?: String;
  where_like_comment?: String;
  where_like_star?: String;
  where_not_created_at?: String;
  where_not_updated_at?: String;
  where_not_id?: String;
  where_not_user_order_detail_id?: String;
  where_not_user_id?: String;
  where_not_shop_id?: String;
  where_not_product_id?: String;
  where_not_comment?: String;
  where_not_star?: String;
  withImage?: boolean;
}

export function useUserOrderDetailCommentQuery<TData = any>(
  fragment: DocumentNode,
  options?: QueryHookOptions<
    { userOrderDetailComment: WithPagination<TData> },
    UserOrderDetailCommentVars
  >
) {
  return useQuery<
    { userOrderDetailComment: WithPagination<TData> },
    UserOrderDetailCommentVars
  >(userOrderDetailCommentQuery(fragment), options);
}

export function userOrderDetailCommentQuery(
  fragment: DocumentNode
): DocumentNode {
  return gql`
    query UserOrderDetailComment(
      $offset: Int
      $limit: Int
      $created_at: String
      $updated_at: String
      $id: ID
      $user_order_detail_id: String
      $user_id: String
      $shop_id: String
      $product_id: String
      $comment: String
      $star: String
      $sort_created_at: String
      $sort_updated_at: String
      $sort_id: String
      $sort_user_order_detail_id: String
      $sort_user_id: String
      $sort_shop_id: String
      $sort_product_id: String
      $sort_comment: String
      $sort_star: String
      $where_like_created_at: String
      $where_like_updated_at: String
      $where_like_id: String
      $where_like_user_order_detail_id: String
      $where_like_user_id: String
      $where_like_shop_id: String
      $where_like_product_id: String
      $where_like_comment: String
      $where_like_star: String
      $where_not_created_at: String
      $where_not_updated_at: String
      $where_not_id: String
      $where_not_user_order_detail_id: String
      $where_not_user_id: String
      $where_not_shop_id: String
      $where_not_product_id: String
      $where_not_comment: String
      $where_not_star: String
      $withImage: Boolean
    ) {
      userOrderDetailComment(
        offset: $offset
        limit: $limit
        created_at: $created_at
        updated_at: $updated_at
        id: $id
        user_order_detail_id: $user_order_detail_id
        user_id: $user_id
        shop_id: $shop_id
        product_id: $product_id
        comment: $comment
        star: $star
        sort_created_at: $sort_created_at
        sort_updated_at: $sort_updated_at
        sort_id: $sort_id
        sort_user_order_detail_id: $sort_user_order_detail_id
        sort_user_id: $sort_user_id
        sort_shop_id: $sort_shop_id
        sort_product_id: $sort_product_id
        sort_comment: $sort_comment
        sort_star: $sort_star
        where_like_created_at: $where_like_created_at
        where_like_updated_at: $where_like_updated_at
        where_like_id: $where_like_id
        where_like_user_order_detail_id: $where_like_user_order_detail_id
        where_like_user_id: $where_like_user_id
        where_like_shop_id: $where_like_shop_id
        where_like_product_id: $where_like_product_id
        where_like_comment: $where_like_comment
        where_like_star: $where_like_star
        where_not_created_at: $where_not_created_at
        where_not_updated_at: $where_not_updated_at
        where_not_id: $where_not_id
        where_not_user_order_detail_id: $where_not_user_order_detail_id
        where_not_user_id: $where_not_user_id
        where_not_shop_id: $where_not_shop_id
        where_not_product_id: $where_not_product_id
        where_not_comment: $where_not_comment
        where_not_star: $where_not_star
        withImage: $withImage
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

export namespace UserOrderDetailCommentFragments {
  export interface OrderComment {
    id: string;
    user_order_detail_id: string;

    user_order_detail: {
      id: string;
      product_title: string;
      product_type_title: string;
    };
    user_id: string;
    shop_id: string;
    product_id: string;
    comment: string;
    star: string;
    created_at: string;
    updated_at: string;

    user_order_detail_comment_image: {
      id: string;
      user_order_detail_comment_id: string;
      path: string;
      image_medium: string;
      image_large: string;
      image_original: string;
    };

    user: {
      id: string;
      name: string;
      user_info: {
        id: string;
        avatar: string;
        avatar_small: string;
        avatar_medium: string;
      };
    };
  }
  export interface Dashboard {
    id: string;
    user_order_detail_id: string;

    user_order_detail: {
      id: string;
      product_title: string;
      product_type_title: string;
    };
    user_id: string;
    shop_id: string;
    product_id: string;
    comment: string;
    star: string;
    created_at: string;
    updated_at: string;

    user_order_detail_comment_image: {
      id: string;
      user_order_detail_comment_id: string;
      path: string;
      image_medium: string;
      image_large: string;
      image_original: string;
    };

    user: {
      id: string;
      name: string;
      user_info: {
        id: string;
        avatar: string;
        avatar_small: string;
        avatar_medium: string;
      };
    };
  }
  export interface UserOrderDetailCommentList {
    id: string;
    user_order_detail_id: string;

    user_order_detail: {
      id: string;
      product_title: string;
      product_type_title: string;
    };
    user_id: string;
    shop_id: string;
    product_id: string;
    comment: string;
    star: string;
    created_at: string;
    updated_at: string;

    user_order_detail_comment_image: {
      id: string;
      user_order_detail_comment_id: string;
      path: string;
      image_medium: string;
      image_large: string;
      image_original: string;
    };

    user: {
      id: string;
      name: string;
      user_info: {
        id: string;
        avatar: string;
        avatar_small: string;
        avatar_medium: string;
      };
    };
  }
}
export let userOrderDetailCommentFragments: any = {
  OrderComment: gql`
    fragment fragment on UserOrderDetailComment {
      id
      user_order_detail_id

      user_order_detail {
        id
        product_title
        product_type_title
      }
      user_id
      shop_id
      product_id
      comment
      star
      created_at
      updated_at

      user_order_detail_comment_image {
        id
        user_order_detail_comment_id
        path
        image_medium
        image_large
        image_original
      }

      user {
        id
        name
        user_info {
          id
          avatar
          avatar_small
          avatar_medium
        }
      }
    }
  `,
  Dashboard: gql`
    fragment fragment on UserOrderDetailComment {
      id
      user_order_detail_id

      user_order_detail {
        id
        product_title
        product_type_title
      }
      user_id
      shop_id
      product_id
      comment
      star
      created_at
      updated_at

      user_order_detail_comment_image {
        id
        user_order_detail_comment_id
        path
        image_medium
        image_large
        image_original
      }

      user {
        id
        name
        user_info {
          id
          avatar
          avatar_small
          avatar_medium
        }
      }
    }
  `,
  UserOrderDetailCommentList: gql`
    fragment fragment on UserOrderDetailComment {
      id
      user_order_detail_id

      user_order_detail {
        id
        product_title
        product_type_title
      }
      user_id
      shop_id
      product_id
      comment
      star
      created_at
      updated_at

      user_order_detail_comment_image {
        id
        user_order_detail_comment_id
        path
        image_medium
        image_large
        image_original
      }

      user {
        id
        name
        user_info {
          id
          avatar
          avatar_small
          avatar_medium
        }
      }
    }
  `
};
