import gql from 'graphql-tag';

export let updateUserOrderDetailStatusMutationFragment: any = {
  UserOrderDetailCard: gql`
    fragment fragment on UserOrderDetail {
      id
      order_detail_status
      received_at
    }
  `
};
