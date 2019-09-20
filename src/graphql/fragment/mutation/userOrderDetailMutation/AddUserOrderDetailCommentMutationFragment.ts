import gql from 'graphql-tag';

export let addUserOrderDetailCommentMutationFragments: any = {
  ModalAddUserOrderDetailComment: gql`
    fragment fragment on UserOrderDetail {
      id
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
    }
  `
};
