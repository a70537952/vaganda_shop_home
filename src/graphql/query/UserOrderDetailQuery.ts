import gql, { disableFragmentWarnings } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { WithPagination, SortField } from './Query';

disableFragmentWarnings();

export interface UserOrderDetailVars {
  offset?: number;
  limit?: number;
  created_at?: String;
  updated_at?: String;
  id?: String;
  order_id?: String;
  user_id?: String;
  shop_id?: String;
  product_id?: String;
  shop_name?: String;
  product_title?: String;
  product_type_title?: String;
  product_quantity?: String;
  product_cost_currency?: String;
  product_cost?: String;
  product_discount_unit?: String;
  product_discount?: String;
  product_unit_price_currency?: String;
  product_unit_price?: String;
  product_discount_amount?: String;
  product_discounted_price?: String;
  product_final_price?: String;
  product_total_price?: String;
  product_paid_unit_price_currency?: String;
  product_paid_unit_price?: String;
  product_paid_total_price?: String;
  product_shipping_title?: String;
  product_shipping_currency?: String;
  product_shipping_fee?: String;
  product_shipping_country?: String;
  product_total_shipping_fee?: String;
  product_paid_shipping_currency?: String;
  product_paid_shipping_fee?: String;
  product_paid_total_shipping_fee?: String;
  order_detail_status?: String;
  product_shipping_track_number?: String;
  message?: String;
  remark?: String;
  is_commented?: String;
  auto_received_at?: String;
  shipped_at?: String;
  received_at?: String;
  sort_created_at?: SortField;
  sort_updated_at?: SortField;
  sort_id?: SortField;
  sort_order_id?: SortField;
  sort_user_id?: SortField;
  sort_shop_id?: SortField;
  sort_product_id?: SortField;
  sort_shop_name?: SortField;
  sort_product_title?: SortField;
  sort_product_type_title?: SortField;
  sort_product_quantity?: SortField;
  sort_product_cost_currency?: SortField;
  sort_product_cost?: SortField;
  sort_product_discount_unit?: SortField;
  sort_product_discount?: SortField;
  sort_product_unit_price_currency?: SortField;
  sort_product_unit_price?: SortField;
  sort_product_discount_amount?: SortField;
  sort_product_discounted_price?: SortField;
  sort_product_final_price?: SortField;
  sort_product_total_price?: SortField;
  sort_product_paid_unit_price_currency?: SortField;
  sort_product_paid_unit_price?: SortField;
  sort_product_paid_total_price?: SortField;
  sort_product_shipping_title?: SortField;
  sort_product_shipping_currency?: SortField;
  sort_product_shipping_fee?: SortField;
  sort_product_shipping_country?: SortField;
  sort_product_total_shipping_fee?: SortField;
  sort_product_paid_shipping_currency?: SortField;
  sort_product_paid_shipping_fee?: SortField;
  sort_product_paid_total_shipping_fee?: SortField;
  sort_order_detail_status?: SortField;
  sort_product_shipping_track_number?: SortField;
  sort_message?: SortField;
  sort_remark?: SortField;
  sort_is_commented?: SortField;
  sort_auto_received_at?: SortField;
  sort_shipped_at?: SortField;
  sort_received_at?: SortField;
  where_like_created_at?: String;
  where_like_updated_at?: String;
  where_like_id?: String;
  where_like_order_id?: String;
  where_like_user_id?: String;
  where_like_shop_id?: String;
  where_like_product_id?: String;
  where_like_shop_name?: String;
  where_like_product_title?: String;
  where_like_product_type_title?: String;
  where_like_product_quantity?: String;
  where_like_product_cost_currency?: String;
  where_like_product_cost?: String;
  where_like_product_discount_unit?: String;
  where_like_product_discount?: String;
  where_like_product_unit_price_currency?: String;
  where_like_product_unit_price?: String;
  where_like_product_discount_amount?: String;
  where_like_product_discounted_price?: String;
  where_like_product_final_price?: String;
  where_like_product_total_price?: String;
  where_like_product_paid_unit_price_currency?: String;
  where_like_product_paid_unit_price?: String;
  where_like_product_paid_total_price?: String;
  where_like_product_shipping_title?: String;
  where_like_product_shipping_currency?: String;
  where_like_product_shipping_fee?: String;
  where_like_product_shipping_country?: String;
  where_like_product_total_shipping_fee?: String;
  where_like_product_paid_shipping_currency?: String;
  where_like_product_paid_shipping_fee?: String;
  where_like_product_paid_total_shipping_fee?: String;
  where_like_order_detail_status?: String;
  where_like_product_shipping_track_number?: String;
  where_like_message?: String;
  where_like_remark?: String;
  where_like_is_commented?: String;
  where_like_auto_received_at?: String;
  where_like_shipped_at?: String;
  where_like_received_at?: String;
  where_not_created_at?: String;
  where_not_updated_at?: String;
  where_not_id?: String;
  where_not_order_id?: String;
  where_not_user_id?: String;
  where_not_shop_id?: String;
  where_not_product_id?: String;
  where_not_shop_name?: String;
  where_not_product_title?: String;
  where_not_product_type_title?: String;
  where_not_product_quantity?: String;
  where_not_product_cost_currency?: String;
  where_not_product_cost?: String;
  where_not_product_discount_unit?: String;
  where_not_product_discount?: String;
  where_not_product_unit_price_currency?: String;
  where_not_product_unit_price?: String;
  where_not_product_discount_amount?: String;
  where_not_product_discounted_price?: String;
  where_not_product_final_price?: String;
  where_not_product_total_price?: String;
  where_not_product_paid_unit_price_currency?: String;
  where_not_product_paid_unit_price?: String;
  where_not_product_paid_total_price?: String;
  where_not_product_shipping_title?: String;
  where_not_product_shipping_currency?: String;
  where_not_product_shipping_fee?: String;
  where_not_product_shipping_country?: String;
  where_not_product_total_shipping_fee?: String;
  where_not_product_paid_shipping_currency?: String;
  where_not_product_paid_shipping_fee?: String;
  where_not_product_paid_total_shipping_fee?: String;
  where_not_order_detail_status?: String;
  where_not_product_shipping_track_number?: String;
  where_not_message?: String;
  where_not_remark?: String;
  where_not_is_commented?: String;
  where_not_auto_received_at?: String;
  where_not_shipped_at?: String;
  where_not_received_at?: String;
}

