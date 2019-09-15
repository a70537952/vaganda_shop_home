import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useUpdateUserContactMutation(
  fragment: DocumentNode,
  options?: MutationHookOptions
) {
  return useMutation(UpdateUserContactMutation(fragment), options);
}

export function UpdateUserContactMutation(
  fragment: DocumentNode
): DocumentNode {
  return gql`
    mutation UpdateUserContactMutation(
      $phoneCountryCode: String
      $phone: String
    ) {
      updateUserContactMutation(
        phoneCountryCode: $phoneCountryCode
        phone: $phone
      ) {
        ...fragment
      }
    }
    ${fragment}
  `;
}
