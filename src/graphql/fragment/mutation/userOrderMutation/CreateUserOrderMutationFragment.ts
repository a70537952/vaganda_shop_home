import gql from 'graphql-tag';

export let createUserOrderMutationFragments: any = {
  UserCart: gql`
    fragment fragment on UserOrder {
      id
      order_status
    }
  `
};
