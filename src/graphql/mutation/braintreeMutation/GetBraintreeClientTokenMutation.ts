import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useGetBraintreeClientTokenMutation(
  options?: MutationHookOptions
) {
  return useMutation(GetBraintreeClientTokenMutation(), options);
}

export function GetBraintreeClientTokenMutation(): DocumentNode {
  return gql`
    mutation GetBraintreeClientTokenMutation {
      getBraintreeClientTokenMutation {
        clientToken
      }
    }
  `;
}
