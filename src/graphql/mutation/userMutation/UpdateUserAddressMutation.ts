import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useUpdateUserAddressMutation(
  fragment: DocumentNode,
  options?: MutationHookOptions
) {
  return useMutation(UpdateUserAddressMutation(fragment), options);
}

export function UpdateUserAddressMutation(
  fragment: DocumentNode
): DocumentNode {
  return gql`
    mutation UpdateUserAddressMutation(
      $address_1: String
      $address_2: String
      $address_3: String
      $city: String
      $state: String
      $postal_code: String
      $country: String
    ) {
      updateUserAddressMutation(
        address_1: $address_1
        address_2: $address_2
        address_3: $address_3
        city: $city
        state: $state
        postal_code: $postal_code
        country: $country
      ) {
        ...fragment
      }
    }
    ${fragment}
  `;
}