export function useUserOrderDetailQuery<TData = any>(
  fragment: DocumentNode,
  options?: QueryHookOptions<
    { userOrderDetail: WithPagination<TData> },
    UserOrderDetailVars
  >
) {
  return useQuery<
    { userOrderDetail: WithPagination<TData> },
    UserOrderDetailVars
  >(userOrderDetailQuery(fragment), options);
}

export function userOrderDetailQuery(fragment: DocumentNode): DocumentNode {
  return gql`
    query UserOrderDetail(
      $offset: Int
      $limit: Int
      $created_at: String
      $updated_at: String
      $id: ID
      $order_id: String
      $user_id: String
      $shop_id: String
      $product_id: String
      $shop_name: String
      $product_title: String
      $product_type_title: String
      $product_quantity: String
      $product_cost_currency: String
      $product_cost: String
      $product_discount_unit: String
      $product_discount: String
      $product_unit_price_currency: String
      $product_unit_price: String
      $product_discount_amount: String
      $product_discounted_price: String
      $product_final_price: String
      $product_total_price: String
      $product_paid_unit_price_currency: String
      $product_paid_unit_price: String
      $product_paid_total_price: String
      $product_shipping_title: String
      $product_shipping_currency: String
      $product_shipping_fee: String
      $product_shipping_country: String
      $product_total_shipping_fee: String
      $product_paid_shipping_currency: String
      $product_paid_shipping_fee: String
      $product_paid_total_shipping_fee: String
      $order_detail_status: String
      $product_shipping_track_number: String
      $message: String
      $remark: String
      $is_commented: String
      $auto_received_at: String
      $shipped_at: String
      $received_at: String
      $sort_created_at: String
      $sort_updated_at: String
      $sort_id: String
      $sort_order_id: String
      $sort_user_id: String
      $sort_shop_id: String
      $sort_product_id: String
      $sort_shop_name: String
      $sort_product_title: String
      $sort_product_type_title: String
      $sort_product_quantity: String
      $sort_product_cost_currency: String
      $sort_product_cost: String
      $sort_product_discount_unit: String
      $sort_product_discount: String
      $sort_product_unit_price_currency: String
      $sort_product_unit_price: String
      $sort_product_discount_amount: String
      $sort_product_discounted_price: String
      $sort_product_final_price: String
      $sort_product_total_price: String
      $sort_product_paid_unit_price_currency: String
      $sort_product_paid_unit_price: String
      $sort_product_paid_total_price: String
      $sort_product_shipping_title: String
      $sort_product_shipping_currency: String
      $sort_product_shipping_fee: String
      $sort_product_shipping_country: String
      $sort_product_total_shipping_fee: String
      $sort_product_paid_shipping_currency: String
      $sort_product_paid_shipping_fee: String
      $sort_product_paid_total_shipping_fee: String
      $sort_order_detail_status: String
      $sort_product_shipping_track_number: String
      $sort_message: String
      $sort_remark: String
      $sort_is_commented: String
      $sort_auto_received_at: String
      $sort_shipped_at: String
      $sort_received_at: String
      $where_like_created_at: String
      $where_like_updated_at: String
      $where_like_id: String
      $where_like_order_id: String
      $where_like_user_id: String
      $where_like_shop_id: String
      $where_like_product_id: String
      $where_like_shop_name: String
      $where_like_product_title: String
      $where_like_product_type_title: String
      $where_like_product_quantity: String
      $where_like_product_cost_currency: String
      $where_like_product_cost: String
      $where_like_product_discount_unit: String
      $where_like_product_discount: String
      $where_like_product_unit_price_currency: String
      $where_like_product_unit_price: String
      $where_like_product_discount_amount: String
      $where_like_product_discounted_price: String
      $where_like_product_final_price: String
      $where_like_product_total_price: String
      $where_like_product_paid_unit_price_currency: String
      $where_like_product_paid_unit_price: String
      $where_like_product_paid_total_price: String
      $where_like_product_shipping_title: String
      $where_like_product_shipping_currency: String
      $where_like_product_shipping_fee: String
      $where_like_product_shipping_country: String
      $where_like_product_total_shipping_fee: String
      $where_like_product_paid_shipping_currency: String
      $where_like_product_paid_shipping_fee: String
      $where_like_product_paid_total_shipping_fee: String
      $where_like_order_detail_status: String
      $where_like_product_shipping_track_number: String
      $where_like_message: String
      $where_like_remark: String
      $where_like_is_commented: String
      $where_like_auto_received_at: String
      $where_like_shipped_at: String
      $where_like_received_at: String
      $where_not_created_at: String
      $where_not_updated_at: String
      $where_not_id: String
      $where_not_order_id: String
      $where_not_user_id: String
      $where_not_shop_id: String
      $where_not_product_id: String
      $where_not_shop_name: String
      $where_not_product_title: String
      $where_not_product_type_title: String
      $where_not_product_quantity: String
      $where_not_product_cost_currency: String
      $where_not_product_cost: String
      $where_not_product_discount_unit: String
      $where_not_product_discount: String
      $where_not_product_unit_price_currency: String
      $where_not_product_unit_price: String
      $where_not_product_discount_amount: String
      $where_not_product_discounted_price: String
      $where_not_product_final_price: String
      $where_not_product_total_price: String
      $where_not_product_paid_unit_price_currency: String
      $where_not_product_paid_unit_price: String
      $where_not_product_paid_total_price: String
      $where_not_product_shipping_title: String
      $where_not_product_shipping_currency: String
      $where_not_product_shipping_fee: String
      $where_not_product_shipping_country: String
      $where_not_product_total_shipping_fee: String
      $where_not_product_paid_shipping_currency: String
      $where_not_product_paid_shipping_fee: String
      $where_not_product_paid_total_shipping_fee: String
      $where_not_order_detail_status: String
      $where_not_product_shipping_track_number: String
      $where_not_message: String
      $where_not_remark: String
      $where_not_is_commented: String
      $where_not_auto_received_at: String
      $where_not_shipped_at: String
      $where_not_received_at: String
    ) {
      userOrderDetail(
        offset: $offset
        limit: $limit
        created_at: $created_at
        updated_at: $updated_at
        id: $id
        order_id: $order_id
        user_id: $user_id
        shop_id: $shop_id
        product_id: $product_id
        shop_name: $shop_name
        product_title: $product_title
        product_type_title: $product_type_title
        product_quantity: $product_quantity
        product_cost_currency: $product_cost_currency
        product_cost: $product_cost
        product_discount_unit: $product_discount_unit
        product_discount: $product_discount
        product_unit_price_currency: $product_unit_price_currency
        product_unit_price: $product_unit_price
        product_discount_amount: $product_discount_amount
        product_discounted_price: $product_discounted_price
        product_final_price: $product_final_price
        product_total_price: $product_total_price
        product_paid_unit_price_currency: $product_paid_unit_price_currency
        product_paid_unit_price: $product_paid_unit_price
        product_paid_total_price: $product_paid_total_price
        product_shipping_title: $product_shipping_title
        product_shipping_currency: $product_shipping_currency
        product_shipping_fee: $product_shipping_fee
        product_shipping_country: $product_shipping_country
        product_total_shipping_fee: $product_total_shipping_fee
        product_paid_shipping_currency: $product_paid_shipping_currency
        product_paid_shipping_fee: $product_paid_shipping_fee
        product_paid_total_shipping_fee: $product_paid_total_shipping_fee
        order_detail_status: $order_detail_status
        product_shipping_track_number: $product_shipping_track_number
        message: $message
        remark: $remark
        is_commented: $is_commented
        auto_received_at: $auto_received_at
        shipped_at: $shipped_at
        received_at: $received_at
        sort_created_at: $sort_created_at
        sort_updated_at: $sort_updated_at
        sort_id: $sort_id
        sort_order_id: $sort_order_id
        sort_user_id: $sort_user_id
        sort_shop_id: $sort_shop_id
        sort_product_id: $sort_product_id
        sort_shop_name: $sort_shop_name
        sort_product_title: $sort_product_title
        sort_product_type_title: $sort_product_type_title
        sort_product_quantity: $sort_product_quantity
        sort_product_cost_currency: $sort_product_cost_currency
        sort_product_cost: $sort_product_cost
        sort_product_discount_unit: $sort_product_discount_unit
        sort_product_discount: $sort_product_discount
        sort_product_unit_price_currency: $sort_product_unit_price_currency
        sort_product_unit_price: $sort_product_unit_price
        sort_product_discount_amount: $sort_product_discount_amount
        sort_product_discounted_price: $sort_product_discounted_price
        sort_product_final_price: $sort_product_final_price
        sort_product_total_price: $sort_product_total_price
        sort_product_paid_unit_price_currency: $sort_product_paid_unit_price_currency
        sort_product_paid_unit_price: $sort_product_paid_unit_price
        sort_product_paid_total_price: $sort_product_paid_total_price
        sort_product_shipping_title: $sort_product_shipping_title
        sort_product_shipping_currency: $sort_product_shipping_currency
        sort_product_shipping_fee: $sort_product_shipping_fee
        sort_product_shipping_country: $sort_product_shipping_country
        sort_product_total_shipping_fee: $sort_product_total_shipping_fee
        sort_product_paid_shipping_currency: $sort_product_paid_shipping_currency
        sort_product_paid_shipping_fee: $sort_product_paid_shipping_fee
        sort_product_paid_total_shipping_fee: $sort_product_paid_total_shipping_fee
        sort_order_detail_status: $sort_order_detail_status
        sort_product_shipping_track_number: $sort_product_shipping_track_number
        sort_message: $sort_message
        sort_remark: $sort_remark
        sort_is_commented: $sort_is_commented
        sort_auto_received_at: $sort_auto_received_at
        sort_shipped_at: $sort_shipped_at
        sort_received_at: $sort_received_at
        where_like_created_at: $where_like_created_at
        where_like_updated_at: $where_like_updated_at
        where_like_id: $where_like_id
        where_like_order_id: $where_like_order_id
        where_like_user_id: $where_like_user_id
        where_like_shop_id: $where_like_shop_id
        where_like_product_id: $where_like_product_id
        where_like_shop_name: $where_like_shop_name
        where_like_product_title: $where_like_product_title
        where_like_product_type_title: $where_like_product_type_title
        where_like_product_quantity: $where_like_product_quantity
        where_like_product_cost_currency: $where_like_product_cost_currency
        where_like_product_cost: $where_like_product_cost
        where_like_product_discount_unit: $where_like_product_discount_unit
        where_like_product_discount: $where_like_product_discount
        where_like_product_unit_price_currency: $where_like_product_unit_price_currency
        where_like_product_unit_price: $where_like_product_unit_price
        where_like_product_discount_amount: $where_like_product_discount_amount
        where_like_product_discounted_price: $where_like_product_discounted_price
        where_like_product_final_price: $where_like_product_final_price
        where_like_product_total_price: $where_like_product_total_price
        where_like_product_paid_unit_price_currency: $where_like_product_paid_unit_price_currency
        where_like_product_paid_unit_price: $where_like_product_paid_unit_price
        where_like_product_paid_total_price: $where_like_product_paid_total_price
        where_like_product_shipping_title: $where_like_product_shipping_title
        where_like_product_shipping_currency: $where_like_product_shipping_currency
        where_like_product_shipping_fee: $where_like_product_shipping_fee
        where_like_product_shipping_country: $where_like_product_shipping_country
        where_like_product_total_shipping_fee: $where_like_product_total_shipping_fee
        where_like_product_paid_shipping_currency: $where_like_product_paid_shipping_currency
        where_like_product_paid_shipping_fee: $where_like_product_paid_shipping_fee
        where_like_product_paid_total_shipping_fee: $where_like_product_paid_total_shipping_fee
        where_like_order_detail_status: $where_like_order_detail_status
        where_like_product_shipping_track_number: $where_like_product_shipping_track_number
        where_like_message: $where_like_message
        where_like_remark: $where_like_remark
        where_like_is_commented: $where_like_is_commented
        where_like_auto_received_at: $where_like_auto_received_at
        where_like_shipped_at: $where_like_shipped_at
        where_like_received_at: $where_like_received_at
        where_not_created_at: $where_not_created_at
        where_not_updated_at: $where_not_updated_at
        where_not_id: $where_not_id
        where_not_order_id: $where_not_order_id
        where_not_user_id: $where_not_user_id
        where_not_shop_id: $where_not_shop_id
        where_not_product_id: $where_not_product_id
        where_not_shop_name: $where_not_shop_name
        where_not_product_title: $where_not_product_title
        where_not_product_type_title: $where_not_product_type_title
        where_not_product_quantity: $where_not_product_quantity
        where_not_product_cost_currency: $where_not_product_cost_currency
        where_not_product_cost: $where_not_product_cost
        where_not_product_discount_unit: $where_not_product_discount_unit
        where_not_product_discount: $where_not_product_discount
        where_not_product_unit_price_currency: $where_not_product_unit_price_currency
        where_not_product_unit_price: $where_not_product_unit_price
        where_not_product_discount_amount: $where_not_product_discount_amount
        where_not_product_discounted_price: $where_not_product_discounted_price
        where_not_product_final_price: $where_not_product_final_price
        where_not_product_total_price: $where_not_product_total_price
        where_not_product_paid_unit_price_currency: $where_not_product_paid_unit_price_currency
        where_not_product_paid_unit_price: $where_not_product_paid_unit_price
        where_not_product_paid_total_price: $where_not_product_paid_total_price
        where_not_product_shipping_title: $where_not_product_shipping_title
        where_not_product_shipping_currency: $where_not_product_shipping_currency
        where_not_product_shipping_fee: $where_not_product_shipping_fee
        where_not_product_shipping_country: $where_not_product_shipping_country
        where_not_product_total_shipping_fee: $where_not_product_total_shipping_fee
        where_not_product_paid_shipping_currency: $where_not_product_paid_shipping_currency
        where_not_product_paid_shipping_fee: $where_not_product_paid_shipping_fee
        where_not_product_paid_total_shipping_fee: $where_not_product_paid_total_shipping_fee
        where_not_order_detail_status: $where_not_order_detail_status
        where_not_product_shipping_track_number: $where_not_product_shipping_track_number
        where_not_message: $where_not_message
        where_not_remark: $where_not_remark
        where_not_is_commented: $where_not_is_commented
        where_not_auto_received_at: $where_not_auto_received_at
        where_not_shipped_at: $where_not_shipped_at
        where_not_received_at: $where_not_received_at
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

export namespace UserOrderDetailFragments {
  export interface OrderDetail {
    id: string;
    order_id: string;
    user_id: string;
    shop_id: string;

    shop: {
      id: string;
      name: string;
      shop_info: {
        id: string;
        logo: string;
        logo_small: string;
      };

      shop_setting: {
        id: string;
        title: string;
        value: string;
      };
    };

    order_address: {
      id: string;
      order_id: string;
      user_id: string;
      address_1: string;
      address_2: string;
      address_3: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    product_id: string;

    product: {
      id: string;
      product_image: {
        id: string;
        product_id: string;
        path: string;
        image_medium: string;
        image_large: string;
        image_original: string;
      };
    };
    shop_name: string;
    product_title: string;
    product_type_title: string;
    product_quantity: string;
    product_cost_currency: string;
    product_cost: string;

    product_discount_unit: string;
    product_discount: string;
    product_unit_price_currency: string;
    product_unit_price: string;
    product_discount_amount: string;
    product_discounted_price: string;
    product_final_price: string;

    product_total_price: string;
    product_paid_unit_price_currency: string;
    product_paid_unit_price: string;
    product_paid_total_price: string;

    product_shipping_title: string;

    product_shipping_currency: string;
    product_shipping_fee: string;
    product_shipping_country: string;
    product_total_shipping_fee: string;
    product_paid_shipping_currency: string;
    product_paid_shipping_fee: string;
    product_paid_total_shipping_fee: string;

    order_detail_status: string;
    product_shipping_track_number: string;
    message: string;
    remark: string;
    is_commented: string;
    order_detail_comment: {
      id: string;
      comment: string;
      star: string;
      user_order_detail_comment_image: {
        id: string;
        path: string;
        image_medium: string;
        image_original: string;
      };
    };

    auto_received_at: string;
    shipped_at: string;
    received_at: string;
    created_at: string;
    updated_at: string;
  }
  export interface Dashboard {
    id: string;
    order_id: string;
    user_id: string;
    shop_id: string;

    shop: {
      id: string;
      name: string;
      shop_info: {
        id: string;
        logo: string;
        logo_small: string;
      };

      shop_setting: {
        id: string;
        title: string;
        value: string;
      };
    };

    order_address: {
      id: string;
      order_id: string;
      user_id: string;
      address_1: string;
      address_2: string;
      address_3: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    product_id: string;

    product: {
      id: string;
      product_image: {
        id: string;
        product_id: string;
        path: string;
        image_medium: string;
        image_large: string;
        image_original: string;
      };
    };
    shop_name: string;
    product_title: string;
    product_type_title: string;
    product_quantity: string;
    product_cost_currency: string;
    product_cost: string;

    product_discount_unit: string;
    product_discount: string;
    product_unit_price_currency: string;
    product_unit_price: string;
    product_discount_amount: string;
    product_discounted_price: string;
    product_final_price: string;

    product_total_price: string;
    product_paid_unit_price_currency: string;
    product_paid_unit_price: string;
    product_paid_total_price: string;

    product_shipping_title: string;

    product_shipping_currency: string;
    product_shipping_fee: string;
    product_shipping_country: string;
    product_total_shipping_fee: string;
    product_paid_shipping_currency: string;
    product_paid_shipping_fee: string;
    product_paid_total_shipping_fee: string;

    order_detail_status: string;
    product_shipping_track_number: string;
    message: string;
    remark: string;
    is_commented: string;
    order_detail_comment: {
      id: string;
      comment: string;
      star: string;
      user_order_detail_comment_image: {
        id: string;
        path: string;
        image_medium: string;
        image_original: string;
      };
    };

    auto_received_at: string;
    shipped_at: string;
    received_at: string;
    created_at: string;
    updated_at: string;
  }
  export interface UserOrderDetailList {
    id: string;
    order_id: string;
    user_id: string;
    shop_id: string;

    shop: {
      id: string;
      name: string;
      shop_info: {
        id: string;
        logo: string;
        logo_small: string;
      };

      shop_setting: {
        id: string;
        title: string;
        value: string;
      };
    };

    order_address: {
      id: string;
      order_id: string;
      user_id: string;
      address_1: string;
      address_2: string;
      address_3: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    product_id: string;

    product: {
      id: string;
      product_image: {
        id: string;
        product_id: string;
        path: string;
        image_medium: string;
        image_large: string;
        image_original: string;
      };
    };
    shop_name: string;
    product_title: string;
    product_type_title: string;
    product_quantity: string;
    product_cost_currency: string;
    product_cost: string;

    product_discount_unit: string;
    product_discount: string;
    product_unit_price_currency: string;
    product_unit_price: string;
    product_discount_amount: string;
    product_discounted_price: string;
    product_final_price: string;

    product_total_price: string;
    product_paid_unit_price_currency: string;
    product_paid_unit_price: string;
    product_paid_total_price: string;

    product_shipping_title: string;

    product_shipping_currency: string;
    product_shipping_fee: string;
    product_shipping_country: string;
    product_total_shipping_fee: string;
    product_paid_shipping_currency: string;
    product_paid_shipping_fee: string;
    product_paid_total_shipping_fee: string;

    order_detail_status: string;
    product_shipping_track_number: string;
    message: string;
    remark: string;
    is_commented: string;
    order_detail_comment: {
      id: string;
      comment: string;
      star: string;
      user_order_detail_comment_image: {
        id: string;
        path: string;
        image_medium: string;
        image_original: string;
      };
    };

    auto_received_at: string;
    shipped_at: string;
    received_at: string;
    created_at: string;
    updated_at: string;
  }
  export interface ModalUpdateUserOrderDetail {
    id: string;
    order_id: string;
    user_id: string;
    shop_id: string;

    shop: {
      id: string;
      name: string;
      shop_info: {
        id: string;
        logo: string;
        logo_small: string;
      };

      shop_setting: {
        id: string;
        title: string;
        value: string;
      };
    };

    order_address: {
      id: string;
      order_id: string;
      user_id: string;
      address_1: string;
      address_2: string;
      address_3: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    product_id: string;

    product: {
      id: string;
      product_image: {
        id: string;
        product_id: string;
        path: string;
        image_medium: string;
        image_large: string;
        image_original: string;
      };
    };
    shop_name: string;
    product_title: string;
    product_type_title: string;
    product_quantity: string;
    product_cost_currency: string;
    product_cost: string;

    product_discount_unit: string;
    product_discount: string;
    product_unit_price_currency: string;
    product_unit_price: string;
    product_discount_amount: string;
    product_discounted_price: string;
    product_final_price: string;

    product_total_price: string;
    product_paid_unit_price_currency: string;
    product_paid_unit_price: string;
    product_paid_total_price: string;

    product_shipping_title: string;

    product_shipping_currency: string;
    product_shipping_fee: string;
    product_shipping_country: string;
    product_total_shipping_fee: string;
    product_paid_shipping_currency: string;
    product_paid_shipping_fee: string;
    product_paid_total_shipping_fee: string;

    order_detail_status: string;
    product_shipping_track_number: string;
    message: string;
    remark: string;
    is_commented: string;
    order_detail_comment: {
      id: string;
      comment: string;
      star: string;
      user_order_detail_comment_image: {
        id: string;
        path: string;
        image_medium: string;
        image_original: string;
      };
    };

    auto_received_at: string;
    shipped_at: string;
    received_at: string;
    created_at: string;
    updated_at: string;
  }
}
export let userOrderDetailFragments: any = {
  OrderDetail: gql`
    fragment fragment on UserOrderDetail {
      id
      order_id
      user_id
      shop_id

      shop {
        id
        name
        shop_info {
          id
          logo
          logo_small
        }

        shop_setting {
          id
          title
          value
        }
      }

      order_address {
        id
        order_id
        user_id
        address_1
        address_2
        address_3
        city
        state
        postal_code
        country
      }
      product_id

      product {
        id
        product_image {
          id
          product_id
          path
          image_medium
          image_large
          image_original
        }
      }
      shop_name
      product_title
      product_type_title
      product_quantity
      product_cost_currency
      product_cost

      product_discount_unit
      product_discount
      product_unit_price_currency
      product_unit_price
      product_discount_amount
      product_discounted_price
      product_final_price

      product_total_price
      product_paid_unit_price_currency
      product_paid_unit_price
      product_paid_total_price

      product_shipping_title

      product_shipping_currency
      product_shipping_fee
      product_shipping_country
      product_total_shipping_fee
      product_paid_shipping_currency
      product_paid_shipping_fee
      product_paid_total_shipping_fee

      order_detail_status
      product_shipping_track_number
      message
      remark
      is_commented
      order_detail_comment {
        id
        comment
        star
        user_order_detail_comment_image {
          id
          path
          image_medium
          image_original
        }
      }

      auto_received_at
      shipped_at
      received_at
      created_at
      updated_at
    }
  `,
  Dashboard: gql`
    fragment fragment on UserOrderDetail {
      id
      order_id
      user_id
      shop_id

      shop {
        id
        name
        shop_info {
          id
          logo
          logo_small
        }

        shop_setting {
          id
          title
          value
        }
      }

      order_address {
        id
        order_id
        user_id
        address_1
        address_2
        address_3
        city
        state
        postal_code
        country
      }
      product_id

      product {
        id
        product_image {
          id
          product_id
          path
          image_medium
          image_large
          image_original
        }
      }
      shop_name
      product_title
      product_type_title
      product_quantity
      product_cost_currency
      product_cost

      product_discount_unit
      product_discount
      product_unit_price_currency
      product_unit_price
      product_discount_amount
      product_discounted_price
      product_final_price

      product_total_price
      product_paid_unit_price_currency
      product_paid_unit_price
      product_paid_total_price

      product_shipping_title

      product_shipping_currency
      product_shipping_fee
      product_shipping_country
      product_total_shipping_fee
      product_paid_shipping_currency
      product_paid_shipping_fee
      product_paid_total_shipping_fee

      order_detail_status
      product_shipping_track_number
      message
      remark
      is_commented
      order_detail_comment {
        id
        comment
        star
        user_order_detail_comment_image {
          id
          path
          image_medium
          image_original
        }
      }

      auto_received_at
      shipped_at
      received_at
      created_at
      updated_at
    }
  `,
  UserOrderDetailList: gql`
    fragment fragment on UserOrderDetail {
      id
      order_id
      user_id
      shop_id

      shop {
        id
        name
        shop_info {
          id
          logo
          logo_small
        }

        shop_setting {
          id
          title
          value
        }
      }

      order_address {
        id
        order_id
        user_id
        address_1
        address_2
        address_3
        city
        state
        postal_code
        country
      }
      product_id

      product {
        id
        product_image {
          id
          product_id
          path
          image_medium
          image_large
          image_original
        }
      }
      shop_name
      product_title
      product_type_title
      product_quantity
      product_cost_currency
      product_cost

      product_discount_unit
      product_discount
      product_unit_price_currency
      product_unit_price
      product_discount_amount
      product_discounted_price
      product_final_price

      product_total_price
      product_paid_unit_price_currency
      product_paid_unit_price
      product_paid_total_price

      product_shipping_title

      product_shipping_currency
      product_shipping_fee
      product_shipping_country
      product_total_shipping_fee
      product_paid_shipping_currency
      product_paid_shipping_fee
      product_paid_total_shipping_fee

      order_detail_status
      product_shipping_track_number
      message
      remark
      is_commented
      order_detail_comment {
        id
        comment
        star
        user_order_detail_comment_image {
          id
          path
          image_medium
          image_original
        }
      }

      auto_received_at
      shipped_at
      received_at
      created_at
      updated_at
    }
  `,
  ModalUpdateUserOrderDetail: gql`
    fragment fragment on UserOrderDetail {
      id
      order_id
      user_id
      shop_id

      shop {
        id
        name
        shop_info {
          id
          logo
          logo_small
        }

        shop_setting {
          id
          title
          value
        }
      }

      order_address {
        id
        order_id
        user_id
        address_1
        address_2
        address_3
        city
        state
        postal_code
        country
      }
      product_id

      product {
        id
        product_image {
          id
          product_id
          path
          image_medium
          image_large
          image_original
        }
      }
      shop_name
      product_title
      product_type_title
      product_quantity
      product_cost_currency
      product_cost

      product_discount_unit
      product_discount
      product_unit_price_currency
      product_unit_price
      product_discount_amount
      product_discounted_price
      product_final_price

      product_total_price
      product_paid_unit_price_currency
      product_paid_unit_price
      product_paid_total_price

      product_shipping_title

      product_shipping_currency
      product_shipping_fee
      product_shipping_country
      product_total_shipping_fee
      product_paid_shipping_currency
      product_paid_shipping_fee
      product_paid_total_shipping_fee

      order_detail_status
      product_shipping_track_number
      message
      remark
      is_commented
      order_detail_comment {
        id
        comment
        star
        user_order_detail_comment_image {
          id
          path
          image_medium
          image_original
        }
      }

      auto_received_at
      shipped_at
      received_at
      created_at
      updated_at
    }
  `
};
