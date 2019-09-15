import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useUpdateUserPasswordMutation(options?: MutationHookOptions) {
  return useMutation(UpdateUserPasswordMutation(), options);
}

export function UpdateUserPasswordMutation(): DocumentNode {
  return gql`
    mutation UpdateUserPasswordMutation(
      $currentPassword: String!
      $newPassword: String!
    ) {
      updateUserPasswordMutation(
        currentPassword: $currentPassword
        newPassword: $newPassword
      ) {
        id
      }
    }
  `;
}
